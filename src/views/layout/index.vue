<template lang="html">
  <!-- 首页五模块拼接入口 -->
  <div class="smy__box">
    <div class="smy__left">
      <FirstMenu/>
      <SecondMenu/>
    </div>
    <div class="smy__right">
      <HeadNav/>
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
import { mapActions } from 'vuex'
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
      transitionName: ''
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slider-right' : 'slider-left'
    }
  },
  methods: {
    ...mapActions('user', [
      '_getUserInfo'
    ])
  },
  created () {
    this._getUserInfo()
  }
}
</script>

<style lang="less">
@import '../../assets/theme';
@import '../../assets/iview-reset';

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
