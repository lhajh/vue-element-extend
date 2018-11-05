<template>
  <div class="modifiers">
    <h2>
      <a href="https://lhajh.github.io/vue/2018/09/10/Vue-Modifiers.html" target="_blank">具体介绍请戳我qaq</a>
    </h2>
    <el-row :gutter="20">
      <el-col :span="12">
        <h3>原生 input 未加 lazy 修饰符</h3>
        <div>
          <input type="text"
            class="el-input__inner"
            v-model="v1">
          <p>{{v1}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 未加 lazy 修饰符</h3>
        <div>
          <el-input type="text"
            v-model="v2">
          </el-input>
          <p>{{v2}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 input 加 lazy 修饰符</h3>
        <div>
          <input type="text"
            class="el-input__inner"
            v-model.lazy="v3">
          <p>{{v3}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 加 lazy 修饰符</h3>
        <div>
          <el-input type="text"
            v-model.lazy="v4">
          </el-input>
          <p>{{v4}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 input 未加 trim 修饰符</h3>
        <div>
          <input type="text"
            class="el-input__inner"
            v-model="v5">
          <p>value === value.trim(): {{v5 === v5.trim()}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 未加 trim 修饰符</h3>
        <div>
          <el-input type="text"
            v-model="v6">
          </el-input>
          <p>value === value.trim(): {{v6 === v6.trim()}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 input 加 trim 修饰符</h3>
        <div>
          <input type="text"
            class="el-input__inner"
            v-model.trim="v7">
          <p>value === value.trim(): {{v7 === v7.trim()}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 加 trim 修饰符</h3>
        <div>
          <el-input type="text"
            v-model.trim="v8">
          </el-input>
          <p>value === value.trim(): {{v8 === v8.trim()}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 input 未加 number 修饰符</h3>
        <div>
          <input type="text"
            class="el-input__inner"
            v-model="v9">
          <p>{{v9}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 未加 number 修饰符</h3>
        <div>
          <el-input type="text"
            v-model="v10">
          </el-input>
          <p>{{v10}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 input 加 number 修饰符</h3>
        <div>
          <input type="text"
            class="el-input__inner"
            v-model.number="v11">
          <p>{{v11}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 加 number 修饰符</h3>
        <div>
          <el-input type="text"
            v-model.number="v12">
          </el-input>
          <p>{{v12}}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 button 未加 stop 修饰符</h3>
        <div @click="shout(2)">
          <button class="el-button"
            @click="shout(1)">ok</button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 未加 stop 修饰符</h3>
        <div @click="shout(2)">
          <el-button @click="shout(1)">ok</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 button 加 stop 修饰符</h3>
        <div @click="shout(2)">
          <button class="el-button"
            @click.stop="shout(1)">ok</button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 加 stop 修饰符</h3>
        <div @click="shout(2)">
          <el-button @click.stop="shout(1)">ok</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生父元素 未加 self 修饰符</h3>
        <div @click="shout(2)">
          <button class="el-button"
            @click="shout(1)">ok</button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 未加 self 修饰符</h3>
        <div @click="shout(2)">
          <el-button @click="shout(1)">ok</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生父元素 加 self 修饰符</h3>
        <div @click.self="shout(2)">
          <button class="el-button"
            @click.stop="shout(1)">ok</button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 加 self 修饰符</h3>
        <div @click.self="shout(2)">
          <el-button @click.stop="shout(1)">ok</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 button 添加 once 修饰符</h3>
        <button class="el-button"
          @click.once="shout(1)">ok</button>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 添加 once 修饰符</h3>
        <el-button @click.once="shout(1)">ok</el-button>
      </el-col>
      <el-col :span="12"
        class="capture">
        <h3>未加 capture 修饰符</h3>
        <div @click="shout(1)">
          obj1
          <div @click="shout(2)">
            obj2
            <div @click="shout(3)">
              obj3
              <div @click="shout(4)">
                obj4
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12"
        class="capture">
        <h3>加 capture 修饰符</h3>
        <div @click.capture="shout(1)">
          obj1
          <div @click.capture="shout(2)">
            obj2
            <div @click="shout(3)">
              obj3
              <div @click="shout(4)">
                obj4
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 button 添加 native 修饰符</h3>
        <button class="el-button"
          @click.native="shout(1)">ok</button>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 添加 native 修饰符</h3>
        <el-button @click.native="shout(1)">ok</el-button>
      </el-col>
      <el-col :span="12">
        <h3>原生 button 添加 right 修饰符</h3>
        <button class="el-button"
          @click.right="shout(1)">ok</button>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 添加 right 修饰符</h3>
        <el-button @click.right="shout(1)">ok</el-button>
      </el-col>
      <el-col :span="12">
        <h3>原生 input 添加 enter 修饰符</h3>
        <div>
          <input type="text"
            class="el-input__inner"
            @keyup.enter="shout(4)">
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 添加 enter 修饰符</h3>
        <div>
          <el-input type="text"
            @keyup.enter="shout(4)"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 input 添加 ctrl + c 修饰符</h3>
        <div>
          <input type="text"
            class="el-input__inner"
            @keyup.ctrl.67="shout(4)">
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 添加 ctrl + c 修饰符</h3>
        <div>
          <el-input type="text"
            @keyup.ctrl.67="shout(4)"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 button 添加 ctrl + 鼠标悬浮 修饰符</h3>
        <div>
          <button class="el-button"
            @mouseover.ctrl="shout(1)">ok</button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 添加 ctrl + 鼠标悬浮 修饰符</h3>
        <div>
          <el-button @mouseover.ctrl="shout(1)">ok</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 button 添加 shift + 鼠标点击 修饰符</h3>
        <div>
          <button class="el-button"
            @click.shift="shout(1)">ok</button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 添加 shift + 鼠标点击 修饰符</h3>
        <div>
          <el-button @click.shift="shout(1)">ok</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>原生 button 添加 shift + 鼠标点击 + exact 修饰符</h3>
        <div>
          <button class="el-button"
            @click.shift.exact="shout(1)">ok</button>
        </div>
      </el-col>
      <el-col :span="12">
        <h3>Element UI 添加 shift + 鼠标点击 + exact 修饰符</h3>
        <div>
          <el-button @click.shift.exact="shout(1)">ok</el-button>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'Modifiers',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      v1: '',
      v2: '',
      v3: '',
      v4: '',
      v5: '',
      v6: '',
      v7: '',
      v8: '',
      v9: '',
      v10: '',
      v11: '',
      v12: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    shout (e) {
      alert(e)
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less">
.modifiers {
  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  a {
    color: #fff;
  }
  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .el-col {
    height: 150px;
  }
  .capture {
    height: 200px;
    div {
      padding: 10px;
    }
  }
}
</style>
