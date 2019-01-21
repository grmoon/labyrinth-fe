<template>
  <div>
    <router-link :to="{ name: 'configuration' }">
      Configuration
    </router-link>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  mounted() {
  }
}
</script>