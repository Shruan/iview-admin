<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<style lang="less">
[v-cloak]{
  display: 'none';
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #F8F8F9;
}
html, body, #app{
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0px;
}
</style>
