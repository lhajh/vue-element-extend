<template>
  <div class="tree-checkboxs">
    <pre><code>
  说明:

    1. 预览是基础, 如果预览不勾选, 后面的都不能勾选

    2. 父元素对应的按钮是全选 /全不选

    3. 子元素勾选与否会影响父元素勾选的状态

    4. 使用的是 tree 的自定义节点内容

    5. http://element-cn.eleme.io/2.4/#/zh-CN/component/tree#zi-ding-yi-jie-dian-nei-ron
    </code></pre>
    <el-tree :data="privilegeList"
      default-expand-all
      :expand-on-click-node="false">
      <div class="custom-tree-node"
        slot-scope="{ node, data }">
        <span>{{data.label}}</span>
        <span class="tree-permissions">
          <el-checkbox v-model="data.hasPreviewPrivilege"
            :indeterminate="data.indeterminatePreview"
            @change="previewChange(data)">预览</el-checkbox>
          <el-checkbox v-model="data.hasDownloadPrivilege"
            :indeterminate="data.indeterminateDownload"
            @change="permissionsChange(data, 'Download')"
            :disabled="!data.hasPreviewPrivilege">下载</el-checkbox>
          <el-checkbox v-model="data.hasAddPrivilege"
            :indeterminate="data.indeterminateAdd"
            @change="permissionsChange(data, 'Add')"
            :disabled="!data.hasPreviewPrivilege">新建</el-checkbox>
          <el-checkbox v-model="data.hasUpdatePrivilege"
            :indeterminate="data.indeterminateUpdate"
            @change="permissionsChange(data, 'Update')"
            :disabled="!data.hasPreviewPrivilege">修改</el-checkbox>
          <el-checkbox v-model="data.hasDeletePrivilege"
            :indeterminate="data.indeterminateDelete"
            @change="permissionsChange(data, 'Delete')"
            :disabled="!data.hasPreviewPrivilege">删除</el-checkbox>
        </span>
      </div>
    </el-tree>
    <pre><code>
{{privilegeList}}
    </code></pre>
  </div>
</template>

