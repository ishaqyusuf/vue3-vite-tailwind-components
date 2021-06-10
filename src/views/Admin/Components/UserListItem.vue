<template>
  <ClientCard
    @click="select"
    class="cursor-pointer hover:bg-gray-100"
    :client="client"
  ></ClientCard>
</template>

<script lang="ts">
import { computed, PropType, ref } from "vue";
import ClientCard from "@/views/Admin/Components/ClientCard.vue";
export default {
  components: {
    ClientCard,
  },
  props: {
    lsHook: { type: Object, required: true },
    dataId: { required: true, type: Number },
  },
  setup(props, { emit }) {
    const client = computed(() => props.lsHook.itemsById.value[props.dataId]);
    return {
      client,
      select: () => {
        emit("selected", props.dataId, client.value);
      },
    };
  },
};
</script>

<style scoped></style>
