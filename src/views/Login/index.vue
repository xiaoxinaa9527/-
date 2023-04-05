<template>
  <div class="login-page">
    <el-card>
      <!-- 头部区域放插槽 -->
      <template #header>标题运营后台</template>
      <!-- 内容区域，放表单 -->
      <el-form autocomplete="off" label-width="60px" :model="user" :rules="rules" ref="from">
        <el-form-item label="账 号" prop="username">
          <el-input v-model="user.username" placeholder="输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密 码" prop="password">
          <el-input v-model="user.password" type="password" placeholder="输入用户密码"></el-input>
        </el-form-item>

        <el-form class="tc">
          <el-button type="primary" @click="login">登 录</el-button>
          <el-button>重 置</el-button>
        </el-form>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // this.user//{username:'admin',password:'admin'}
      // console.log(this.user)
      // this.$refs.from通过ref找from的元素
      this.$refs.from.validate(async (valid) => {
        // console.log(valid);//验证通过，valid=true，验证不通过valid=false
        if (valid) {
          const res = await loginAPI(this.user)
          // 验证通过，可以提交数据
          // console.log(res)
          // 提示登录成功
          this.$message.success('登录成功')
          // 把数据存储到token中
          this.$store.commit('user/updateToken', res.data.token)
          // 跳转到dashboard
          this.$router.push('/dashboard')
        } else {
          // 验证不通过什么都不做，不要提交数据
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
// sass语法演示  （stylus和sass语法一样）：
// $color: blue
// div
//   background-color: $color

// scss语法演示：
// $color: pink;
// div {
//   background-color: $color;
// }

// Element-UI 中，标签名，就是类名

.login-page {
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .el-card {
    width: 420px;

    // ::样式穿透
    ::v-deep .el-card__header {
      height: 80px;
      background: rgba(114, 124, 245, 1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }

  .el-form {
    padding: 0 20px;
  }

  .tc {
    text-align: center;
  }
}
</style>
