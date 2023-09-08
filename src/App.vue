<script>
    import { RouterView } from 'vue-router';
    import { Navbar } from '@/components'

  export default{
    mounted() {
      this.$store.dispatch('getUser')

    },
    components: {
      Navbar
    },
  }
</script>
    
<template>
  <Navbar />

  <RouterView />
</template>
    
<style scoped>
    
</style>