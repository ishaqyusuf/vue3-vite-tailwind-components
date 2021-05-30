<template>
  <Prompt v-model="show" pilot>
    <template #container>
      <div class="max-w-md mx-auto bg-red-400">
        <div id="shipping-label" class="flex" v-if="!loading && !dataUrl">
          <LabelTemplateOne
            :data="label.data"
            ref="labelTemplate"
          ></LabelTemplateOne>
          <img class="mx-4" :src="dataUrl" v-if="dataUrl" />
        </div>
      </div>

      <Btn>d</Btn>
    </template>
  </Prompt>
</template>

<script lang="ts">
import parcel from "@/use/parcels/parcel";
import { ref } from "vue";
import { useLabelComposer } from "@/use/use-label-composer";
import domtoimage from "dom-to-image";
import useTime from "@/hooks/time";
import LabelTemplateOne from "@/views/Admin/Components/Label/LabelTemplateOne.vue";
import alert from "@/hooks/alert";
export default {
  props: {},
  components: { LabelTemplateOne },
  setup(props, { emit }) {
    const show = ref(false);
    const item = ref();
    const label = ref();
    const labelTemplate = ref();
    const dataUrl = ref();
    const loading = ref(true);
    const open = async (_item) => {
      item.value = _item;

      show.value = true;
      loading.value = true;
      label.value = await useLabelComposer(_item.track_code);
      if (label.value) {
        loading.value = false;
        await useTime.delay(500);
        // let blob = await domtoimage.toBlob(labelTemplate.value);
        // dataUrl.value = window.URL.createObjectURL(blob);
        return;
      }
      show.value = false;
      alert.error("Unable to load Parcel Label");
    };
    return {
      show,
      labelTemplate,

      loading,
      dataUrl,
      label,
      item,
      open,
    };
  },
};
</script>

<style lang="scss" scoped>
@page {
  size: 6in 4in;
  margin-top: 0.25in;
  margin-left: 0.25in;
  margin-bottom: 0.25in;
  margin-right: 0.25in;
}

#shipping-label {
  width: 4in;
  height: 6in;
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  span {
    line-height: 1;
    padding: 1px 0px;
  }
}
#print-section2 {
  // font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  // font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  // Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  // width: 101.6mm;
  // height: 152.4mm;
  height: 6in;
  width: 4in;
  margin: 0;
}
</style>
