<template>
  <div class="list-none my-8">
    <div class="flex mt-2">
      <div 
        class="w-10 h-10 bg-cover bg-center rounded-full border border-black mr-2"
        :style=" 'background-image: url(' + user.photoURL + ')' "
      ></div>
      <div>
        <p>{{ user.displayName }}</p>
        <p class="text-xs">{{ comment.createdAt }}</p>
        <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { db } from '@/main'
export default {
  props: ['comment'],
  data() {
    return {
      user: {},
    }
  },

  firestore() {
    return {
      user: db.collection('users').doc(this.$props.comment.uid)
    }
  },

}
</script>