<template>
 <div id="app">

    <Sidebar class="w-64"/>

    <main class="ml-64">
      <router-view/>
    </main>
 </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {

 components: {
   Sidebar
 }
}
</script>

<style lang="stylus">
main
  width:50%
</style>