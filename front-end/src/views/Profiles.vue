<template>
<div class="profile">
    <div v-if="user">
        <h1>{{user.name}}'s Profile</h1>
        <p>Name: {{user.name}}</p>
        <p>Username: {{user.username}}</p>
        <img :src="user.avatar">
        <p>Bio:</p>
        <textarea v-model="user.bio"></textarea>
        <div></div>
        <button type="submit" @click.prevent="editBio">Edit</button>
    </div>

    <div v-else class="loginpage">
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
        async editBio() {
            await axios.put("/api/users/" + this.user._id, {
                bio: this.user.bio,
            });
        }
    }
}
</script>

<style>
.profile {
    text-align: left;
    padding-left: 10px;
}

h1 {
    text-align: center;
}

.loginpage {
    text-align: center;
    padding-top: 60px;
}

@media only screen and (min-width: 401px) and (max-width: 960px) {
    .profile {
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
    }
}

@media only screen and (min-width: 961px) {
    .profile {
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>