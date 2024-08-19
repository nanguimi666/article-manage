<script setup>
defineProps({ title: { required: true, type: String } });
</script>

<template>
  <el-card>
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <slot name="button"></slot>
      </div>
    </template>
    <slot></slot>
    <template #footer>
      <div style="display: flex; justify-content: flex-end">
        <slot name="footer"></slot>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
