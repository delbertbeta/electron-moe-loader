<template>
  <div class="wrapper">
    <div class="logo">MoeLoader</div>
    <div class="search-input">
      <div class="search-type">
        <img class="type-icon" src="~@/assets/icons/pixiv.ico" />
      </div>
      <div class="search-key" contenteditable="plaintext-only" @keypress="queryKeydown"></div>
      <div class="query-button"><i class="material-icons">arrow_forward</i></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    queryKeydown (e) {
      if (e.keyCode === 13) {
        e.preventDefault()
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
}
.logo {
  font-family: "Poiret One";
  font-size: 62px;
}
.search-input {
  width: 400px;
  height: 48px;
  border: solid 2px rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.search-type {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  border-right: solid 2px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
.search-type:hover {
  background-color: rgba(255, 255, 255, 0.6);
}
.type-icon {
  height: 32px;
  width: auto;
}
.search-key {
  flex-grow: 1;
  cursor: auto;
  line-height: 48px;
  font-size: 32px;
  padding-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 300;
}
[contenteditable="plaintext-only"] br {
  display:none !important;
}
[contenteditable="plaintext-only"] div {
  display:inline !important;
  white-space:nowrap;
}
.search-key:focus {
  outline: none;
}
.query-button {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
.query-button:hover {
  background-color: rgba(255, 255, 255, 0.6)
}
</style>
