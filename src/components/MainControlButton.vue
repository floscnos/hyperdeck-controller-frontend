<script setup>

const props = defineProps(['active', 'tooltip', 'icon'])

</script>

<template>
  <div class="relative group">
    <fa-icon
        :icon="icon"
        size="2x"
        :class="(active ? 'text-orange-400' : 'text-white') + ' cursor-pointer'"
        />

    <span class="absolute -left-1 -top-8 bg-[#555] text-white py-1 px-2 rounded shadow-2xl hidden group-hover:inline-block whitespace-nowrap">
        {{ tooltip }}
        </span>
  </div>
</template>

<style scoped>

</style>