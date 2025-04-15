<template>
  <form @submit.prevent="handleSubmit" class="p-4 border rounded mb-6">
    <h2 class="text-xl font-bold mb-4">
      {{ editingId ? '✏️ 漫画の編集' : '📥 新しい漫画を記録' }}
    </h2>

    <div class="mb-2">
      <label>タイトル：</label>
      <input v-model="form.title" required class="border px-2 py-1 w-full" />
    </div>

    <div class="mb-2">
      <label>読了日：</label>
      <input v-model="form.date_finished" type="date" class="border px-2 py-1 w-full" />
    </div>

    <div class="mb-2">
      <label>評価（0.5〜5）：</label>
      <input v-model.number="form.rating" type="number" step="0.5" min="0" max="5" class="border px-2 py-1 w-full" />
    </div>

    <div class="mb-2">
      <label>メモ：</label>
      <textarea v-model="form.memo" class="border px-2 py-1 w-full"></textarea>
    </div>

    <div class="mb-2">
      <label>進捗タイプ：</label>
      <select v-model="form.last_read_type" class="border px-2 py-1 w-full">
        <option disabled value="">選択してください</option>
        <option value="volume">巻</option>
        <option value="chapter">話</option>
      </select>
    </div>

    <div class="mb-4">
      <label>何{{ form.last_read_type === 'volume' ? '巻' : '話' }}まで読んだ？</label>
      <input v-model.number="form.last_read_number" type="number" min="0" class="border px-2 py-1 w-full" />
    </div>

    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      {{ editingId ? '更新' : '登録' }}
    </button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MangaForm',
  props: {
    editingData: Object // 👈 編集用データを親から受け取る
  },
  data() {
    return {
      form: {
        title: '',
        date_finished: '',
        rating: null,
        memo: '',
        last_read_type: '',
        last_read_number: null
      },
      editingId: null
    };
  },
  watch: {
    editingData: {
      handler(newVal) {
        if (newVal) {
          this.editingId = newVal.id;
          this.form = { ...newVal }; // 👈 データをフォームに反映
        }
      },
      immediate: true
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.editingId) {
          // 更新モード
          await axios.put(`http://localhost:3000/api/manga/${this.editingId}`, this.form);
          alert('更新しました');
        } else {
          // 新規登録モード
          await axios.post('http://localhost:3000/api/manga', this.form);
          alert('登録完了！');
        }

        this.$emit('refresh');
        this.resetForm();
      } catch (err) {
        console.error('送信エラー:', err);
        alert('エラーが発生しました');
      }
    },
    resetForm() {
      this.form = {
        title: '',
        date_finished: '',
        rating: null,
        memo: '',
        last_read_type: '',
        last_read_number: null
      };
      this.editingId = null;
    }
  }
};
</script>
