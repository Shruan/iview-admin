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
                {{getRealRole()}}
              </div>
            </div>
            <Icon
            type="ios-arrow-down"
            class="nav-icon"
            ></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="changeRole">切换角色</DropdownItem>
            <DropdownItem
              name="logout"
              v-if="openEnvironment.indexOf('DingTalk') === -1"
            >退出登录</DropdownItem>
            <!-- <DropdownItem disabled>禁止的菜单</DropdownItem> -->
            <!-- <DropdownItem divided name="ceshi">带横线的菜单</DropdownItem> -->
          </DropdownMenu>
        </Dropdown>
        <!-- 修改工作状态 -->
        <Dropdown
          trigger="click"
          @on-click="changeStatus">
          <a
            href="javascript:void(0)"
            style="position: relative; display: block">
            <Avatar
              v-if="hasMounted"
              :icon="user.avatar ? '' : 'person'"
              :src="user.avatar ? user.avatar : ''"
            />
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
              <DropdownItem name="helpCenter">帮助中心</DropdownItem>
              <DropdownItem name="discover">探索单小二</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div
            class="open-in-window nav-icon-hover"
            v-if="openEnvironment.indexOf('DingTalk') !== -1"
            @click="openInWindow"
          >
            <Icon
              type="ios-globe-outline"
              size="26"
            ></Icon>
            <font>网页版</font>
          </div>
        <!-- </router-link> -->
        <!-- <Icon
          type="ios-notifications-outline"
          size="26"
          class="nav-icon"
        ></Icon>
        <Icon
          type="ios-call-outline"
          size="26"
          class="nav-icon"
        ></Icon> -->
        <Input
          v-model="allOrderKeyword"
          placeholder="请输入工单号或标题进行搜索"
          icon="ios-search"
          class="nav-input nav-icon"
          @on-click="searchAllOrder"
          @on-enter="searchAllOrder"
        />
      </div>
    </Col>
    <Modal
      title="切换角色"
      class="role-change-modal"
      :width="700"
      :loading="modalLoading"
      v-model="isShowChangeRoleModal"
      @on-ok="selectRoleFunc"
    >
      <div class="modal-box">
        <ul>
          <li
            v-for="item in roleList"
            :key="item.type"
            :class="{active: nowRole === item.type}"
            @click="nowRole = item.type"
          >
          <div class="role-icon" :style="`background-image: url(${item.icon})`"></div>
            <p class="role-name">{{item.roleName}}</p>
            <span class="role-label">{{item.label}}</span>
          </li>
        </ul>
      </div>
      <div slot="footer">
        <Button type="text" @click="isShowChangeRoleModal =  false">取消</Button>
        <Button type="primary" @click="selectRoleFunc" :loading="modalLoading">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import {
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Icon,
  Input,
  Modal,
  Dropdown,
  DropdownItem,
  Avatar
} from 'iview'

