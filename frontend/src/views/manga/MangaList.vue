<template>
  <main class="manga list">
    <section>
      <div v-if="loading">読み込み中...</div>
      <div v-else-if="mangaList.length === 0">データがありません</div>
      <ul v-else>
        <li v-for="manga in mangaList" :key="manga.id">
          <h3>{{ manga.title }}</h3>
          <aside>
            <p>{{ formatDate(manga.date_finished) }}</p>
            <p>
              {{ manga.last_read_type === 'volume' ? manga.last_read_number + '巻' :
                manga.last_read_type === 'chapter' ? manga.last_read_number + '話' : '未入力' }}
            </p>
            <p v-if="manga.rating != null" class="stars">
              <span v-for="n in 5" :key="n" :class="getStarClass(n, manga.rating)">★</span>
            </p>
            <p v-else>未評価</p>
          </aside> 
        </li>
      </ul>
    </section>
    <router-link to="/manga/add" class="goAdd">＋</router-link>
    <router-link to="/" class="goHome">家</router-link>
  </main>
</template>


<script>
import axios from 'axios';

export default {
  name: 'MangaList',
  data() {
    return {
      mangaList: [],
      loading: true
    };
  },
  methods: {
    fetchManga() {
      this.loading = true;
      axios.get('http://localhost:3000/api/manga')
        .then(res => {
          this.mangaList = res.data;
        })
        .catch(err => {
          console.error('取得失敗:', err);
        })
        .finally(() => {
          this.loading = false;
        })
    },
    formatDate(dateStr) {
      if (!dateStr) return '未入力';
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    getStarClass(n, ratingString){
      const rating = parseFloat(ratingString);
      if (n <= Math.floor(rating)) return 'star full';
      else if (n - 0.5 === rating) return 'star half';
      else return 'star empty';
    }
  },
  mounted() {
    this.fetchManga();
  }
};
</script>
