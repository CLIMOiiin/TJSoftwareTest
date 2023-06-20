<template>
  <center>
    <h3>                    <el-icon>
                        <Grid />
                    </el-icon> 单元测试 一轮测试结果</h3>
  </center>
  <center>
    <div style="padding-top:20px;width: 90%;">
      <el-tabs type="border-card">
        <el-tab-pane label="测试结果可视化">
          <div>
            <div id="main" style="width: 400px;height:400px;float: left;"></div>
            <div id="bar" style="width: 700px;height:400px;float:right"></div>
          </div>
          <div style="padding-top:400px;">
            <el-divider></el-divider>
            <p style="font-size:20px;font-weight:bold;color:grey">未通过用例详细信息</p>
          </div>
          <el-table :data="Infotable" stripe highlight-current-row>
            <el-table-column label="用例序号" prop="id"></el-table-column>
            <el-table-column label="预期输出" prop="expected_output"></el-table-column>
            <el-table-column label="实际输出" prop="actual_output"></el-table-column>
            <el-table-column label="问题" prop="problem_description"></el-table-column>
            <el-table-column label="是否通过" prop="pass_or_not"
              :filters="[{ text: 'TRUE', value: 'TRUE' }, { text: 'FALSE', value: 'FALSE' }]" :filter-method="filterMode"
              filter-placement="bottom-end">
              <template #default="scope">
                <el-tag disable-transitions effect="dark"
                  :type="scope.row.pass_or_not == 'TRUE' || scope.row.pass_or_not == 'true' ? 'success' : 'danger'">
                  {{ scope.row.pass_or_not }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="测试用例详细信息">
          <el-table :data="table" stripe highlight-current-row>
            <el-table-column label="用例序号" prop="id"></el-table-column>
            <el-table-column label="预期输出" prop="expected_output"></el-table-column>
            <el-table-column label="实际输出" prop="actual_output"></el-table-column>
            <el-table-column label="测试人员" prop="personnel"></el-table-column>
            <el-table-column label="时间" prop="time" min-width="100px"></el-table-column>
            <el-table-column label="版本" prop="version"></el-table-column>
            <el-table-column label="是否通过" prop="pass_or_not"
              :filters="[{ text: 'TRUE', value: 'TRUE' }, { text: 'FALSE', value: 'FALSE' }]" :filter-method="filterMode"
              filter-placement="bottom-end">
              <template #default="scope">
                <el-tag disable-transitions effect="dark"
                  :type="scope.row.pass_or_not == 'TRUE' || scope.row.pass_or_not == 'true' ? 'success' : 'danger'">
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
      table: [],
      TrueCount: 0,
      FalseCount: 0,
      myChart: null,
      myChart2: null,
      Infotable: []
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

      var TrueCount = 0;
      var FalseCount = 0;
      for (var i = 0; i < result.length; i++) {
        if (result[i].pass_or_not === "true" || result[i].pass_or_not === "TRUE")
          TrueCount = TrueCount + 1;
        if (result[i].pass_or_not === 'false' || result[i].pass_or_not === 'FALSE') {
          FalseCount = FalseCount + 1;
          this.Infotable.push(result[i]);
        }
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
    draw() {
      console.log('4')
      console.log('true1111111:', this.TrueCount)
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
          color: ['#91cc75', '#ee6666'],
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
      let myChart;

        myChart = echarts.init(document.getElementById("bar"));


        myChart.setOption(
          {
            title: {
              text: '不同类单元用例测试情况'
            },
            color: ['#91cc75', '#ee6666'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            legend: {},
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            yAxis: [{
              type: 'value',
              name: '用例数',
              min: 0,
              max: 12,
              interval: 3,
              axisLabel: {
                formatter: '{value} 个'
              }
            },
            {
              type: 'value',
              name: '通过率',
              min: 0,
              max: 1,
              interval: 0.25,
              axisLabel: {
                formatter: '{value}'
              }
            }],
            xAxis: {
              type: 'category',
              data: ['RepositoryServiceImpl', 'Repository',
                'TransJobServiceImpl', 'NewTaskServiceImpl'],
              axisLabel: {
                interval: 0,
                rotate: 40
              }
            },
            series: [
              {
                name: '通过用例数',
                type: 'bar',
                data: [12, 8, 8, 5],
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 个';
                  }
                }
              },
              {
                name: '未通过用例数',
                type: 'bar',
                data: [3, 1, 0, 0],
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 个';
                  }
                }
              },
              {
                name: '通过率',
                type: 'line',
                yAxisIndex: 1,
                data: [0.75, 0.875, 1, 1],
                tooltip: {
                  valueFormatter: function (value) {
                    return (value * 100) + '%';
                  }
                }
              }
            ]
          }
        )

      
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('main'));
    this.readExcelFile('/单元测试v1.xlsx')
  }
}

</script>   

<style></style>


