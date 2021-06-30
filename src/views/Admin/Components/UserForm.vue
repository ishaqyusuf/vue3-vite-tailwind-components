<template>
  <Prompt
    v-model="show"
    @closed="dataCreated(null, null)"
    cancelable
    hide-cancel
    :ok="okText"
    :ok-action="okAction"
    :title="title"
  >
    <template #info>
      <div class="p-4 max-h-96 overflow-auto">
        <div class="space-y-3 flex flex-col px-4">
          <template v-if="!addressMode">
            <template v-if="!simpleUpdates">
              <Input
                v-model="form.first_name"
                name="first_name"
                label="First Name"
              ></Input>
              <Input
                v-model="form.last_name"
                name="last_name"
                label="Last Name"
              ></Input>
              <Input v-model="form.email" name="email" label="Email"></Input>
            </template>
            <template v-if="addRole">
              <Input
                v-model="form.role_id"
                select
                :items="useHrm.roles.value"
                item-text="title"
                item-value="id"
                name="role"
                label="Role"
              ></Input>
              <Input
                v-model="meta.office_id"
                select
                :items="useHrm.addresses.value"
                item-text="address_1"
                item-value="id"
                name="role"
                label="Location"
              ></Input>
            </template>
            <Checkbox
              v-model="setPassword"
              v-if="!simpleUpdates"
              label="Create Password"
            ></Checkbox>
            <Input
              v-if="setPassword || passwordUpdate"
              v-model="form.password"
              name="password"
              password
              label="Password"
            ></Input>
            <Checkbox
              v-model="extraData"
              v-if="!simpleUpdates && !noAddress"
              label="Additional Info"
            ></Checkbox>
          </template>
          <template v-if="!simpleUpdates">
            <AddressForm
              user-form
              class="space-y-3"
              v-model="address"
              v-if="extraData || addressMode"
            ></AddressForm>
          </template>
        </div>
      </div>
    </template>
  </Prompt>
</template>

<script lang="ts">
import { ref, onMounted, computed, popScopeId } from "vue";
import { Recipient, User } from "@/@types/Interface";
import AddressForm from "@/views/Admin/Components/AddressForm.vue";
import useUser from "@/use/api/useUser";
import user from "@/use/user-account";
import useHrm from "@/use/api/useHrm";
import useSmartApi, { useAddressApi, useUsersApi } from "@/use/api/use-api";
import alert from "@/hooks/alert";
export default {
  components: {
    AddressForm,
  },
  props: {
    title: { default: "" },
    query: Object,
    canGoBack: Boolean,
    withRole: Boolean,
    employeeData: Boolean,
    passwordUpdate: Boolean,
    addressMode: Boolean,
    noAddress: Boolean,
  },
  setup(props, { emit }) {
    const show = ref(false);
    const resolver = ref();
    const form = ref<User>({});
    const meta = ref<any>({});
    const address = ref<Recipient>({
      phone: {},
    });
    const open = async (data) => {
      return new Promise(async (resolve, reject) => {
        resolver.value = resolve;
        if (addRole.value) {
          useHrm.loadRoles();
          useHrm.loadAddress();
        }
        if (props.addressMode) {
          okText.value = "Save";
          if (data) {
            if (!data.phone) data.phone = {};
            address.value = data;
          }
        } else {
          if (data) {
            const {
              form: frm,
              meta: _meta,
              address: _address,
            } = await useUsersApi().get(data.id, { edit_mode: true });
            form.value = frm;
            _meta && (meta.value = _meta);
            if (_address) {
              const { phone } = _address;
              !phone?.no && !phone?.code && (_address.phone = { no: phone });
              address.value = _address;
            }
          }
        }
        show.value = true;
      });
    };

    onMounted(() => {});
    const setPassword = ref(false);
    const extraData = ref(false);
    const dataCreated = (id, data) => {
      form.value = {};
      address.value = { phone: {} };
      meta.value = {};
      resolver.value(data);
      show.value = false;
    };
    const okText = ref("Create");
    const createUser = async () => {
      // return new Promise(async (resolve, reject) => {
      if ((setPassword.value || props.passwordUpdate) && !form.value.password) {
        alert.error("Invalid Password");
        return;
      }
      if (
        (props.employeeData || props.with_role) &&
        (!form.value.role_id || form.value.role_id <= 0)
      ) {
        alert.error("Role is required");
        return;
      }
      let address_id = address.value.id;
      var addressUpdated = false;
      if (extraData.value || props.addressMode || props.noAddress) {
        addressUpdated = true;
        const _address = await useAddressApi.save(address_id, {
          data: address.value,
        });
        address_id = _address.id;
        if (props.addressMode) {
          dataCreated(address_id, _address);
          return;
        }
      }
      const userApi = useUsersApi({});
      const formData = {
        ...form.value,
        ...(addressUpdated ? { address_id } : {}),
      };

      const _user = await userApi.save(
        form.value.id,
        {
          data: formData,
          meta: meta.value,
        },
        {
          onSuccess: (result) => {
            alert.success("User created");
          },
        }
      );
      dataCreated(_user.id, _user);
    };

    const okAction = ref<any>(createUser);
    const addRole = computed(() => props.withRole && user.can("createAgent"));
    return {
      address,
      okText,
      okAction,
      setPassword,
      extraData,
      form,
      show,
      meta,
      open,
      addRole,
      useHrm,
      simpleUpdates: computed(() => props.employeeData || props.passwordUpdate),
      createUser,
      dataCreated,
    };
  },
};
</script>

<style scoped></style>
