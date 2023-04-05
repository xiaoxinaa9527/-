<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台</el-breadcrumb-item>
      <el-breadcrumb-item>管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 300 条记录</span>
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
            @click="openDrawer('add')"
          >
            添加
          </el-button>
        </div>
      </template>
      <!-- 自己的表格 -->
      <el-table :data="list" stripe>
        <el-table-column prop="stem" label="标题" width="350"></el-table-column>
        <el-table-column prop="creator" label="作者"></el-table-column>
        <el-table-column prop="likeCount" label="点赞"></el-table-column>
        <el-table-column prop="views" label="浏览"></el-table-column>
        <el-table-column
          prop="createdAt"
          label="更新时间"
          width="200"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div class="actions">
              <i class="el-icon-view" @click="openDrawer('view', row.id)"></i>
              <i
                class="el-icon-edit-outline"
                @click="openDrawer('edit', row.id)"
              ></i>
              <i class="el-icon-delete" @click="del(row.id)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="sizes, prev, pager, next,total"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-size="pageSize"
        :total="total"
      >
      </el-pagination>
      <!-- 抽屉组件 -->
      <el-drawer
        :title="drawerTitle"
        :visible.sync="isShowDrawer"
        :before-close="handleClose"
        size="50%"
      >
        <!-- 抽屉内容区域 -->
        <!-- 预览显示的抽屉 -->
        <div v-if="drawerType === 'view'">
          <h5>{{ form.stem }}</h5>
          <div v-html="form.content"></div>
        </div>
        <!-- 修改，添加显示的 -->
        <el-form
          v-else
          :model="form"
          :rules="rules"
          ref="form"
          label-width="80px"
        >
          <el-form-item label="标题" prop="stem">
            <el-input v-model="form.stem" placeholder="输入标题"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <quill-editor
              v-model="form.content"
              @blur="$refs.form.validateField('content')"
            ></quill-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onAdd">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import {
  articleList,
  createArticle,
  removeArticle,
  getArticleDetail,
  updateArticle
} from '@/api/article'

export default {
  name: 'article-page',
  data () {
    return {
      list: [], // 准备存储接口返回的列表数据
      total: 0, // 准备存储数据总数
      current: 1, // 默认第一页
      pageSize: 10, // 每页显示10条数据
      isShowDrawer: false, // 是否显示抽屉
      drawerType: '',
      form: {
        stem: '', // 面试题标题
        content: '' // 面试题内容
      },
      rules: {
        stem: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const res = await articleList({
        current: this.current,
        pageSize: this.pageSize
      })
      // console.log(res)
      this.list = res.data.rows // 存储数据列表
      this.total = res.data.total // 存储数据总条数
    },
    // 分页方法
    handleCurrentChange (val) {
      // 处理当前页变化
      this.current = val
      this.initData()
    },
    // 关闭抽屉之前做什么
    handleClose () {
      // 重置表单，注意：当预览的时候，是没有表单的
      // if (this.$refs.form) {
      //   this.$refs.form.resetFields()
      // }
      this.$refs.form?.resetFields() // ?.是ES6的新语法，功能和上面的一样
      this.isShowDrawer = false
    },
    // 打开抽屉的方法
    async openDrawer (type, id) {
      this.isShowDrawer = true // 打开抽屉
      this.drawerType = type // 修改操作类型
      // console.log(type, id)
      // 判断，如果不是添加操作，那么发送请求获取一个面试题详情
      if (type !== 'add') {
        const res = await getArticleDetail(id)
        this.form = {
          ...res.data // 浅拷贝把所有的拷贝过去
        }
      }
    },
    onAdd () {
      // 无论添加还是修改，都执行这个方法，都需要表单验证
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 表示验证通过
          // 判断是修改还是添加操作
          if (this.drawerType === 'add') {
            const { stem, content } = this.form
            await createArticle({ stem, content })
            this.$message.success('添加成功')
            this.current = 1
          } else {
            const { stem, content, id } = this.form
            await updateArticle({ stem, content, id })
            this.$message.success('修改成功')
          }

          this.initData()
          this.handleClose()
        }
      })
    },
    del (id) {
      this.$confirm('你确定要删除吗？', '提示')
        .then(async () => {
          // 说明点击了确认,调用api方法，发送请求，完成删除
          // console.log(id)
          await removeArticle(id)
          this.$message.success('删除成功')
          this.initData()
        })
        .catch(() => {
          // 说明点击了取消
        })
    }
  },
  computed: {
    drawerTitle () {
      let title = '大标题'
      if (this.drawerType === 'add') title = '添加'
      if (this.drawerType === 'view') title = '预览'
      if (this.drawerType === 'edit') title = '修改'
      return title
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
