<template>
  <div class="message">
    <el-popover placement="bottom" :width="310" trigger="click">
      <template #reference>
        <el-badge :value="5" class="item">
          <i :class="'iconfont icon-xiaoxizhongxin'" class="toolBar-icon"></i>
        </el-badge>
      </template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="通知(5)" name="first">
          <div class="message-list">
            <div class="message-item" v-for="(item, index) in 5" :key="index">
              <img
                src="@/assets/images/msg01.png"
                alt=""
                class="message-icon"
              />
              <div class="message-content">
                <span class="message-title">一键三连 Geeker-Admin 🧡</span>
                <span class="message-date">一分钟前</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消息(0)" name="second">
          <div class="message-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无消息</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="代办(0)" name="third">
          <div class="message-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无代办</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const activeName = ref("first");
</script>
<style lang="scss" scoped>
.message-item {
  display: flex;
  align-items: center;
}
</style>
