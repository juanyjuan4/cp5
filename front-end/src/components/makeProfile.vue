<template>
<div>
<form class="login" @submit.prevent="login">
    <h1>Login</h1>
    <input v-model="usernameLogin" placeholder="username">
    <input type="password" v-model="passwordLogin" placeholder="password">
    <button type="submit">Login</button>
</form>

<form @submit.prevent="addProfile" class="form">
    <h1>Or Create Account</h1>
    <div class="identity">
        <div class="name">
            <p>Name</p>
            <input v-model="name" placeholder="Name">
        </div>
        <div class="username">
            <p>Username</p>
            <input v-model="username" placeholder="Username">
        </div>
    </div>
    <p>Choose an Avatar</p>
    <div class="picture">
        <div v-for="picture in this.pictures" :key="picture">
            <img :src="picture" :class="{selected: img == picture}" @click="img = picture">
        </div>
    </div>
    <div>
        <p>Bio</p>
        <textarea v-model="bio" placeholder="Bio"></textarea>
    </div>
    <div>
        <p>Choose a Password</p>
        <input type="password" v-model="password" placeholder="Password">
    </div>
    <div v-if="this.errors.length" class="errors">
        <p>Error:</p>
        <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
    </div>
    <button type="submit">Create</button>
</form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'make',
    data() {
        return {
            errors: [],
            name: '',
            username: '',
            password: '',
            img: '',
            bio: '',
            usernameLogin: '',
            passwordLogin: ''
        }
    },
    computed: {
        pictures() {
            return this.$root.$data.pictures;
        },
    },
    methods: {
        async addProfile() {
            let check = true;
            this.errors = [];

            if (!this.name) {
                this.errors.push('Name required');
                check = false;
            }

            if (!this.username) {
                this.errors.push('Username required');
                check = false;
            }

            if (!this.img) {
                this.errors.push('Avatar required');
                check = false;
            }

            if (!this.bio) {
                this.errors.push('Bio required');
                check = false;
            }

            if (!this.password) {
                this.errors.push('Password required');
                check = false;
            }

            if (check) {
                let response = await axios.post("/api/users", {
                    name: this.name,
                    username: this.username,
                    avatar: this.img,
                    bio: this.bio,
                    password: this.password
                });
                this.$root.$data.user = response.data.user;
                this.name = '';
                this.username = '';
                this.img = '';
                this.bio = '';
                this.password = '';
            }
        },
        getSelectedImg() {
            return this.img;
        },
        // async getProfiles() {
        //     let response = await axios.get("/api/profiles");
        //     this.profiles = response.data;
        //     return true;
        // }
        async login() {
            if (!this.usernameLogin || !this.passwordLogin)
                return;
            try {
                let response = await axios.post('/api/users/login', {
                    username: this.usernameLogin,
                    password: this.passwordLogin,
                });
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.errorLogin = "Error: " + error.response.data.message;
                this.$root.$data.user = null;
            }
        }
    }
}
</script>

<style>
.selected {
    border: 5px solid red;
    border-radius: 10px;
}

li {
    color: red;
    list-style-type: none;
    margin-right: 40px;
}

.errors p {
    color: red;
}

img {
    max-width: 80px;
    max-height: 80px;
}

.picture {
    margin: auto;
    max-width: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

textarea {
    width: calc(100vw - 20px);
    height: 50px;
    resize: none;
}

.identity div {
    margin: 30px;
}



@media only screen and (min-width: 401px) and (max-width: 960px) {
    .identity {
        display: flex;
        justify-content: center;
    }

    textarea {
        width: 380px;
        height: 100px;
    }
}

@media only screen and (min-width: 961px) {
    .identity {
        display: flex;
        justify-content: center;
    }

    .identity div {
        margin: 30px 90px;
    }

    img {
        max-width: 120px;
        max-height: 120px;
    }

    .picture {
        max-width: 600px;
    }

    textarea {
        width: 500px;
    }
}
</style>