<template>
  <div class="flex-center py-16">
    <div class="flex flex-col space-y-8">
      <App>
        <div>
          <p class="text-mat-gray-600 font-semibold">TOTAL DELIVERY COST</p>
          <p class="text-5xl font-bold leading-tight w-2/3">
            Find out the approximate cost of delivery of your shipments
          </p>
        </div>
      </App>
      <App>
        <div class="bg-white p-10 grid grid-cols-12 gap-4 gap-x-5">
          <Input
            label="Your Name"
            class="col-span-12 sm:col-span-6"
            v-model="form.name"
          ></Input>

          <Input
            label="Email"
            class="col-span-12 sm:col-span-6"
            v-model="form.email"
          ></Input>
          <Input
            label="Sending From"
            class="col-span-12 sm:col-span-6"
            v-model="form.address_from"
          ></Input>

          <Input
            label="Sending To"
            class="col-span-12 sm:col-span-6"
            v-model="form.address_to"
          ></Input>
          <!-- <span class="col-span-6 sm:col-span-3 pt-4">Width</span>
          <span class="col-span-6 sm:col-span-3 pt-4">Height</span>
          <span class="col-span-6 sm:col-span-3 pt-4">Weight</span>
          <span class="col-span-6 sm:col-span-3 pt-4">Fragile</span> -->

          <Input
            class="col-span-6 sm:col-span-3"
            label="Dimension"
            :suffix="form.dimension_unit"
            v-model="form.pkg_dimension"
          ></Input>
          <Input
            class="col-span-6 sm:col-span-3"
            label="Weight"
            :suffix="form.weight_unit"
            v-model="form.pkg_weight"
          ></Input>
          <div class="col-span-6 sm:col-span-3 space-y-1">
            <Label>Fragile</Label>
            <div class="bg-secondary text-white p-1 grid grid-cols-2">
              <div
                class="flex items-center py-1 justify-center cursor-pointer transition-all duration-500"
                :class="[form.pkg_fragile && 'bg-yellow-500 text-secondary']"
                @click="form.pkg_fragile = true"
              >
                Yes
              </div>
              <div
                class="flex items-center py-1 justify-center cursor-pointer transition-all duration-500"
                :class="[!form.pkg_fragile && 'bg-yellow-500 text-black-700']"
                @click="form.pkg_fragile = false"
              >
                No
              </div>
            </div>
          </div>
          <div class="col-span-12 flex space-x-6 py-4">
            <div>
              <Checkbox class="light" v-model="form.opt_express">
                <span>Express Delivery</span>
              </Checkbox>
            </div>
            <div>
              <Checkbox class="dark" v-model="form.opt_insure">
                <span>Insurance</span>
              </Checkbox>
            </div>
            <div class="">
              <Checkbox class="dark" v-model="form.opt_pkg">
                <span>Packaging</span>
              </Checkbox>
            </div>
          </div>
          <div class="col-span-12 flex justify-end">
            <Btn async tile :action="getEstimate" large>Get Estimate </Btn>
          </div>
        </div></App
      >
    </div>
  </div>
</template>

<script lang="ts">
import alert from "@/hooks/alert";
import dataLoader from "@/hooks/dataLoader";
import { useQuoteRequestApi } from "@/use/api/use-api";
import { onMounted, ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const form = ref<any>({});
    onMounted(async () => {
      await dataLoader.initPkgData();
      const { weight_unit, dimension_unit } = dataLoader.pkgData.value;
      form.value = { weight_unit, dimension_unit };
    });
    const getEstimate = async () => {
      const content = form.value;
      const required = {
        name: "Please tell use your name",
        email: "Please provide valid email address",
        pkg_weight: "Package weight is required",
        address_from: "Tell us where you are sending from",
        address_to: "Tell us where you are sending to",
      };
      let err = Object.keys(required).find(
        (k) => !content[k] || !content[k]?.trim()
      );

      if (err) {
        alert.error(required[err]);
        return;
      }
      await useQuoteRequestApi().create(
        {
          data: { content },
        },
        {
          onSuccess: (data) => {
            alert.success("Your request has been submitted!");
            alert.success("We will notify you via email!");
            form.value = {};
          },
        }
      );
    };
    return {
      getEstimate,
      form,
    };
  },
};
</script>

<style scoped></style>
