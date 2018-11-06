<template>
  <div class="editable-table">
    <pre><code>
  说明:

    1. 名称 / 数据类型 / 值 是必填项; 有一项没有填写, 无法再新建 / 保存

    2. 选择 数据类型 后才可以填写 值, 否则会有提示

    3. 新增但没有保存, 数据类型 可以修改, 修改后 值 会重置为默认值; 保存后 数据类型 不可修改
    </code></pre>
    <div class="button-group clearfix">
      <el-button type="primary"
        icon="el-icon-plus"
        style="float: left;"
        :disabled="!isFull"
        @click="addConfig">
        添加项
      </el-button>
      <el-button type="primary"
        icon="el-icon-setting"
        style="float: right;"
        :disabled="!isFull || !isEdited"
        @click="saveConfig">
        保存配置
      </el-button>
    </div>
    <el-table :data="configList"
      border
      stripe
      @cell-click="cellClick"
      style="width:100%">
      <el-table-column align="center"
        prop="name"
        label="名称"
        min-width="120">
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.name"
            ref="inputName"
            v-if="scope.row.editName"></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        prop="type"
        label="数据类型"
        min-width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type"
            v-if="scope.row.editable && scope.row.editType"
            ref="inputType"
            @change="selectChange(scope.row)">
            <el-option v-for="item in typeOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-else>{{formatSelect(scope.row.type)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="value"
        label="值"
        min-width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.type !== undefined && scope.row.editValue">
            <el-input-number v-model="scope.row.value"
              ref="inputValue"
              v-if="scope.row.type === 0"
              controls-position="right"></el-input-number>
            <el-input v-model.trim="scope.row.value"
              ref="inputValue"
              v-if="scope.row.type === 1"></el-input>
            <el-checkbox v-model="scope.row.value"
              ref="inputValue"
              v-if="scope.row.type === 2">{{scope.row.value ? '是' : '否'}}</el-checkbox>
            <el-input v-model.trim="scope.row.value"
              ref="inputValue"
              v-if="scope.row.type === 3"
              type="textarea"
              autosize></el-input>
          </div>
          <div v-else>
            <span v-if="scope.row.type === 2">{{formatBoolean(scope.row.value)}}</span>
            <pre v-else-if="scope.row.type === 3"><code>{{scope.row.value}}</code></pre>
            <span v-else>{{scope.row.value}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="describe"
        label="说明"
        min-width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.describe"
            ref="inputDescribe"
            type="textarea"
            autosize
            v-if="scope.row.editDescribe"></el-input>
          <pre v-else-if="scope.row.type === 3"><code>{{scope.row.describe}}</code></pre>
          <span v-else>{{scope.row.describe}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text"
            class="el-icon-delete"
            @click="deleteConfig(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pre><code>{{configList}}</code></pre>
  </div>
</template>

<script>
import { firstUpperCase } from 'utils/toggle'
export default {
  name: 'EditableTable',
  components: {},
  mixins: [],
  props: [],
  data () {
    return {
      configList: [],
      oldConfigList: [],
      typeOptions: [
        {
          value: 0,
          label: '数字'
        },
        {
          value: 1,
          label: '字符串'
        },
        {
          value: 2,
          label: '布尔值'
        },
        {
          value: 3,
          label: 'JSON'
        }
      ],
      baseData: {
        name: '',
        type: '',
        value: '',
        describe: ''
      },
      baseEditable: {
        editName: false,
        editType: false,
        editValue: false,
        editDescribe: false
      }
    }
  },
  computed: {
    isFull () {
      return this.configList.every(item => item.name !== '' && item.type !== '' && item.value !== '')
    },
    isEdited () {
      if (this.oldConfigList.length === this.configList.length) {
        let flag = false
        this.oldConfigList.forEach((item, index) => {
          if (!flag) {
            for (const key in this.baseData) {
              if (this.baseData.hasOwnProperty(key)) {
                if (item[key] !== this.configList[index][key]) {
                  flag = true
                  break
                }
              }
            }
          } else {
            return true
          }
        })
        return flag
      } else {
        return true
      }
    }
  },
  watch: {},
  methods: {
    // id 生成工具 模拟后台返回的 id
    generateId () {
      return Date.now() + '' + parseInt(Math.random() * 1000)
    },
    // 获取配置列表
    fetchConfigList () {
      // 模拟接口获取的数据
      let res = {
        data: [
          {
            id: '1578137133402826',
            name: '名字',
            type: 1,
            value: 'lhajh',
            describe: '^_^'
          },
          {
            id: '1578137133402827',
            name: '年龄',
            type: 0,
            value: 27,
            describe: '有点老了qaq'
          },
          {
            id: '1578137133402828',
            name: '是否单身',
            type: 2,
            value: true,
            describe: '有没有哪位小姐姐喜欢狗狗的啊? 会挣钱养家的辣种'
          },
          {
            id: '1578137133402829',
            name: '示例代码',
            type: 3,
            value: '{\n  "value": 0,\n  "label": "数字",\n  "value": 1,\n  "label": "字符串",\n  "value": 2,\n  "label": "布尔值",\n  "value": 3,\n  "label": "JSON",\n}',
            describe: ''
          }
        ]
      }
      this.formatConfig(res.data)
    },
    // 添加配置项
    addConfig () {
      let row = {
        ...this.baseData,
        ...this.baseEditable,
        editable: true
      }
      this.configList.push(row)
      this.cellClick(row, { property: 'name' })
    },
    // 保存配置项
    saveConfig () {
      // 正常是发送保存请求, 成功后再调用 fetchConfigList
      this.formatConfig(this.configList)
      this.$message.success('保存成功')
    },
    // 删除配置项
    deleteConfig (row) {
      // 正常是发送删除请求, 成功后再调用 fetchConfigList
      // 有 id, 是从后台获取的, 调用接口删除
      if (row.id) {
        this.$confirm('此操作将永久删除该配置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_ => {
          this.configList.splice(this.configList.indexOf(row), 1)
          this.formatConfig(this.configList)
          this.$message.success('删除成功')
        })
        // 没有 id, 是本地新增还没有保存的
      } else {
        this.configList.splice(this.configList.indexOf(row), 1)
      }
    },
    // 点击单元格
    cellClick (row, event, collumn) {
      if (event.label !== '操作') {
        // 阻止冒泡 在 html 中加 .stop 修饰符会报错:
        // Error in event handler for "cell-click": "TypeError: $event.stopPropagation is not a function"
        window.event.stopPropagation()
        let property = firstUpperCase(event.property)
        this.disabledEdit()
        // 编辑 vaule 时, 如果数据类型没有值, 弹出警告
        if (property === 'Value' && row.type === undefined) {
          this.$message.warning('请先选择数据类型')
          return
        }
        row[`edit${property}`] = true
        this.$nextTick(() => {
          this.$refs[`input${property}`] &&
            typeof this.$refs[`input${property}`].focus === 'function' &&
            this.$refs[`input${property}`].focus()
        })
      }
    },
    // 全部禁止编辑
    disabledEdit () {
      this.configList.forEach(item => {
        item = Object.assign(item, this.baseEditable)
      })
    },
    // 数据类型下拉框变化
    selectChange (row) {
      switch (row.type) {
        case 0:
          row.value = 0
          break
        case 2:
          row.value = false
          break
        default:
          row.value = ''
          break
      }
      // 下拉框 change 后, 直接隐藏会报错:
      // Error in nextTick: "TypeError: Cannot read property 'focus' of undefined"
      this.$nextTick(() => {
        row.editType = false
        this.cellClick(row, { property: 'value' })
      })
    },
    // 格式化
    formatConfig (val) {
      this.configList = val.map(item => {
        return {
          ...item,
          ...this.baseEditable,
          editable: false,
          id: item.id || this.generateId()
        }
      })
      this.oldConfigList = val
    },
    formatSelect (val) {
      return this.typeOptions.reduce((acc, item) => {
        return item.value === val ? acc + item.label : acc
      }, '')
    },
    formatBoolean (val) {
      if (val == null || val === '') {
        return ''
      } else {
        return val ? '是' : '否'
      }
    }
  },
  created () {},
  mounted () {
    this.fetchConfigList()
    document.body.addEventListener('click', this.disabledEdit)
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.disabledEdit)
  }
}
</script>

<style lang="less">
.editable-table {
  .button-group {
    margin-bottom: 20px;
  }
  .el-table {
    margin-bottom: 20px;
    .el-table__row {
      .cell {
        cursor: pointer;
      }
    }
    .el-input-number {
      width: 100%;
    }
  }
}
</style>
