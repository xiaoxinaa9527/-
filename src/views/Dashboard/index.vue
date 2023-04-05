<template>
  <div class="dashboard-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台</el-breadcrumb-item>
      <el-breadcrumb-item>数据看板</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card style="height: 140px" shadow="never">
          <i class="el-icon-user"></i>
          <h5 class="tit">活跃用户</h5>
          <h2 class="num">802</h2>
          <p class="tag"><i>↑ 5.23%</i> 最近一个月</p>
        </el-card>
        <el-card style="height: 140px" shadow="never">
          <i class="el-icon-tickets"></i>
          <h5 class="tit">平均访问量</h5>
          <h2 class="num">1298</h2>
          <p class="tag"><i class="red">↓ 8.56%</i> 截止最近一周</p>
        </el-card>
        <el-card class="row" style="height: 180px" shadow="never">
          <h4>Enhance your Campaign for better outreach →</h4>
          <img src="@/assets/img.svg" alt />
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card style="height: 504px" shadow="never">
          <!-- ref="box"相当于id -->
          <div ref="box" class="chart-box" style="height: 500px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="height: 420px" shadow="never">
          <h4>性别分布情况</h4>
          <img style="margin-top: 60px" src="@/assets/chart-03.png" alt />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="height: 420px" shadow="never">
          <h4>浏览访问情况</h4>
          <img src="@/assets/chart-01.svg" alt />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="height: 420px" shadow="never">
          <h4>设备系统访问情况</h4>
          <img style="margin-top: 20px" src="@/assets/chart-02.svg" alt />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getLineData } from '@/api/user'
export default {
  name: 'dashboard-page',
  data () {
    return {
      lineData: []
    }
  },
  async created () {
    const res = await getLineData()
    // console.log(res)
    // 把数据存储到数据项
    this.lineData = res.data.list
  },
  methods: {
    // 创建图表（去官网复制）
    lineChart () {
      // 把需要的图表数据提取出来
      const xData = this.lineData.map((item) => item.ref_date)
      const data = this.lineData.map((item) => item.visit_pv)
      const myChart = echarts.init(this.$refs.box)
      const option = {
        xAxis: {
          type: 'category',
          data: xData
        },
        yAxis: { type: 'value' },
        series: [
          {
            data: data,
            type: 'line',
            smooth: true
          }
        ]
      }
      option && myChart.setOption(option)
    }
  },
  // 创建图标的代码，必须放在mounted（页面构建完才发送请求）中，在这里面才能找到页面元素
  // mounted () {
  //   this.lineChart()
  // }

  // 使用侦听器，侦听数据的变化(当mounted的时候，图表就已经创建了，但是此时ajax请求还没有返回结果呢，所以图表是空的。)
  watch: {
    lineData () {
      this.lineChart()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  .el-breadcrumb {
    margin-top: 10px;
    margin-bottom: 25px;
  }
  .el-card {
    margin-bottom: 20px;
    position: relative;
    &.row {
      h4 {
        width: 40%;
        float: left;
        font-size: 18px;
        margin-left: 5%;
      }
      img {
        width: 40%;
        float: left;
        margin-left: 10%;
        margin-top: 30px;
      }
    }
    [class^="el-icon"] {
      font-size: 30px;
      color: #ccc;
      position: absolute;
      right: 25px;
      top: 30px;
      font-weight: bold;
    }
    .tit {
      color: #6c757d;
      font-size: 14px;
      margin: 6px 0;
    }
    .num {
      color: #6c757d;
      font-size: 30px;
      margin: 6px 0;
    }
    .tag {
      color: #999;
      margin: 0;
      font-size: 14px;
      > i {
        font-style: normal;
        margin-right: 10px;
        color: rgb(10, 207, 151);
        &.red {
          color: #fa5c7c;
        }
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    h4 {
      margin: 0;
      padding-bottom: 20px;
      color: #6c757d;
    }
  }
}
</style>
