<template>
  <div>
    <slot name="btn" :open="open"></slot>
    <Prompt
      v-model="show"
      @closed="show = false"
      ok="Save"
      :ok-action="dialog?.save"
      :title="title"
    >
      <template #info>
        <div class="p-4 max-h-96 overflow-auto">
          <RouteForm dense ref="dialog"></RouteForm>
        </div>
      </template>
    </Prompt>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import RouteForm from "./RouteForm.vue";
export default {
  components: {
    RouteForm,
  },
  props: {},
  setup(props, { emit }) {
    const title = ref("");
    const dialog = ref();
    const show = ref(false);

    const resolver = ref();
    const rejecter = ref();

    const open = async (slug, list: any = null) => {
      title.value = slug ? "Edit Route" : "Create Route";
      setTimeout(() => {
        dialog.value.edit(slug, list).then((result) => {
          resolver.value(result);
        });
      }, 500);
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        rejecter.value = reject;
        show.value = true;
      });
    };
    return {
      show,
      open,
      dialog,
      title,
    };
  },
};
</script>

<style scoped></style>