<script>
export default {
  name: 'TreeCheckboxs',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      // 权限
      documentPrivilege: {
        hasPreviewPrivilege: true,
        hasDownloadPrivilege: true,
        hasAddPrivilege: true,
        hasUpdatePrivilege: true,
        hasDeletePrivilege: true
      },
      // 基础权限
      baseDocumentPrivilege: {
        hasPreviewPrivilege: true,
        hasDownloadPrivilege: true,
        hasAddPrivilege: true,
        hasUpdatePrivilege: true,
        hasDeletePrivilege: true
      },
      privilegeList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    fetchPrivilege () {
      // 模拟后台返回数据
      let res = {
        data: [
          {
            id: '1576514354808097',
            label: '一级 1',
            children: [
              {
                id: '1576516278806343',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 1-1',
                parentId: '1576514354808097'
              },
              {
                id: '1576516278808543',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 1-2',
                parentId: '1576514354808097'
              },
              {
                id: '1576516278796343',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 1-3',
                parentId: '1576514354808097'
              }
            ]
          },
          {
            id: '1573603314391431',
            label: '一级 2',
            children: [
              {
                id: '1564839581660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 2-1',
                parentId: '1573603314391431'
              },
              {
                id: '1564828811660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 2-2',
                parentId: '1573603314391431'
              }
            ]
          },
          {
            id: '1573603330497946',
            label: '一级 3',
            children: [
              {
                id: '1564848811660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 3-1',
                parentId: '1573603330497946'
              }
            ]
          },
          {
            id: '1573603339611559',
            label: '一级 4',
            children: [
              {
                id: '1564829811660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 4-1',
                parentId: '1573603339611559'
              },
              {
                id: '1564719811660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 4-2',
                parentId: '1573603339611559'
              },
              {
                id: '1564833811660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 4-3',
                parentId: '1573603339611559'
              }
            ]
          },
          {
            id: '1573612668034817',
            label: '一级 5',
            children: [
              {
                id: '1564839681660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 5-1',
                parentId: '1573612668034817'
              },
              {
                id: '1564839441660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 5-2',
                parentId: '1573612668034817'
              },
              {
                id: '1566139811660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 5-3',
                parentId: '1573612668034817'
              },
              {
                id: '1564839814360702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 5-4',
                parentId: '1573612668034817'
              }
            ]
          },
          {
            id: '1573612686718739',
            label: '一级 6',
            children: [
              {
                id: '1564833511660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 6-1',
                parentId: '1573612686718739'
              },
              {
                id: '1582833811660702',
                hasPreviewPrivilege: true,
                hasDownloadPrivilege: true,
                hasAddPrivilege: true,
                hasUpdatePrivilege: true,
                hasDeletePrivilege: true,
                label: '二级 6-2',
                parentId: '1573612686718739'
              }
            ]
          }
        ]
      }
      this.privilegeList = res.data.map(item => {
        for (const key in this.baseDocumentPrivilege) {
          if (this.baseDocumentPrivilege.hasOwnProperty(key)) {
            /*
                children                        indeterminate   item[key]
                all true                        false           true
                all false                       false           false
                have false but not all false    true            true
              */
            item[key] = !item.children.every(item => !item[key])
            item[`indeterminate${/has(.*)Privilege/.exec(key)[1]}`] =
                  item.children.some(item => !item[key]) && item[key]
          }
        }
        return item
      })
    },
    // 预览权限变化
    previewChange (data) {
      // 父元素
      if (data.indeterminatePreview !== undefined) {
        // 勾选预览
        if (data.hasPreviewPrivilege) {
          // 子元素预览全选
          data.children.forEach(item => {
            item.hasPreviewPrivilege = true
          })
          // 不选预览
        } else {
          // 子元素全部取消勾选
          data.children.forEach(item => {
            for (const key in this.baseDocumentPrivilege) {
              if (this.baseDocumentPrivilege.hasOwnProperty(key)) {
                item[key] = false
              }
            }
          })
          // 自身全部取消勾选
          for (const key in this.baseDocumentPrivilege) {
            if (this.baseDocumentPrivilege.hasOwnProperty(key)) {
              data[key] = false
              data[`indeterminate${/has(.*)Privilege/.exec(key)[1]}`] = false
            }
          }
        }
        // 子元素
      } else {
        // 父元素勾选判断
        let role = this.privilegeList.filter(item => item.id === data.parentId)[0]
        role.hasPreviewPrivilege = !role.children.every(item => !item.hasPreviewPrivilege)
        role.indeterminatePreview =
          role.children.some(item => !item.hasPreviewPrivilege) && role.hasPreviewPrivilege
        // 不选预览
        if (!data.hasPreviewPrivilege) {
          // 其他权限子元素和父元素判断
          for (const key in this.baseDocumentPrivilege) {
            if (this.baseDocumentPrivilege.hasOwnProperty(key)) {
              // 其他权限选中状态
              if (data[key]) {
                // 取消勾选
                data[key] = false
                // 判断父元素的该权限
                role[key] = !role.children.every(item => !item[key])
                role[[`indeterminate${/has(.*)Privilege/.exec(key)[1]}`]] =
                  role.children.some(item => !item[key]) && role[key]
              }
            }
          }
        }
      }
    },
    // 权限变化
    permissionsChange (data, type) {
      // 父元素
      if (data[`indeterminate${type}`] !== undefined) {
        data.children.forEach(item => {
          // 子元素权限: 跟随父元素 && 自身是否有预览权限
          item[`has${type}Privilege`] = data[`has${type}Privilege`] && item.hasPreviewPrivilege
        })
        // 父元素权限: 由于子元素有双重限定, 导致父元素全选而子元素不一定全选, 需要判断
        data[`has${type}Privilege`] = !data.children.every(data => !data[`has${type}Privilege`])
        data[`indeterminate${type}`] =
          data.children.some(data => !data[`has${type}Privilege`]) && data[`has${type}Privilege`]
        // 子元素
      } else {
        this.privilegeList.forEach(item => {
          if (item.id === data.parentId) {
            item[`has${type}Privilege`] = !item.children.every(item => !item[`has${type}Privilege`])
            item[`indeterminate${type}`] =
              item.children.some(item => !item[`has${type}Privilege`]) &&
              item[`has${type}Privilege`]
          }
        })
      }
    }
  },
  created () {},
  mounted () {
    this.fetchPrivilege()
  }
}
</script>

<style lang="less">
.tree-checkboxs {
  .el-tree {
    padding: 10px;
  }
  .custom-tree-node {
    // width: 100%;
    // padding-right: 10px;
    & > span {
      display: inline-block;
      width: 130px;
    }
  }
}
</style>
