<template>
  <div>
    <h2 class="text-center text-3xl">{{ post.title }}</h2>
    <div class="flex justify-center">
      <li 
        v-for="(tag,idx) in post.tags"
        :key="idx"
        class="list-none m-1 border border-black p-1 px-3 rounded-full text-xs"
      >
        {{ tag }}
      </li>
    </div>
    <div 
      v-if="post.image"
      class="w-full h-64 bg-cover bg-center my-8"
      :style=" 'background-image: url(' + post.image + ')' "
    ></div>
    <div class="flex mb-8">
      <div 
        class="w-10 h-10 rounded-full bg-cover bg-center mr-2 border border-black"
        :style=" 'background-image: url(' + user.photoURL + ')' "
      ></div>


      <div>
        <p>{{ user.displayName }}</p>
        <p class="text-xs">{{ post.createdAt }}</p>
      </div>

      <div 
        v-if="currentUser && currentUser.uid === user.id"
        class="ml-5"
      >
        <router-link :to=" '/update/' + post.id ">
          <button class="mx-2 mt-2 focus:outline-none">edit</button>
        </router-link> 

        <button 
          @click="remove"
          class="mx-2 mt-2 focus:outline-none"
        >delete</button>

      </div>
    </div>
    <div
      class="text-sm leading-loose content"
      v-html="post.content"
    ></div>

    <h3 class="text-center text-3xl">コメント</h3>

    <Comment v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />


    <div 
        v-if="currentUser"
      >
      <h3 class="text-center text-3xl">コメント投稿</h3>
      
      <textarea 
        class="block w-full border border-black my-5 p-2 focus:outline-none"
        cols="30" 
        rows="10"
        placeholder="Comment"
        v-model="content"
      ></textarea>

      <button 
        class="focus:outline-none"
        @click="publish"
      >
        Submit
      </button>
    </div>



    
  </div>
</template>

<script>
import { auth } from '@/main'
import { db } from '@/main'
import Comment from '@/components/Comment' 
export default {

  components: {
    Comment
  },

  data() {
    return {
      post: {},
      user: {},
      comments: {},
      currentUser: {}
    }
  },
  created() {
    auth.onAuthStateChanged(user => { 
      this.currentUser = user
    })
  },
  firestore() {
    return {
      post: db.collection('posts').doc(this.$route.params.id),
      user: db.collection('users').doc(this.$route.params.uid),
      comments: db.collection('posts').doc(this.$route.params.id).collection('comments').orderBy("createdAt","desc")
      
    }
  },
  
  methods: {
    remove() {
      if (window.confirm('Are you sure to delete is post?')) {
        db.collection('posts').doc(this.$route.params.id).delete()
        .then(
          this.$router.push('/'),
          alert('The post was deleted.')
        )
      }
    },

    publish() {
      var now = new Date();
      var year = now.getFullYear();
      var mon = now.getMonth()+1; //１を足すこと
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var sec = now.getSeconds();
      var date = year + "年" + mon + "月" + day + "日" + hour + "時" + min + "分" + sec + "秒"; 

      db.collection('posts').doc(this.$route.params.id).collection('comments').add({
        content: this.content,
        createdAt: date,
        uid: this.currentUser.uid
      })
      .then((post) =>
        this.$router.push('/post/' + this.post.uid + '/' + this.post.id),
        alert('The post got published!')
      )
    }

  }

}
</script>