<template>
 <div id="app">

   <Header />

   <main class="my-20 mx-auto">
     <router-view/>
   </main>

   <Footer />
 </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {

 components: {
   Header,
   Footer
 }
}
</script>

<style lang="stylus">

main
  width: 95%
</style>