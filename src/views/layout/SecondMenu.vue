<template lang="html">
  <!-- 二级菜单 -->
  <div
    class="smy__second-menu"
    :class="{'smy__second-menu-hide': !isVisibleSecondMenu}"
    :style="{'z-index': isVisibleSecondMenu ? '99' : ''}"
  >
    <div class="logo-text">
      iview-admin
    </div>
    <Menu
      ref="secondMenu"
      theme="light"
      style="width: 160px;height: 100%;overflow-x: hidden;"
      @on-select="onSelect"
      :open-names="openNames"
      :active-name="tag"
    >
        <Submenu
          v-for="menu in getSecondMenuList"
          :name="menu.name"
          :key="menu.name"
        >
            <template slot="title">
              <span class="title-text">
                <Icon
                  :type="menu.meta.icon"
                  :size="menu.meta.size ? menu.meta.size : '16'"
                  style="vertical-align: baseline;"
                />
                {{menu.meta.title}}
              </span>
            </template>
            <MenuItem
              :class="{ 'menu-disabled': false }"
              v-for="child in menu.children"
              :name="child.name"
              :key="child.name"
              style="padding-left: 35px"
            >
            <!-- {{item}} -->
            <span style="color:#80848F; font-size: 13px; margin-left: 5px;" >
              {{child.meta.title}}
              <!-- <Badge
                class-name="demo-badge-alone"
                v-if="allBadgeCount[menu.routerName]"
                :count="allBadgeCount[menu.routerName]"
              /> -->
              <!-- <Icon
                type="ios-lock"
                v-show="(isDisabledFunc && menu.meta && menu.meta.isDisabled)
                || freeUserLockFunc(menu.routerName)">
              </Icon> -->
            </span>
            </MenuItem>
        </Submenu>
    </Menu>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import {
  Menu,
  Submenu,
  MenuItem,
  Icon
} from 'iview'

export default {
  components: {
    Menu,
    Submenu,
    MenuItem,
    Icon
  },
  data () {
    return {
      // 免费版菜单锁
      freeUserLock: [
        'TemplateView',
        'ContactManage',
        'AddressManage',
        'ProductManage',
        'DueOrder',
        'AutomaticCopy',
        'SLAManage',
        'ProgressSla',
        'NoticeManage',
        'EvaluationReport',
        'CyclePlan',
        'CycleTmpl'
      ],
      freeUserLockNotice: {
        TemplateView: { title: '不支持查看模板视图', content: '免费版本不支持查看模板视图' },
        ContactManage: { title: '不支持联系人管理', content: '免费版本不支持联系人管理' },
        AddressManage: { title: '不支持地址管理', content: '免费版本不支持地址管理' },
        ProductManage: { title: '不支持产品管理', content: '免费版本不支持产品管理' },
        DueOrder: { title: '不支持超时工单查看', content: '免费版本不支持超时工单查看' },
        AutomaticCopy: { title: '不支持自动抄送', content: '免费版本不支持自动抄送' },
        SLAManage: { title: '不支持设置SLA', content: '免费版本不支持设置SLA' },
        ProgressSla: { title: '不支持设置进度SLA' },
        NoticeManage: { title: '不支持管理企业公告', content: '免费版本管理企业公告' },
        EvaluationReport: { title: '不支持查看评价报表', content: '免费版本查看评价报表' },
        CyclePlan: { title: '不支持管理计划模板' },
        CycleTmpl: { title: '不支持配置周期计划' }
      }
    }
  },
  computed: {
    ...mapGetters('menu', [
      'getSecondMenuList'
    ]),
    ...mapState('menu', [
      'isVisibleSecondMenu',
      'firstMenu',
      'firstMenuList',
      'secondMenuList',
      'thirdMenuList',
      'tag',
      'allBadgeCount'
    ]),
    // ...mapState('user', [
    //   'user',
    //   'isDisabledFunc'
    // ]),
    // 获取应展开的二级菜单
    openNames () {
      return this.getSecondMenuList.map(item => item.name) || []
    }
  },
  watch: {
    // 刷新二级菜单的展开状态
    openNames () {
      this.$nextTick(() => {
        let menu = this.$refs.secondMenu
        menu.updateOpened()
        menu.updateActiveName()
      })
    }
  },
  methods: {
    ...mapMutations('menu', [
      '_secondMenu'
    ]),
    ...mapActions('menu', [
      '_AddTag'
    ]),
    // 免费用户 菜单加锁
    // freeUserLockFunc (routerName) {
    //   if (this.user.isChargeUser === 0 && this.freeUserLock.indexOf(routerName) !== -1) {
    //     return true
    //   }
    //   return false
    // },
    // // 使用菜单 tagName 交换当前路由的 RouterName
    // getCurrRouterName (val) {
    //   let tagName = val.split('-')
    //   let currRouter = this.thirdMenuList[tagName[0]].find(item => item.id === Number(tagName[1]))
    //   return currRouter.routerName
    // },
    // 点击三级菜单触发
    onSelect (name) {
      // let currRouterName = this.getCurrRouterName(name)
      // // 免费版本 限制菜案点击提示
      // if (this.freeUserLockFunc(currRouterName)) {
      //   this.$permissionNotice(this.freeUserLockNotice[currRouterName].title, this.freeUserLockNotice[currRouterName].content)
      //   return false
      // }
      const getNowMenuData = (key) => {
        for (let val of this.getSecondMenuList) {
          return val.children.find(item => item.name === key)
        }
      }
      this._AddTag(getNowMenuData(name))
    }
  },
  created () {}
}
</script>

<style lang="less" scoped>
@import '../../assets/theme';

// 不显示滚轮
::-webkit-scrollbar{
  display:none;
}

.ivu-menu {
  position: inherit;
}

.smy__second-menu{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;
  box-shadow: 2px 0 6px #EDEDED;
  transition: 0.5s;
  -webkit-transition: 0.5s;
  background: #fff;
  padding-top: 60px;

  .logo-text {
    position: fixed;
    top: 0;
    flex-shrink: 0;
    display: flex;
    height: 60px;
    width: 160px;
    color: @primary-color;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    background: #FFF;
    box-shadow: 0 2px 6px #EDEDED;
    z-index: 999;
  }

  .title-text {
    color: #80848F;
  }
  // .demo-badge{
  //   width: 42px;
  //   height: 42px;
  //   background: @primary-color!important;
  //   border-radius: 6px;
  //   display: inline-block;
  // }

}

.smy__second-menu-hide{
  width: 0px;
  opacity: 0;
}
</style>
<style media="screen">
.demo-badge-alone{
  background: #8cdfb5!important;
  position: relative;
  top: -2px;
  transform: scale(0.8)!important;
}
</style>
