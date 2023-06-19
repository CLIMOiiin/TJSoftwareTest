<template>
  <div>
    <center>
      <el-select v-model="Choice" class="m-2" placeholder="请选择" size="large" style="padding-right:20px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" size="large" @click="Test()">开始测试</el-button>
    </center>
  </div>
  <center>
    <div style="padding-top:20px;width: 70%;">
      <el-tabs type="border-card">
        <el-tab-pane label="测试结果可视化">
          <div id="main" style="width: 600px;height:400px;"></div>

        </el-tab-pane>

        <el-tab-pane label="测试用例详细信息">
          <el-table :data="table" stripe highlight-current-row>
            <el-table-column label="用例序号" prop="id"></el-table-column>
            <el-table-column label="预期输出" prop="expect_output"></el-table-column>
            <el-table-column label="实际输出" prop="actual_output"></el-table-column>
            <el-table-column label="测试人员" prop="personnel"></el-table-column>
            <el-table-column label="时间" prop="time" min-width="100px"></el-table-column>
            <el-table-column label="版本" prop="version"></el-table-column>
            <el-table-column label="是否通过" prop="pass_or_not"
              :filters="[{ text: 'TRUE', value: 'TRUE' }, { text: 'FALSE', value: 'FALSE' }]" :filter-method="filterMode"
              filter-placement="bottom-end">
              <template #default="scope">
                <el-tag disable-transitions effect="dark"
                  :type="scope.row.pass_or_not === 'TRUE' || scope.row.pass_or_not === 'true' ? 'success' : 'danger'">
                  {{ scope.row.pass_or_not }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </center>
</template>


<script>
import { now } from '@vueuse/shared'
import Axios from 'axios'
import * as XLSX from 'xlsx/xlsx.mjs'
import * as echarts from 'echarts'

export default {
  inject: ['reload'],
  data() {
    return {
      options: [{
        value: 'P1',
        label: '判断三角形类型（边界类）',
      },
      {
        value: 'P2',
        label: '判断三角形类型（等价类）',
      },
      {
        value: 'P3',
        label: '万年历问题（边界类）',
      },
      {
        value: 'P4',
        label: '万年历问题（等价类）',
      },
      {
        value: 'P5',
        label: '万年历问题（决策表）',
      },
      {
        value: 'P6',
        label: '电信收费问题（决策表）',
      },
      {
        value: 'P7',
        label: '电脑销售系统（边界值）',
      },
      {
        value: 'P8',
        label: '销售系统佣金（白盒测试）',
      }],
      Choice: '',
      table: [],
      TrueCount: 0,
      FalseCount: 0,
      myChart: null,
    }
  },
  methods: {
    readExcelFile(url) {
      Axios.get(url, { responseType: 'arraybuffer' })
        .then((res) => {
          let data = new Uint8Array(res.data)
          let wb = XLSX.read(data, { type: "array" })
          let sheets = wb.Sheets // 获取文档数据
          this.content = this.transformSheets(sheets)
        }).catch(err => {
          this.err = err
        })
    },
    transformSheets(sheets) {
      let content1 = []
      let tmplist = []
      for (let key in sheets) {
        //读出来的workbook数据很难读,转换为json格式,参考https://github.com/SheetJS/js-xlsx#utility-functions
        tmplist.push(XLSX.utils.sheet_to_json(sheets[key]).length)
        content1.push(XLSX.utils.sheet_to_json(sheets[key]))
      }
      console.log('tmplist', tmplist)
      console.log('content1', content1)
      var result = content1[0]

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // 月份从 0 开始，所以要加 1
      const day = currentDate.getDate();
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes();
      const second = currentDate.getSeconds();
      var date = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      var TrueCount = 0;
      var FalseCount = 0;
      for (var i = 0; i < result.length; i++) {
        result[i].time = date;
        if (result[i].pass_or_not === "true" || result[i].pass_or_not === "TRUE")
          TrueCount = TrueCount + 1;
        if (result[i].pass_or_not === 'false' || result[i].pass_or_not === 'FALSE')
          FalseCount = FalseCount + 1;
      }
      this.table = result;
      this.TrueCount = TrueCount;
      this.FalseCount = FalseCount;

      this.myChart.clear()
      this.draw();
    },
    filterMode(value, row) {
      return row.pass_or_not === value;
    },

    //开始测试
    Test() {
      this.readExcelFile('/' + this.Choice + '.xlsx')
    },
    draw() {
      console.log('4')
      console.log('true1111111:',this.TrueCount)
      this.myChart.setOption(
        {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          color:['#91cc75','#ee6666'],
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold',
                  formatter: '{b}\n{d}%'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: this.TrueCount, name: '通过' },
                { value: this.FalseCount, name: '未通过' },
              ]
            }
          ]
        }
      )
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('main'));
  }
}

</script>   

<style></style>


