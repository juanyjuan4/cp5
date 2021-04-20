<template>
<div class="profile">
    <div v-if="user">
        <h1>{{user.name}}'s Profile</h1>
        <p>Name: {{user.name}}</p>
        <p>Username: {{user.username}}</p>
        <img :src="user.avatar">
        <textarea v-model="user.bio"></textarea>
        <button type="submit" @click.prevent="editBio">Edit</button>
        <button type="button" @click="logout">Logout</button>
    </div>

    <div v-else>
        <p><a href="/">Login</a> to view profile</p>
        
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Profiles',
    data() {
        return {

        }
    },
    computed: {
        user() {
            return this.$root.$data.user;
        },
    },
    methods: {
        async logout() {
            try {
                await axios.delete("/api/users");
                this.$root.$data.user = null;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },
        async editBio() {
            await axios.put("/api/users/" + this.user._id, {
                bio: this.user.bio,
            });
            //this.$root.$data.user = response.data.user;
        }
    }
}
</script>

<style>

</style>