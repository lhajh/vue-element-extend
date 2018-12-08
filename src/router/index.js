import Vue from 'vue'
import Router from 'vue-router'

import Body from 'common/Body'

import Readme from 'business/readme/Readme'
import Modifiers from 'business/vue/Modifiers'
import EditableTable from 'business/element-ui/EditableTable'
import TreeCheckboxs from 'business/element-ui/TreeCheckboxs'
import Upload from 'business/element-ui/Upload'
import BaseBarChart from 'business/echart/BaseBarChart'
import BaseLineChart from 'business/echart/BaseLineChart'
import BasePieChart from 'business/echart/BasePieChart'
import ProgressBarChart from 'business/echart/ProgressBarChart'
import ProgressPieChart from 'business/echart/ProgressPieChart'
import BarArrowChart from 'business/echart/BarArrowChart'
import Ue from 'business/ueditor/Ue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Body',
      component: Body,
      children: [
        {
          path: '/Readme',
          name: 'Readme',
          component: Readme
        },
        {
          path: '/Modifiers',
          name: 'Modifiers',
          component: Modifiers
        },
        {
          path: '/EditableTable',
          name: 'EditableTable',
          component: EditableTable
        },
        {
          path: '/TreeCheckboxs',
          name: 'TreeCheckboxs',
          component: TreeCheckboxs
        },
        {
          path: '/Upload',
          name: 'Upload',
          component: Upload
        },
        {
          path: '/BaseBarChart',
          name: 'BaseBarChart',
          component: BaseBarChart
        },
        {
          path: '/BaseLineChart',
          name: 'BaseLineChart',
          component: BaseLineChart
        },
        {
          path: '/BasePieChart',
          name: 'BasePieChart',
          component: BasePieChart
        },
        {
          path: '/ProgressBarChart',
          name: 'ProgressBarChart',
          component: ProgressBarChart
        },
        {
          path: '/ProgressPieChart',
          name: 'ProgressPieChart',
          component: ProgressPieChart
        },
        {
          path: '/BarArrowChart',
          name: 'BarArrowChart',
          component: BarArrowChart
        },
        {
          path: '/Ue',
          name: 'Ue',
          component: Ue
        }
      ]
    }
  ]
})
