<template>
  <div id="app">
    <div class="page">
      <div class="page__inner">
        <div class="page__content">
          <p>QR-code String:</p>
          <el-input
            v-model="qrcode"
            type="textarea"
            placeholder="Type your QR-code here..."
            resize="none"
            :rows="3"/>

          <p>QR-code Model:</p>
          <div
            v-if="qrcode.length && isCorrectChecksum"
            v-html="qrcodeModel"
            class="page__json"/>

          <el-alert
            v-if="!qrcode.length"
            title="Enter qrcode"
            type="info"
            show-icon
            :closable="false"/>

          <el-alert
            v-else-if="!isCorrectChecksum"
            title="Check sum not exist or not correct"
            type="error"
            show-icon
            :closable="false"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import htmlStringify from 'html-stringify'
import { isCorrectChecksum, getQrCodeModel } from '@/utils/qrcode'

export default {
  name: 'App',

  data() {
    return {
      qrcode: ''
    }
  },

  computed: {
    isCorrectChecksum() {
      return isCorrectChecksum(this.qrcode)
    },

    qrcodeTransformed() {
      return this.isCorrectChecksum ? getQrCodeModel(this.qrcode) : null
    },

    qrcodeModel() {
      return this.isCorrectChecksum ? htmlStringify({ model: this.qrcodeTransformed }) : ''
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

  &__json {
    margin-top: 14px;
    padding: 30px;
    background: #F7F7F7;
    border: 1px solid #D2D6D9;
  }
}
</style>
