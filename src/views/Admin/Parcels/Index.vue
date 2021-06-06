<template>
  <Container class="space-y-4 relative">
    <div class="inline-flex items-center w-full">
      <div class="block text-2xl font-bold text-gray-700">
        <Truncify>{{ title }}</Truncify>
      </div>
      <slot name="after-title"></slot>
    </div>

    <ParcelList :list="list"></ParcelList>

    <TableAction
      :worker="list"
      :show="showAction"
      :deletable="deleteAction"
      @delete="parcels.deleteParcels(items.filter((item) => item.checked))"
      :label="labelAction"
      :hasMore="hasMoreAction"
    >
      <!-- @delete="deleteMany" @print="printMany" @edit="editMany" -->
      <template v-slot:menu>
        <MenuLinkItem>Open Parcel</MenuLinkItem>
        <MenuLinkItem>Quick Update Parcel</MenuLinkItem>
        <MenuLinkItem>Update Tracking</MenuLinkItem>
        <MenuLinkItem>Invoice</MenuLinkItem>
        <MenuLinkItem>Update Recipient</MenuLinkItem>
      </template>
      <template v-slot:more>
        <Btn dark rounded large color="gray-700">
          <i-mdi-archive-outline />
          <span>Archive</span>
        </Btn>
      </template>
    </TableAction>
    <Pager :data="pager" simple />
    <LabelViewer ref="labelRef"></LabelViewer>
    <UserList ref="userls" title="Select Client"></UserList>

    <EditTracking :parcels-hook="list" ref="trackingEditor"></EditTracking>
    <ParcelFormPrompt :ls-hook="list" ref="parcelForm"></ParcelFormPrompt>
  </Container>
</template>

<script lang="ts">
import { ref, reactive, toRefs, onMounted, computed, watch } from "vue";
import parcels from "@/use/parcels";
import router from "@/router";
import RecipientColumn from "@/views/Admin/Parcels/RecipientColumn.vue";
import ParcelColumn from "@/views/Admin/Parcels/ParcelColumn.vue";
import { TableStructure } from "@/@types/Interface";
import PagerInterface from "@/@types/PagerInterface";
import useList from "@/use/useList";
import UserList from "@/views/Admin/Components/UserList.vue";
import useParcelListActions from "@/views/Admin/Parcels/use-parcel-list-actions";
import LabelViewer from "@/views/Admin/Components/Label/LabelViewer.vue";
import EditTracking from "@/views/Guests/Track/EditTracking.vue";
import ParcelFormPrompt from "@/views/Admin/Parcel/ParcelFormPrompt.vue";
import ParcelList from "@/views/Admin/Parcels/ParcelList.vue";
export default {
  components: {
    ParcelList,
    EditTracking,
    RecipientColumn,
    ParcelFormPrompt,
    UserList,
    ParcelColumn,
    LabelViewer,
  },
  props: {
    deleteAction: Boolean,
    labelAction: Boolean,
    showAction: Boolean,
    hasMoreAction: Boolean,
    query: Object,
    title: { default: "Parcels" },
  },
  setup(props, ctx) {
    onMounted(() => {});
    const list = useList();
    const userls = ref();
    const parcelForm = ref();
    const labelRef = ref();
    const trackingEditor = ref();

    const data = reactive<{
      items: any[];
      pager: PagerInterface;
    }>({
      items: [],
      pager: {},
    });
    watch(
      () => router.currentRoute.value.query,
      (r) => {
        // tableHook.refreshable(query, getQuery.value, ["pid"]) && initialize();
      }
    );

    return {
      trackingEditor,
      userls,
      list,
      labelRef,
      parcelForm,
      ...toRefs(data),
      parcels,
      openModal: ref(true),
      updateRecipient: async (item, user) => {
        // await parcels.updateParcelRecipient(item.track_code, user, tableWorker);
      },
    };
  },
};
</script>

<style scoped></style>
