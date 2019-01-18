<template lang="html">
  <!-- 首页五模块拼接入口 -->
  <div class="smy__box">
    <div class="smy__left">
      <FirstMenu/>
      <SecondMenu/>
    </div>
    <div class="smy__right">
      <!-- <HeadNav/> -->
      <HeadTags/>
      <div class="smy__content">
        <transition :name="transitionName">
          <router-view class="router"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import FirstMenu from './FirstMenu'
import SecondMenu from './SecondMenu'
import HeadNav from './HeadNav'
import HeadTags from './HeadTags'

export default {
  components: {
    FirstMenu,
    SecondMenu,
    HeadNav,
    HeadTags
  },
  data () {
    return {
      transitionName: '',
      // 更新说明
      updateInfo: {},
      updateEditModal: false,
      showInitDeploy: false
    }
  },
  computed: {
    ...mapState('menu', [
      'tag',
      'thirdMenuList',
      'allOrderKeyword'
    ])
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slider-right' : 'slider-left'
    },
    // 监听选中的标签，进行页面跳转
    tag (val) {
      if (val === '-1') {
        this.$router.push({ name: 'Enter' })
      } else if (val === '-2' || val === -2) {
        this.$router.push({ name: 'Help' })
      } else {
        this.$router.push({ name: val })
        // let tagName = val.split('-')
        // this.thirdMenuList[tagName[0]].forEach(val => {
        //   if (val.id === Number(tagName[1])) {
        //     if (val.routerName === 'AllOrder') {
        //       if (this.allOrderKeyword) {
        //         this.$router.push({ name: 'AllOrder', query: { keyword: this.allOrderKeyword } })
        //         this._allOrderKeyword('')
        //       } else {
        //         let name = val.routerName[0].toLowerCase() + val.routerName.substring(1)
        //         if (window.location.href.indexOf(name) === -1) {
        //           this.$router.push({name: val.routerName})
        //         }
        //       }
        //     } else {
        //       let name = val.routerName[0].toLowerCase() + val.routerName.substring(1)
        //       if (window.location.href.indexOf(name) === -1) {
        //         this.$router.push({name: val.routerName})
        //       }
        //     }
        //   }
        // })
      }
    }
  },
  methods: {
    ...mapMutations('menu', [
      '_orderMenuList',
      '_allOrderKeyword'
    ]),
    ...mapActions('menu', [
      '_FirstMenuList',
      '_SecondMenuList',
      '_ThirdMenuList'
    ])
  },
  created () {}
  // beforeRouteEnter (to, from, next) {
  //   axios.get('/v2/menu/list').then(res => {
  //     if (res.success) {
  //       let menuList = res.data
  //       next(vm => {
  //         vm._FirstMenuList(menuList)
  //         // vm._SecondMenuList(menuList.secondList)
  //         // vm._ThirdMenuList(menuList.thirdList)
  //       })
  //     }
  //   })
  // }
}
</script>

<style lang="less">
@import '../../assets/theme';
// tooltip气泡背景色
.ivu-tooltip{
  .ivu-tooltip-popper[x-placement^=bottom]{
    .ivu-tooltip-inner{
      background-color: @tips-color;
    }
    .ivu-tooltip-arrow{
      border-bottom-color: @tips-color
    }
  }
}
// poptip气泡阴影
.ivu-poptip-popper{
  .ivu-poptip-inner{
    box-shadow:0 2px 10px rgba(153, 153, 153, 0.9)
  }
}
// 还原poptip气泡confirm阴影
.ivu-poptip-confirm{
  .ivu-poptip-inner{
    box-shadow:0 1px 6px rgba(0, 0, 0, 0.2)
  }
}
// 气泡“我知道了” 放右边
.iKnowBtn{
  text-align: right;
}

.ivu-page .ivu-page-item a {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}

.ivu-modal-wrap .ivu-modal {
  max-width: 100%;
  margin-bottom: 200px;
  top: 50px;
}
.visit-modal .ivu-modal-content .ivu-modal-body {
  padding-top: 0;
  padding-bottom: 0;
}

// 多选select选择器样式修复
.ivu-select-multiple .ivu-select-selection {
  white-space: nowrap;
  overflow-y: auto;
}
// ghost按钮中文字颜色
.ivu-btn-ghost,.ivu-btn-default {
  color: #80848F;
}

// ghost按钮中文字hover颜色
.ivu-btn-ghost:hover,.ivu-btn-default:hover {
  color: @primary-color;
}

// 工单视图poptip 去除内边距
.template-view .ivu-poptip-inner .ivu-poptip-body {
  padding: 0 0;
}

// 表单提示 自定义红星
.form-red-star {
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed3f14;
}

// 新手引导Tip
.smy__box {
  display: flex;
  height: 100%;

  .text-omit {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  //-------------组件样式重写-------------
  // 标签页的hover颜色
  .ivu-tabs-tab:hover {
    color: @primary-color;
  }

  // 莫名一条线
  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0px;
  }
  // 修改tag圆点颜色
  .ivu-tag-green,
  .ivu-tag-green.ivu-tag-dot .ivu-tag-dot-inner{
    background-color: #3ccba6;
    line-height: 32px;
  }

  .ivu-tag-green .ivu-tag-text {
    color: inherit !important;
  }

  // 修改二级菜单的hover颜色
  .ivu-menu-submenu-title:hover,.ivu-menu-item:hover {
    background: #F5F7F9;
  }

  // 修改二级菜单的上箭头边距
  .ivu-menu-submenu-title span i:last-child {
    margin-right: 0;
  }

  // 版本用量页面进度条色值修改
  .version-dosage {
    .ivu-progress-success {
      .ivu-progress-outer {
        .ivu-progress-inner {
          .ivu-progress-bg {
            background-color: #3ccba6
          }
        }
      }
    }
  }

  // error按钮中文字颜色
  .ivu-btn-error {
    background: transparent;
    color: #80848F;
    border-color: #DDDEE1;
  }

  // error按钮中文字hover颜色
  .ivu-btn-error:hover {
    background: transparent;
    color: #F2795B;
    border-color: #F2795B;
  }

  .ivu-card-body {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  //-------------组件样式重写结束-------------

  // 字体超出省略
  .smy__text-overflow-one-line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .smy__left {
    display: flex;
    height: 100%;
  }

  .smy__right {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .smy__content {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      position: relative;

      .smy__card-full-box {
        padding: 10px;
        height: 100%;
      }

      .smy__card-full {
        margin-bottom: 10px;
        min-height: 100%;

        .extra {
          font-size: 12px;
          color: #80848F;
        }
      }
      .extra {
        font-size: 12px;
        color: #80848F;
      }
      // ---路由切换动效---
      .router {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
      }

      .slider-parent {
        position: relative;
      }

      .slider{
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        position: absolute;
      }

      .slider-enter-left-active, .slider-left-leave-active {
        transition: all .3s;
        -webkit-transition: all .3s;
      }
      .slider-left-enter, .slider-left-leave-active {
        opacity: 0;
      }
      .slider-left-enter {
        transform: translateX(20px);
      }
      .slider-left-leave-active {
        transform: translateX(-20px);
      }

      .slider-enter-right-active, .slider-right-leave-active {
        transition: all .3s;
        -webkit-transition: all .3s;
      }
      .slider-right-enter, .slider-right-leave-active {
        opacity: 0;
      }
      .slider-right-enter {
        transform: translateX(-20px);
      }
      .slider-right-leave-active {
        transform: translateX(20px);
      }
      // ---路由切换动效 结束---
    }
  }
}
</style>
