<!-- frontend/src/views/Home.vue -->
<template>
  <div class="text-center">
    <h1 class="text-3xl font-bold mb-6">📚 記録アプリへようこそ</h1>
    <p class="mb-6">ジャンルを選んで記録を始めましょう</p>

    <div class="space-x-4">
      <router-link
        to="/manga/list"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        📚 漫画
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>
