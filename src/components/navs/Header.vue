<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex justify-between py-2 items-center">
      <i-mdi-facebook class="text-xl" />
      <div class="space-x-4">
        <Link :to="{}">Home</Link>
        <Link :to="{ name: 'components' }">Components</Link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style></style>
