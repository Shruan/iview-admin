<template lang="html">
  <!-- 一级菜单 -->
  <div class="smy__first-menu-box">
    <div class="logo">
    </div>
    <div
      v-for="(menu, index) in getFirstMenuList"
      :key="menu.name"
      class="first-menu"
      :class="{'first-menu-check': menu.name == firstMenu}"
      @click="_firstMenu(menu.name)"
    >
      <div :class="{'menu-shade': menu.name == firstMenu}"></div>
      <Icon
        type="arrow-left-b"
        class="arrow"
        size="20"
        v-show="menu.name == firstMenu"
      ></Icon>
      <div class="menu-icon">
        <Icon :type="menu.icon"/>
      </div>
      <div class="menu-name">
        {{menu.title}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import { Icon } from 'iview'

export default {
  components: {
    Icon
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('menu', [
      'firstMenu'
    ]),
    ...mapGetters('menu', [
      'getFirstMenuList',
    ])
  },
  methods: {
    ...mapMutations('menu', [
      '_firstMenu'
    ])
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/theme';

.smy__first-menu-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  background: -webkit-linear-gradient(@primary-color, @nav-color); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(@primary-color, @nav-color); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(@primary-color, @nav-color); /* Firefox 3.6 - 15 */
  background: linear-gradient(@primary-color, @nav-color); /* 标准的语法 */
  padding-top: 5px;
  z-index: 99;

  .logo {
    width: 50px;
    height: 55px;
    background-image: url('../../assets/logo.png');
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .first-menu:hover {
    cursor: pointer;
    color: #FFF;
  }

  .first-menu {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 50px;
    color: #D1F2E1;

    .menu-icon {
      line-height: 22px;
      font-size: 20px;
    }

    .menu-name {
      margin-top: 5px;
      line-height: 12px;
      font-size: 12px;
    }

    .menu-shade {
      background: #333;
      opacity: 0.05;
      width:60px;
      height:50px;
      position:absolute;
      top: 0px;
    }
  }

  .first-menu-check {
    color: #FFF;
  }

  .arrow {
    position: absolute;
    left: 53px;
    top: 15px;
  }
}
</style>
