<template>
  <div id="app">
    <function-bar></function-bar>
    <div class="container" :class="{'mask-open': maskOpen}">
      <div class="logo-wrapper">
        <div class="logo">MoeLoader
          <i class="setting-button icon material-icons" @click="openMask">settings</i>
        </div>
        <logo-search></logo-search>
      </div>
      <pic-list class="pic-list"></pic-list>
      <download-manager ref="downloadManager" class="download-manager"></download-manager>
    </div>
    <transition name="fade">
      <div v-if="maskOpen" class="mask">
        <div class="internal">
          <Settings></Settings>
          <!-- <SiteChooser></SiteChooser> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import functionBar from './components/functionBar'
import logoSearch from './components/logoSearch'
import downloadManager from './components/downloadManager'
import picList from './components/picList'
import Settings from './components/Settings'
import SiteChooser from './components/SiteChooser'

// import proxy from './utils/proxy'

export default {
  name: 'electron-moe-loader',
  components: { functionBar, logoSearch, downloadManager, picList, Settings, SiteChooser },
  data () {
    return {
      maskOpen: false
    }
  },
  methods: {
    // async debug() {
    //   proxy.getProxy(this, (p) => {
    //     console.log(p);
    //   })
    // }
    openMask () {
      // this.maskOpen = !this.maskOpen
      this.$refs['downloadManager'].addTask('firefox.exe', 'https://app.delbertbeta.cc/dfsdfsdfsdf')
    }
  }
}
</script>

<style lang="scss">
/* CSS */
#app {
  height: 100%;
  width: 100%;
}

.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  filter: blur(0px);
  background-color: white;
  transition: filter 1s ease;
}

.container.mask-open {
  filter: blur(0.5rem);
}

.logo-wrapper {
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
}

.logo {
  font-family: "Poiret One";
  font-size: 62px;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.setting-button {
  margin-left: 12px;
  color: #333333;
  cursor: pointer;
}

/* transitions */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
  .internal {
    transition: transform 1s ease;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  .internal {
    transform: translateY(10%);
  }
}

.internal {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  color: white;
}

html {
  height: 100%;
  width: 100%;
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  user-select: none;
  cursor: default;
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica,
    "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}

body {
  margin: 0;
  height: 100%;
  width: 100%;
}

.pic-list {
  flex-grow: 1;
}

.download-manager {
  width: 250px;
}

/* cyrillic */
@font-face {
  font-family: "Poiret One";
  font-style: normal;
  font-weight: 400;
  src: local("Poiret One"), local("PoiretOne-Regular"),
    url(~@/assets/UqyVK80NJXN4zfRgbdfbo5pcV_cx.woff2) format("woff2");
  unicode-range: U + 0400-045f, U + 0490-0491, U + 04b0-04b1, U + 2116;
}
/* latin-ext */
@font-face {
  font-family: "Poiret One";
  font-style: normal;
  font-weight: 400;
  src: local("Poiret One"), local("PoiretOne-Regular"),
    url(~@/assets/UqyVK80NJXN4zfRgbdfbo5BcV_cx.woff2) format("woff2");
  unicode-range: U + 0100-024f, U + 0259, U + 1-1eff, U + 2020, U + 20a0-20ab,
    U + 20ad-20cf, U + 2113, U + 2c60-2c7f, U + A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Poiret One";
  font-style: normal;
  font-weight: 400;
  src: local("Poiret One"), local("PoiretOne-Regular"),
    url(~@/assets/UqyVK80NJXN4zfRgbdfbo55cVw.woff2) format("woff2");
  unicode-range: U + 0000-00ff, U + 0131, U + 0152-0153, U + 02bb-02bc, U + 02c6,
    U + 02da, U + 02dc, U + 2000-206f, U + 2074, U + 20ac, U + 2122, U + 2191,
    U + 2193, U + 2212, U + 2215, U + FEFF, U + FFFD;
}

@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: url(~@/assets/MaterialIcons-Regular.woff2) format("woff2");
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}

::-webkit-scrollbar
{
    width: 4px;
    height: 4px;
    background-color: #F5F5F5;
}
 
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
    border-radius: 2px;
    background-color: white;
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius: 2px;
    background-color: #aaaaaa;
}
</style>
