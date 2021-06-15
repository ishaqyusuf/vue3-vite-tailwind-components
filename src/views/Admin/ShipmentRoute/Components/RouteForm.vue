<template>
  <div class="space-y-6">
    <Input
      label="Route Title"
      :grid="grid"
      v-model="form.title"
      :dense="dense"
    />
    <Input
      label="Route Prefix"
      :grid="grid"
      :dense="dense"
      v-model="form.prefix"
    />
    <Input
      label="Start Index"
      :grid="grid"
      :dense="dense"
      type="number"
      v-model="form.start_index"
    />
    <Input
      label="Next Index"
      type="number"
      :grid="grid"
      :dense="dense"
      v-model="form.next_index"
    />
  </div>
</template>
<script lang="ts">
import useShipmentRoutesApi from "@/use/api/use-shipment-routes-api";
import { ref } from "vue";
import { ApiReqOptions, ShipmentMeta, ShipmentRoute } from "@/@types/Interface";
import alert from "@/hooks/alert";
export default {
  props: {
    grid: Boolean,
    dense: Boolean,
  },
  components: {},
  setup(props, { emit }) {
    const form = ref<ShipmentRoute>({});
    const meta = ref<ShipmentMeta>({});

    const resolver = ref();
    const rejecter = ref();

    const edit = async (slug: any, list = null) => {
      if (slug) {
        const data = await useShipmentRoutesApi.get(slug);
      }
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        rejecter.value = reject;
        show.value = true;
      });
    };
    const save = async () => {
      const formData = {
        data: form.value,
        meta: meta.value,
      };
      if (!formData.data.start_index) {
        alert.error("Set a valid route index");
        return;
      }
      if (!formData.data.next_index)
        formData.data.next_index = formData.data.start_index;
      const id = form.value.slug;
      const opts: ApiReqOptions = {
        success: id ? "Route updated" : "Route Created",
        showError: true,
        error: "Something went wrong.",
      };
      const data = await (id
        ? useShipmentRoutesApi.update(id, formData, opts)
        : useShipmentRoutesApi.create(formData, opts));
      resolver.value(data);
      show.value = false;
    };
    const show = ref(false);
    const closeEditor = () => {
      resolver.value(null);
      show.value = false;
    };
    return {
      form,
      show,
      meta,
      closeEditor,
      edit,
      save,
    };
  },
};
</script>

<style scoped></style>
