<template>
<div class="postpage">
  <form class="postForm" @submit.prevent="makePost">
    <textarea v-model="content" placeholder="What are you thinking about?"></textarea>
    <div class="postbutton">
      <button type="submit">Post</button>
    </div>
  </form>
  <div class="post" v-for="post in posts" v-bind:key="post._id">
    <div class="fullpost">    
      <div class="profile">
        <div class="identity">
          <h3 class="name">{{post.user.name}}</h3>
          <p class="username">@{{post.user.username}}</p>
        </div>
        <img :src="post.user.avatar">
        <p class="bio">{{post.user.bio}}</p>
      </div>

      <div class="poststuff">
        <p class="content">{{post.content}}</p>
        <p class="date">{{formatDate(post.created)}}</p>
        <div class="likes">
          <p v-if="post.likes.length == 1">{{post.likes.length}} like</p>
          <p v-else>{{post.likes.length}} likes</p>
        </div>
        <div class="buttons">
          <div class="likebutton">
            <button v-if="checkLike(post)" type="button" @click.prevent="likePost(post._id)">Unlike</button>
            <button v-else type="button" @click.prevent="likePost(post._id)">Like</button>
          </div>
          <button v-if="post.user._id == user._id" type="button" class="delete" @click="deletePost(post._id)">Delete</button>
        </div>
      </div>
    </div>
    <hr/>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      error: '',
      content: '',
    }
  },
  created() {
    this.getPosts();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async getPosts() {
      try {
        this.response = await axios.get("/api/posts");
        this.posts = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async likePost(postId) {
      await axios.put("/api/posts/" + postId, {
        _id: this.user._id,
      });
      this.getPosts();
    },
    async makePost() {
      try {
        await axios.post('/api/posts', {
          content: this.content,
          user: this.user,
        });
        this.content = '';
        this.getPosts();
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    checkLike(thePost) {
      let check = false;
      for (let i = 0; i < thePost.likes.length; i++) {
        if (thePost.likes[i] == this.user._id) {
          check = true;
        }
      }
      return check;
    },
    async deletePost(postId) {
      await axios.delete("/api/posts/" + postId);
      this.getPosts();
    }
  }
}
</script>

<style scoped>
.fullpost {
  display: flex;
  justify-content: center;
}

.poststuff {
  width: 50%;
}

.buttons {
  display: flex;
  justify-content: space-around;
}

.date {
  font-size: 80%;
  font-style: italic;
}

.profile {
  width: 45%;
}

.identity {
  display: flex;
  flex-direction: column;
  font-size: 80%;
}

.username {
  padding-top: 4px;
}

.postForm {
  padding-top: 20px;
}

.postbutton {
  text-align: right;
  padding-right: 7px;
}

@media only screen and (min-width: 401px) and (max-width: 960px) {
  .postbutton {
    text-align: center;
    padding-right: 0;
  }
}

@media only screen and (min-width: 961px) {
  .postbutton {
    text-align: center;
    padding-right: 0;
  }

  .profile {
    width: 30%;
  }

  .identity {
    flex-direction: row;
  }

  .username {
    padding-left: 10px;
  }

  .buttons {
    justify-content: left;
  }

  .likebutton {
    padding-right: 10px;
  }

  .poststuff {
    text-align: left;
  }

  .postpage {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>