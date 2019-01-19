<template lang="html">
  <!-- 头部导航栏 -->
  <div class="smy__nav-box">
    <Col span="10">
      <div class="smy__nav-left">
        <div @click="_isVisibleSecondMenu">
          <Icon
            type="md-menu"
            size="26"
            class="icon"
            :class="{'icon-rotate': !isVisibleSecondMenu}"
          />
        </div>
        <Breadcrumb class="breadcrumb">
          <template v-for="(breadcrumb, index) in breadcrumbList">
            <BreadcrumbItem
              v-if="index == breadcrumbList.length - 1"
              :key="index">
              {{breadcrumb.name}}
            </BreadcrumbItem>

            <BreadcrumbItem
              v-else
              :key="index"
              :to="{ path: breadcrumb.path }">
              {{breadcrumb.name}}
            </BreadcrumbItem>
          </template>
        </Breadcrumb>
      </div>
    </Col>
    <Col span="14">
      <div class="smy__nav-right">
        <Dropdown
          placement="bottom-end"
          @on-click="dropDownFunc"
        >
          <a href="javascript:void(0)" class="avatar">

            <div class="avatar-text">
              <div class="avatar-text-first smy__text-overflow-one-line">
                {{user.name}}
              </div>
              <div class="avatar-text-second">
                {{user.type | getRealRole(roleList)}}
              </div>
            </div>
            <Icon
            type="ios-arrow-down"
            class="nav-icon"
            ></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="changeRole">切换角色</DropdownItem>
            <DropdownItem name="logout">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <!-- 修改工作状态 -->
        <Dropdown
          trigger="click"
          @on-click="changeStatus">
          <a
            href="javascript:void(0)"
            style="position: relative; display: block">
            <Avatar v-if="hasMounted && user.avatar" :src="user.avatar"/>
            <Avatar v-else icon="person"/>
            <Icon
              class="user-status"
              :color="nowStatus.color_rgb || '#ededed'"
              size="10"
              type="ios-radio-button-on"
            />
            <div class="user-status-box"></div>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="item in tagList"
              :key="item.id"
              :name="item.id">
              <Icon
                style="margin-right: 10px"
                :color="item.color_rgb"
                type="ios-radio-button-on"
                size="10"
              />
              {{item.name}}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <!-- <router-link :to="{ name: 'Help' }"> -->

        <Dropdown
          trigger="click"
          @on-click="helpClick"
          >
          <Icon
            type="ios-help-circle-outline"
            size="26"
            class="nav-icon nav-icon-hover">
          </Icon>

          <DropdownMenu slot="list">
            <DropdownItem name="other">其他操作</DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </div>
    </Col>

    <ChangeRole v-model="isShowChangeRoleModal"/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import {
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Modal
} from 'iview'

import ChangeRole from './ChangeRole'

export default {
  components: {
    Col,
    Breadcrumb,
    BreadcrumbItem,
    Icon,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Avatar,
    ChangeRole
  },
  data () {
    return {
      hasMounted: false,
      isShowChangeRoleModal: false,
      tagList: [],
      nowStatus: {}
    }
  },
  filters: {
    getRealRole (value, list) {
      let roleMsg = list.find(item => item.type === value)
      return (roleMsg && roleMsg. roleName) || ''
    }
  },
  computed: {
    ...mapState('menu', [
      'breadcrumbList',
      'isVisibleSecondMenu'
    ]),
    ...mapState('user', [
      'user'
    ]),
    ...mapGetters('user', [
      'roleList'
    ])
  },
  methods: {
    ...mapActions('menu', [
      '_DelAllTag'
    ]),
    ...mapMutations('menu', [
      '_isVisibleSecondMenu'
    ]),
    dropDownFunc (name) {
      const actions = {
        changeRole: () => this.isShowChangeRoleModal = !this.isShowChangeRoleModal,
        logout: () => {
          Modal.warning({
            title: '退出登录',
            content: '确认退出登录吗？',
            closable: true,
            onOk: () => {
              this.logoutFunc()
            }
          })
        }
      }
      actions[name].call(this) // 执行操作
    },
    // 退出登录
    logoutFunc () {
      this.$http.post('/logout').then(res => {
        if (res.success) {
          this.clearSessionFunc()
          this.$router.push({ name: 'login' })
        }
      })
    },
    // 清除缓存
    clearSessionFunc () {
      this._DelAllTag()
      for (let key in sessionStorage) {
        if (key.indexOf('menu') !== -1) {
          sessionStorage.removeItem(key)
        }
      }
    },
    // 点击帮助下拉
    helpClick (name) {
      const actions = {
        other: () => {}
      }
      actions[name].call(this) // 执行操作
    },
    // 在浏览器中打开
    openInWindow () {},
    // 修改人员状态
    changeStatus (tagId) {
      this.$http.put('/v2/epTag/updateUserStateTag', { tagId: tagId }).then(res => {
        if (res.success) {
          this.$Message.success('修改状态成功')
          this.getRoleStatus()
        } else {
          this.$Message.success(res.message)
        }
      })
    },
    // 获取当前人员状态
    getRoleStatus () {
      this.$http.get('/v2/epTag/getUserStateLabel').then(res => {
        if (res.success) {
          this.nowStatus = res.data
        }
      })
    }
  },
  created () {
    // this.getRoleStatus()
  },
  mounted () {
    setTimeout(() => {
      this.hasMounted = true
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/theme';

.smy__nav-box {
  height: 67px;
  display: flex;
  background: #FFF;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 6px #EDEDED;
  z-index: 89;

  .smy__nav-left {
    display: flex;
    align-items: center;

    .icon {
      margin: 0 15px 0 15px;
      transition: .5s;
      color: #80848F;
    }

    .icon:hover {
      cursor: pointer;
    }

    .icon-rotate {
      transform:rotate(-90deg);
    }
  }

  .smy__nav-right {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    // margin-right: 20px;

    .nav-icon {
      margin-right: 20px;
      color: #80848F;
    }
    .open-in-window {
      display: flex;
      width: 90px;
      flex-shrink: 0;
      color: #80848F;

      font {
        line-height: 26px;
        margin-left: 10px
      }
    }
    .nav-icon-hover:hover {
      color: #3ccba6;
      cursor: pointer;
    }

    .user-status {
      position: absolute;
      font-size: 10px;
      bottom: -1px;
      right: 0;
    }

    .user-status-box {
      position: absolute;
      width: 13px;
      height: 13px;
      border: 2px solid #fff;
      right: -1px;
      bottom: -1px;
      border-radius: 50%;
    }

    @media screen and (min-width: 1339px) {
      .nav-input {
        width: 400px;
      }
    }

    .avatar {
      display: flex;
      align-items: center;
      color: #405060;

      .avatar-text {
        margin-left: 15px;
        width: 85px;
        margin-right: 5px;

        .avatar-text-first{
          font-size: 14px;
        }

        .avatar-text-second{
          font-size: 12px;
        }
      }
    }

  }
}

</style>