export default {
  components: {
    Col,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Icon,
    Input,
    Modal,
    Dropdown,
    DropdownItem,
    Avatar
  },
  data () {
    return {
      hasMounted: false,
      isShowChangeRoleModal: false,
      modalLoading: false,
      isChangeRoleSuccess: false,
      nowRole: 3,
      oldRole: 3,
      allOrderKeyword: '',
      openEnvironment: '',
      tagList: [],
      nowStatus: {}
    }
  },
  computed: {
    ...mapState('menu', [
      'breadcrumbList',
      'isVisibleSecondMenu',
      'thirdMenuList'
    ]),
    ...mapState('user', [
      'user',
      'roleList'
    ])
  },
  watch: {
    isShowChangeRoleModal (val) {
      if (!val && !this.isChangeRoleSuccess) {
        setTimeout(() => { this.nowRole = this.oldRole }, 1000)
      }
      this.isChangeRoleSuccess = false
    },
    'user': {
      handler (val) {
        this.nowRole = this.user.sysrole
        // console.log(this.user)
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('user', [
      '_user' // 同步筛选列
    ]),
    ...mapActions('menu', [
      '_DelAllTag',
      '_FirstMenuList',
      '_SecondMenuList',
      '_ThirdMenuList',
      '_AddTag'
    ]),
    ...mapMutations('menu', [
      '_isVisibleSecondMenu',
      '_allOrderKeyword',
      '_tag'
    ]),
    getRealRole () {
      for (let val of this.roleList) {
        if (val.type === this.user.sysrole) {
          return val.roleName
        }
      }
    },
    dropDownFunc (name) {
      if (name === 'changeRole') {
        this.$http.get('/v2/sessionUser/info').then(res => {
          this._user(res.data)
        })
        this.isShowChangeRoleModal = !this.isShowChangeRoleModal
      } else if (name === 'ceshi') {
        for (let key in sessionStorage) {
          if (key.indexOf('menu') !== -1) {
            sessionStorage.removeItem(key)
          }
        }
        // window.localStorage.clear()
      } else if (name === 'logout') {
        this.$Modal.warning({
          title: '退出登录',
          content: '确认退出登录吗？',
          closable: true,
          onOk: () => {
            this.logoutFunc()
          }
        })
      }
    },
    // 退出登录
    logoutFunc () {
      this.$http.post('/logout').then(res => {
        if (res.success) {
          this.clearSessionFunc()
          window.location.href = '/login'
        }
      })
    },
    // 清楚缓存
    clearSessionFunc () {
      this._DelAllTag()
      for (let key in sessionStorage) {
        if (key.indexOf('menu') !== -1) {
          sessionStorage.removeItem(key)
        }
      }
    },
    // 修改角色
    selectRoleFunc () {
      // if (this.nowRole === this.oldRole) {
      //   this.$Message.warning('请切换角色后再试')
      //   return false
      // }
      let url = '/user/changeRole'
      let data = {
        role: this.nowRole
      }
      this.modalLoading = true
      this.$http.post(url, data, { headers: this.$header }).then(res => {
        setTimeout(() => { this.modalLoading = false }, 500)
        if (res.success) {
          this.$Spin.show()
          this.oldRole = this.nowRole
          this.isChangeRoleSuccess = true
          this.isShowChangeRoleModal = false
          this.getNewMenuList()
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    // 获取菜单
    getNewMenuList () {
      // this.$http.get('/index?userid=52&epid=6').then(res => {
      // console.log(res)
      this.$http.get('/v2/sessionUser/info').then(res => {
        this._user(res.data)
        this.clearSessionFunc()
        this.$http.get('/v2/menu//list').then(res => {
          if (res.success) {
            let menuList = res.data
            // window.localStorage.clear()
            this._FirstMenuList(menuList)
            // this._SecondMenuList(menuList.secondList)
            // this._ThirdMenuList(menuList.thirdList)
            this.$Spin.hide()
            this.$Message.success('切换角色成功')
            this.$getAllBadgeCount('all')
            this.$router.push({ name: 'Enter' })
          }
        })
      })
      // })
    },
    // 搜索进入全部工单
    searchAllOrder () {
      for (let obj in this.thirdMenuList) {
        this.thirdMenuList[obj].forEach(val => {
          if (val.routerName === 'AllOrder') {
            this._AddTag(val.parent_id + '-' + val.id)
            this._allOrderKeyword(this.allOrderKeyword)
            this.$router.push({ name: 'AllOrder', query: { keyword: this.allOrderKeyword } })
          }
        })
      }
    },
    // 点击帮助下拉
    helpClick (name) {
      if (name === 'helpCenter') {
        this._AddTag('-2')
      } else if (name === 'discover') {
        this.$router.push({ name: 'GuideOne' })
      }
    },
    // 在浏览器中打开
    openInWindow () {},
    // 修改人员状态
    changeStatus (tagId) {
      if (this.user.isChargeUser === 1 || this.user.isChargeUser === 2) {
        this.$http.put('/v2/epTag/updateUserStateTag', { tagId: tagId }).then(res => {
          if (res.success) {
            this.$Message.success('修改状态成功')
            this.getRoleStatus()
          } else {
            this.$Message.success(res.message)
          }
        })
      } else {
        this.$Notice.warning({
          title: '不支持设置人员状态操作',
          duration: 0,
          render: h => {
            return h('span', {
              style: {
                lineHeight: '22px'
              }
            }, [
              '免费版本不支持设置人员状态操作，建议升级为VIP版本，客服热线0592-3278627 ',
              h('a', {
                on: {
                  click: () => this.$updateQrcodeModal.show()
                }
              }, '立即升级')
            ])
          }
        })
      }
    },
    // 获取当前人员状态
    getRoleStatus () {
      this.$http.get('/v2/epTag/getUserStateLabel').then(res => {
        if (res.success) {
          this.nowStatus = res.data
        }
      })
    },
    // 获取人员状态列表
    getTagList () {
      let url = '/v2/epTag/list'
      this.$http.get(url, { params: {
        code: 1
      } }).then(res => {
        if (res.success) {
          this.tagList = res.data
        }
      })
    }
  },
  created () {
    this.getRoleStatus()
    this.getTagList()
    this.openEnvironment = navigator.userAgent
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

.role-change-modal {
  z-index: 10001;

  .modal-box {
    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 159px;
        height: 160px;
        margin-right: 10px;
        border-radius: 5px;
        margin-top: 10px;
        box-shadow: 0px 0px 8px rgba(204, 204, 204, 0.35);
        cursor: pointer;

        .role-icon {
          width: 51px;
          height: 80px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .role-name {
          height: 30px;
          min-width: 1px;
          margin-top: 5px;
          font-size: 14px;
          color: #405060;
          text-align: center;
          line-height: 30px;
        }

        .role-label {
          height: 18px;
          min-width: 1px;
          font-size: 12px;
          color: #80848F;
          text-align: center;
        }
      }

      li:nth-child(4n) {
        margin-right: 0;
      }

      .active {
        background: -webkit-linear-gradient(left, @primary-color , @process-color); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, @primary-color, @process-color); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, @primary-color, @process-color); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, @primary-color , @process-color); /* 标准的语法 */

        .role-name {
          color: #fff;
        }

        .role-label {
          color: #fff;
        }
      }
    }
  }
}
</style>
