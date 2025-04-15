<template>
  <div>
    <MangaForm @refresh="goBack" />
  </div>
</template>

<script>
import MangaForm from '../../components/manga/MangaForm.vue';

export default {
  name: 'MangaCreate',
  components: {
    MangaForm
  },
  methods: {
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>
