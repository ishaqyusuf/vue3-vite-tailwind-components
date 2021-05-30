<template>
  <Container>
    <!-- <Menu no-width>
      <Input readonly v-model="date">
        <template #prependInner>
          <i-mdi-calendar-outline />
        </template>
      </Input>
      <template #items>
        <DatePicker v-model="date" />
      </template>
    </Menu> -->
    <!-- <DateInput v-model="date"></DateInput> -->

    <DatePicker v-model="date" />
  </Container>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
export default {
  props: {},
  components: {},
  setup(props, { emit }) {
    const form = reactive({
      date: "",
    });
    return {
      ...form,
    };
  },
};
</script>

<style scoped></style>
