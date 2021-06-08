<template>
  <DopeCard
    title="Profile Data"
    subtitle="Update your account profile information"
  >
    <CardContent class="space-y-4 mb-4">
      <Input label="First Name" grid v-model="form.first_name" />
      <Input label="Last Name" grid v-model="form.last_name" />
      <Input label="Email" readonly disabled grid v-model="form.email" />
      <Input
        label="Country"
        auto-complete
        :items="geo.countries.value"
        grid
        v-model="phone.country"
      />
      <Input label="Phone" grid v-model="phone.no" :prefix="phone.code" />
    </CardContent>
    <CardActions plain>
      <Btn color="green-500">
        <span class="px-2">Save</span>
      </Btn>
    </CardActions>
  </DopeCard>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import DopeCard from "@/views/Settings/DopeCard.vue";
import { useGeo } from "@/hooks/useGeo";
import userAccount from "@/use/user-account";
import { pick } from "lodash";
export default {
  components: {
    DopeCard,
  },
  props: {},
  setup(props, { emit }) {
    const form = ref<any>({});
    const phone = ref<any>({});
    const geo = useGeo();
    onMounted(() => {
      const acct = userAccount.user.value;
      form.value = pick(acct, ["first_name", "last_name", "email"]);
      phone.value = acct.phone ?? {};
      const { country } = props.value;
      // geo.initialize(
      //   {
      //     country,
      //     opts: {
      //       noState: true,
      //     },
      //   },
      //   (country) => {
      //     phone.value.code = country.code;
      //   }
      // );
    });
    return {
      form,
      phone,
      geo,
    };
  },
};
</script>

<style scoped></style>
