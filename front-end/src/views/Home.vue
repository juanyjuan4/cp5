<template>
  <div class="home">
    <div v-if="!user">
      <makeProfile></makeProfile>
    </div>

  </div>
</template>

<script>
import makeProfile from "../components/makeProfile.vue"

export default {
  name: 'home',
  components: {
    makeProfile
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
