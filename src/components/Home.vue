<template>
  <div>
    <server-status v-for="server in 5"></server-status>
  </div>
</template>

<script>
  import server_status from './ServerStatus.vue';
  export default {
    components: {
      "server-status": server_status
    }
  }
</script>
