<template>
  <Prompt
    v-model="show"
    @closed="userCreated(null, null)"
    cancelable
    hide-cancel
    ok="Create"
    :ok-action="createUser"
    :title="title"
  >
    <template #info>
      <div class="p-4 max-h-96 overflow-auto">
        <div class="space-y-3 flex flex-col px-4">
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
          <template v-if="!addRole">
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
              v-model="address.office_id"
              select
              :items="useHrm.addresses.value"
              item-text="address_1"
              item-value="id"
              name="role"
              label="Role"
            ></Input>
          </template>
          <Checkbox v-model="setPassword" label="Create Password"></Checkbox>
          <Input
            v-if="setPassword"
            v-model="form.password"
            name="password"
            password
            label="Password"
          ></Input>
          <Checkbox v-model="extraData" label="Additional Info"></Checkbox>
          <AddressForm
            user-form
            class="space-y-3"
            v-model="address"
            v-if="extraData"
          ></AddressForm>
        </div>
      </div>
    </template>
  </Prompt>
</template>

<script lang="ts">
import { ref, onMounted, reactive, watch, computed } from "vue";
import { Recipient, User } from "@/@types/Interface";
import AddressForm from "@/views/Admin/Components/AddressForm.vue";
import useUser from "@/use/api/useUser";
import user from "@/use/user-account";
import useHrm from "@/use/api/useHrm";
export default {
  components: {
    AddressForm,
  },
  props: {
    title: { default: "" },
    query: Object,
    canGoBack: Boolean,
    withRole: Boolean,
  },
  setup(props, { emit }) {
    const show = ref(false);
    const resolver = ref();
    const form = reactive<User>({});
    const address = reactive<Recipient>({
      phone: {},
    });
    const open = async () => {
      return new Promise((resolve, reject) => {
        resolver.value = resolve;
        if (!addRole.value) {
          useHrm.loadRoles();
          useHrm.loadAddress();
        }
        show.value = true;
      });
    };

    onMounted(() => {});
    const setPassword = ref(false);
    const extraData = ref(false);
    const userCreated = (id, user) => {
      // emit("selected", id, user);
      resolver.value(user);
      show.value = false;
    };
    const addRole = computed(() => props.withRole && user.can("createAgent"));
    return {
      address,
      setPassword,
      extraData,
      form,
      show,
      open,
      addRole,
      useHrm,
      createUser: async () => {
        return new Promise(async (resolve, reject) => {
          if (setPassword.value && !form.password)
            resolve({ msg: "Invalid Password", error: true });
          else {
            const user = await useUser.createUser(
              form,
              extraData.value || props.withRole ? address : null
            );
            if (!user.error) {
              resolve({ msg: "User created", error: false });
              userCreated(user.id, user);
            }
          }
        });
      },
      userCreated,
    };
  },
};
</script>

<style scoped></style>
