<template>
  <div id="app">
    <div class="page">
      <div class="page__inner">
        <div class="page__content">
          <p>QR-code</p>
          <el-input
            v-model="qrcode"
            type="textarea"
            placeholder="Type your QR-code here..."
            resize="none"
            :rows="3"/>

          <el-tree
            :data="data"
            :props="defaultProps">
          </el-tree>

          <br><br>
          <pre>{{ qrcodeTransformed }}</pre>
          <br>
          <pre>{{ qrcodeParsed }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { parse, transform } from '@/utils/qrcode'

export default {
  name: 'App',

  data() {
    return {
      qrcode: ''
    }
  },

  computed: {
    qrcodeParsed() {
      return parse(this.qrcode)
    },

    qrcodeTransformed() {
      return transform(this.qrcodeParsed)
    },

    qrcodeTransformedTree() {
      return this.buildQrcodeTree(this.qrcodeTransformed)
    }
  },

  methods: {
    buildQrcodeTree(object) {
      let tree = []

      _.forIn(object, (value, key) => {
        let item = {
          label: _.startCase(key)
        }

        if (typeof value === 'object') {
          item.children = this.buildQrcodeTree(value)
        } else {
          item.value = value
        }

        tree.push(item)
      })

      return tree
    }
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 60px 0;
  background-color: #F7F7F7;

  &__inner {
    display: flex;
    flex-grow: 1;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #FFFFFF;
    border: 1px solid #D2D6D9;
    border-radius: 6px;
  }

  &__content {
    width: 100%;
    text-align: left;
  }
}
</style>
