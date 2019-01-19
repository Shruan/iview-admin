<template lang="html">
  <div class="">
    <Modal
      title="切换角色"
      class="role-change-modal"
      :width="700"
      :loading="true"
      v-model="isShow"
    >
      <div class="modal-box">
        <ul>
          <li
            v-for="item in roleList"
            :key="item.type"
            :class="{active: nowRole === item.type}"
            @click="nowRole = item.type"
          >
            <div class="role-icon" :style="`background-image: url(${item.icon})`"/>
            <p class="role-name">{{item.roleName}}</p>
            <span class="role-label">{{item.label}}</span>
          </li>
        </ul>
      </div>
      <div slot="footer">
        <Button
          type="text"
          @click="isShow = false">
          取消
        </Button>
        <Button
          type="primary"
          :loading="loading"
          @click="submit">
          确认
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Modal, Button } from 'iview'
import { mapGetters } from 'vuex'
export default {
  components: {
    Modal,
    Button
  },
  props: {
    value: Boolean
  },
  data () {
    return {
      loading: false,
      isShow: this.value,
      nowRole: 3,
      oldRole: 3
    }
  },
  computed: {
    ...mapGetters('user', [
      'roleList'
    ])
  },
  watch: {
    value (val) {
      this.isShow = this.value
    },
    isShow (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    submit () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/theme';

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
