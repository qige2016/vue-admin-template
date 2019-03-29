<template>
  <div class="compatible">
    <div class="mask"></div>
    <div class="isIE">
      <img src="@/assets/images/ie/window.png" alt="logo">
      <h1 class="title">您的浏览器版本过低</h1>
      <h5>为了更好的浏览体验，建议您使用以下现代浏览器的最新版本</h5>
      <span class="item">
        <a href="https://www.google.cn/chrome/index.html" target="_blank">
          <img src="@/assets/images/ie/chrome.png" alt="chrome">
        </a>
        <p class="text">谷歌浏览器</p>
      </span>
      <span class="item">
        <a href="http://browser.qq.com/" target="_blank">
          <img src="@/assets/images/ie/qqliulanqi.png" alt="chrome">
        </a>
        <p class="text">QQ浏览器</p>
      </span>
      <span class="item">
        <a href="https://www.360.cn/" target="_blank">
          <img src="@/assets/images/ie/360.png" alt="chrome">
        </a>
        <p class="text">360浏览器</p>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'downloadbrowser'
}
</script>
<style lang="scss" scoped>
  .compatible {
    .mask {
      position: fixed;
      background: #333;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 9999;
      overflow: hidden;
    }
    .isIE {
      width: 530px;
      position: fixed;
      background: #fff;
      border-radius: 3px;
      padding: 25px 25px 15px 25px;
      top: 50%;
      left: 50%;
      margin: -138px 0 0 -265px;
      z-index: 99999;
      box-sizing: border-box;
      border: 1px solid #bfc2c3;
      text-align: center;
      .title {
        font-size: 30px;
      }
      .item {
        padding: 10px;
        display: inline-block;
        width: 100px;
        cursor: pointer;
      }
      .sprites {
        margin-bottom: 10px;
      }
    }
  }
</style>
