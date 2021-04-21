<template>
  <div class="home">
    <Posts v-if="user" />
    <makeProfile v-else />
  </div>
</template>

<script>
import makeProfile from "../components/makeProfile.vue";
import Posts from "../components/Posts.vue";
import axios from 'axios';

export default {
  name: 'home',
  components: {
    makeProfile,
    Posts,
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  }
}
</script>
