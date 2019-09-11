<template>
  <div>
    <p>ServerStatus: {{status}}</p>
    <button @click="changeStatus">Server Status</button>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        status: "cretical"
      }
    },
    methods: {
      changeStatus: function() {
        this.status = "normal"
      }
    },
  }
</script>
