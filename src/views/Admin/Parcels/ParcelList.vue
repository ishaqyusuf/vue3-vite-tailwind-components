<template>
  <Container
    class="space-y-4 relative"
    :class="{
      'mb-12': list.data.checkedIds.length > 0,
    }"
  >
    <slot name="header"></slot>
    <Pager :data="pager" />
    <Table
      checkable
      floating-action
      action
      hide-actions
      dense
      deletable
      :use-list="list"
      :structure="structure"
      stickyAction
      hide-checks
      more-action
    >
      <template v-slot:id_date="{ item }">
        <span class="block font-semibold">#{{ item.id }}</span>
        <span class="block">{{ $dayjs.readable(item.created_at) }}</span>
      </template>
      <template v-slot:track_code="{ item, header }">
        <ParcelColumn :item="item" :header="header" />
      </template>
      <template v-slot:recipient="{ item }">
        <ClientColumn :item="item" :list="list" />
      </template>
      <template v-slot:more-actions="{ item, header }">
        <Btn dense large icon @click="list.execute('openLabel', item)">
          <i-mdi-label-outline />
        </Btn>
      </template>
      <template v-slot:invoice="{ item }">
        <ColorLabel v-if="item.invoice" :color="item.invoice_color">{{
          item.invoice.status
        }}</ColorLabel>
        <span v-else>-</span>
      </template>
      <template v-slot:status="{ item }">
        <Menu class="" rtl ref="menu">
          <slot name="menu-btn" :item="item">
            <ColorLabel :color="item.status_color">{{
              item.status
            }}</ColorLabel>
          </slot>
          <template #items>
            <MenuItem
              v-for="(_item, index) in parcelStatus"
              @click="updateStatus(item, _item.status)"
              :key="index"
            >
              {{ _item.status }}
            </MenuItem>
          </template>
        </Menu>
      </template>
      <template v-slot:menu-items="{ item }">
        <MenuLinkItem :to="item.to">
          <i-mdi-open-in-app class="mr-3" />
          Open Parcel</MenuLinkItem
        >
        <MenuItem @click="list.execute('openParcelForm', item)">
          <i-mdi-package-variant class="mr-3" />
          Update Parcel</MenuItem
        >
        <MenuItem @click="list.execute('updateTracking', item)">
          <i-mdi-map-marker-plus-outline class="mr-3" />
          Update Tracking</MenuItem
        >
        <MenuLinkItem to="{}">
          <i-mdi-receipt class="mr-3" />
          Invoice</MenuLinkItem
        >
        <MenuItem @click="list.execute('openLabel', item)">
          <i-mdi-label-variant-outline class="mr-3" />
          Label</MenuItem
        >
        <MenuItem @click="list.execute('selectClient', item)">
          <i-mdi-account-plus-outline class="mr-3" />
          Update Recipient</MenuItem
        >
      </template>
    </Table>

    <TableAction
      :use-list="list"
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
        <slot name="custom-actions">
          <Btn dark rounded large color="black">
            <i-mdi-archive-outline />
            <span>Archive</span>
          </Btn>
        </slot>
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
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  computed,
  watch,
  onBeforeUnmount,
} from "vue";
import parcels from "@/use/parcels";
import ClientColumn from "@/views/Admin/Parcels/ClientColumn.vue";
import ParcelColumn from "@/views/Admin/Parcels/ParcelColumn.vue";
import { TableStructure } from "@/@types/Interface";
import PagerInterface from "@/@types/PagerInterface";
import UserList from "@/views/Admin/Components/UserList.vue";
import useParcelListActions from "@/views/Admin/Parcels/use-parcel-list-actions";
import LabelViewer from "@/views/Admin/Components/Label/LabelViewer.vue";
import EditTracking from "@/views/Guests/TrackResult/EditTracking.vue";
import ParcelFormPrompt from "@/views/Admin/Parcel/ParcelFormPrompt.vue";
import useRouteData from "@/use/use-route-data";
import { useRoute } from "vue-router";
import useMetaLoader from "@/use/api/use-meta-loader";
import useList from "@/use/useList";
export default {
  components: {
    EditTracking,
    ClientColumn,
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
    list: Object,
  },
  setup(props, ctx) {
    onMounted(async () => {
      initialize(useRoute().query);
      // window.addEventListener('scroll',scrollListener);
    });
    const unmounted = ref(false);
    onBeforeUnmount(() => {
      unmounted.value = true;
    });

    const list = props.list ?? useList();
    const userls = ref();
    const parcelForm = ref();
    const labelRef = ref();
    const trackingEditor = ref();
    list.initialize(
      [],
      parcels.transform,
      useParcelListActions({
        userls,
        parcels,
        list,
        labelRef,
        trackingEditor,
        parcelForm,
      })
    );

    const data = reactive<{
      items: any[];
      pager: PagerInterface;
    }>({
      items: [],
      pager: {},
    });
    watch(useRouteData, (value, oldValue) => {
      setTimeout(() => {
        if (unmounted.value) return;
        const { params, query } = value;
        initialize(query);
      }, 200);
    });
    const initialize = async (sq = {}, clearState = false) => {
      await useMetaLoader.loadParcelStatus();
      await useMetaLoader.loadInvoiceStatus();
      const q = Object.assign({}, props.query ?? {}, sq);
      const _data = await parcels.fetchMany(q);
      list.refresh(_data.items, clearState);
      data.pager = _data.pager;
      window.scroll(0, 0);
    };
    const structure: TableStructure[] = [
      { name: "id_date", title: "#/Date" },
      {
        name: "track_code",
        title: "Parcel",
      },
      {
        name: "recipient",
        title: "Recipient",
      },
      {
        name: "invoice",
        title: "Invoice Status",
      },
      {
        name: "status",
        title: "Status",
      },
    ];
    const saveParcel = (item) => {
      list.updateItem(item.id, item, false);
    };
    return {
      saveParcel,
      trackingEditor,
      userls,
      labelRef,
      parcelForm,
      ...toRefs(data),
      isLoading: computed(() => parcels.loading.value),
      structure,
      parcels,
      openModal: ref(true),
      list,
      updateStatus: async (item, status) => {
        await parcels.updateParcel({ status }, item.track_code, list);
      },
      updateRecipient: async (item, user) => {
        await parcels.updateParcelRecipient(item.track_code, user, list);
      },
      ...useMetaLoader,
    };
  },
};
</script>

<style scoped></style>
