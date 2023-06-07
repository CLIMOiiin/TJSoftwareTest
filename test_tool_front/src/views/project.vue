<template>
  <div>
    <center>
      <el-select v-model="value" class="m-2" placeholder="请选择" size="large" style="padding-right:20px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" size="large">开始测试</el-button>
    </center>
  </div>
  <center>
    <div style="padding-top:20px;width: 70%;">
      <el-tabs type="border-card">
        <el-tab-pane label="测试结果可视化">测试结果可视化</el-tab-pane>

        <el-tab-pane label="测试用例详细信息">
          <el-table :data="table" stripe highlight-current-row>
            <el-table-column label="用例序号" prop="id"></el-table-column>
            <el-table-column
              label="预期输出"
              prop="expectedOutput"
            ></el-table-column>
            <el-table-column
              label="实际输出"
              prop="actualOutput"
            ></el-table-column>
            <el-table-column
              label="测试人员"
              prop="personnel"
            ></el-table-column>
            <el-table-column label="时间" prop="time"></el-table-column>
            <el-table-column label="版本" prop="version"></el-table-column>
            <el-table-column
              label="是否通过"
              prop="passOrNot"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </center>
</template>


<script>
import axios from 'axios'
export default {
  data() {
    return {
      options: [{
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
      }],
      value: '',
      table:[{
        id:'1',
        expectedOutput:'1',
        actualOutput:'2',
        personnel:'3',
        time:'2023-6-1',
        version:'1',
        passOrNot:'1',
      }]
    }
  }
}

</script>   

<style>
</style>


