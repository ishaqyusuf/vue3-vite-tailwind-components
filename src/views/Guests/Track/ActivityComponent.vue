<template>
  <Loader v-if="ls.loading.value"></Loader>
  <template v-else>
    <div class="inline-flex w-full justify-end">
      <Btn @click="edit({})"> <i-mdi-plus /> <span>Progress</span></Btn>
    </div>
    <div class="divide-y">
      <div v-for="(id, index) in ids" :key="index">
        <slot name="item" :index="id" :ls="ls">
          <TrackingStatusItem
            :editable="isEditable"
            :hook="ls"
            @edit="edit"
            :index="id"
          ></TrackingStatusItem>
        </slot>
      </div>
    </div>
    <EmptyContainer v-if="ls.ids.value.length == 0">
      <i-mdi-electric-switch class="text-7xl" />
      <!-- <span>Activity is empty</span> -->
    </EmptyContainer>
  </template>
  <EditTracking :trackings-hook="ls" ref="editor"></EditTracking>
</template>

<script lang="ts">
import useList from "@/use/useList";
import TrackingStatusItem from "@/views/Guests/Track/TrackingStatusItem.vue";
import EditTracking from "@/views/Guests/Track/EditTracking.vue";
import { computed, ref } from "vue";
export default {
  props: {
    showEdit: Boolean,
  },
  components: {
    EditTracking,
    TrackingStatusItem,
  },
  setup(props, { emit }) {
    const ls = useList();

    const editor = ref();
    const permission = ref();
    const patcher = ref({});
    const init = async (slug, api, _permission) => {
      ls.initialize([]);
      const data = await api(slug, { tracking: true });
      patcher.value = data.parent;
      ls.refresh(data.items);
      permission.value = _permission;
    };
    return {
      editor,
      edit: (item) => {
        editor.value.init(item, patcher.value);
      },
      isEditable: computed(() => permission.value),
      init,
      ls,
      ids: computed(() => ls.data.ids),
      // ...ls
    };
  },
};
</script>

<style scoped></style>
