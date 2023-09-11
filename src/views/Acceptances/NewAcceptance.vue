<template>
  <div>
    <div class="py-4 px-24">
      <h1 class="text-2xl font-semibold mb-4">Create Acceptance</h1>
      <div class="space-y-4">
        <div class="flex flex-col">
          <label class="font-semibold mb-2" for="contract_id">Contract:</label>
          <input
            type="text"
            id="contract_id"
            v-model="formData.contract_id"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isContractIdValid == true,
              invalid: isContractIdValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="
              formSubmitted && !isContractIdValid && formData.contract_id != ''
            "
          >
            Please enter a valid contract number.
          </span>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold mb-2" for="acceptance_name"
            >Acceptance Name:</label
          >
          <input
            type="text"
            id="acceptance_name"
            v-model="formData.acceptance_name"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isAcceptanceNameValid == true,
              invalid: isAcceptanceNameValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="
              formSubmitted &&
              !isAcceptanceNameValid &&
              formData.contract_name != ''
            "
          >
            Please enter a acceptance name.
          </span>
        </div>

        <div class="flex flex-col">
          <label class="font-semibold mb-2" for="acceptance_amount"
            >Acceptance Amount:</label
          >
          <input
            type="text"
            id="acceptance_amount"
            v-model="formData.acceptance_amount"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isAcceptanceAmountValid == true,
              invalid: isAcceptanceAmountValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="
              formSubmitted &&
              !isAcceptanceAmountValid &&
              formData.acceptance_amount != ''
            "
          >
            Please enter a valid acceptance amount.
          </span>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold mb-2" for="volume">Volume:</label>
          <input
            type="text"
            id="volume"
            v-model="formData.volume"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isVolumeValid == true,
              invalid: isVolumeValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="formSubmitted && !isVolumeValid && formData.volume != ''"
          >
            Please enter volume.
          </span>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold mb-2" for="status">Status:</label>
          <input
            type="text"
            id="status"
            v-model="formData.status"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isStatusValid == true,
              invalid: isStatusValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="formSubmitted && !isStatusValid && formData.status != ''"
          >
            Please enter a status.
          </span>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold mb-2" for="acceptance_date"
            >Acceptance Date:</label
          >
          <input
            type="date"
            id="sign_date"
            v-model="formData.acceptance_date"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isAcceptanceDateValid == true,
              invalid: isAcceptanceDateValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="
              formSubmitted &&
              !isAcceptanceDateValid &&
              formData.acceptance_date != ''
            "
          >
            Please select a sign date.
          </span>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold mb-2" for="description"
            >Description:</label
          >
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            v-model="formData.description"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isDescriptionValid == true,
              invalid: isDescriptionValid == false,
            }"
            required
          ></textarea>
          <span
            class="error-message"
            v-if="
              formSubmitted && !isDescriptionValid && formData.description != ''
            "
          >
            Please enter a description.
          </span>
        </div>
        <button
          @click="handleCreateAcceptance"
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Create Acceptance
        </button>
      </div>
      <RouterLink
        to="/acceptances"
        class="mt-4 block text-blue-500 hover:underline font-semibold"
        >Back to Acceptances List</RouterLink
      >
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { createAcceptance } from "../../api";
import { convertDateToTimestamp, required, isNumber } from "../../api/common";
export default {
  components: {
    //ContractForm,
  },
  setup() {
    const formData = reactive({
      contract_id: "",
      acceptance_name: "",
      acceptance_amount: "",
      volume: "",
      status: "",
      acceptance_date: "",
      description: "",
    });

    const router = useRouter();
    const formSubmitted = ref(false);

    const handleCreateAcceptance = async () => {
      formSubmitted.value = true;
      if (
        isContractIdValid.value == true &&
        isAcceptanceNameValid.value == true &&
        isAcceptanceAmountValid.value == true &&
        isVolumeValid.value == true &&
        isStatusValid.value == true &&
        isAcceptanceDateValid.value == true &&
        isDescriptionValid.value == true
      ) {
        try {
          formData.value.acceptance_date = convertDateToTimestamp(
            formData.value.acceptance_date
          );
          const response = await createAcceptance(formData);
          console.log("response", response);
          if (response.status === 201) {
            router.push({ path: "/acceptances" });
          }
        } catch (error) {
          console.log("Error create contract", error);
        }
      }
    };

    const isContractIdValid = computed(() => {
      return formSubmitted.value ? required(formData.contract_id) : null;
    });

    const isAcceptanceNameValid = computed(() => {
      return formSubmitted.value ? required(formData.acceptance_name) : null;
    });

    const isAcceptanceAmountValid = computed(() => {
      return formSubmitted.value
        ? required(formData.acceptance_amount) &&
            isNumber(formData.acceptance_amount)
        : null;
    });

    const isVolumeValid = computed(() => {
      return formSubmitted.value
        ? required(formData.volume) && isNumber(formData.volume)
        : null;
    });

    const isStatusValid = computed(() => {
      return formSubmitted.value
        ? required(formData.status) && isNumber(formData.status)
        : null;
    });

    const isAcceptanceDateValid = computed(() => {
      return formSubmitted.acceptance_date
        ? required(formData.acceptance_date)
        : null;
    });

    const isDescriptionValid = computed(() => {
      return formSubmitted.value ? required(formData.description) : null;
    });

    return {
      formData,
      handleCreateAcceptance,
      isContractIdValid,
      isAcceptanceNameValid,
      isAcceptanceAmountValid,
      isVolumeValid,
      isAcceptanceDateValid,
      isDescriptionValid,
    };
  },
};
</script>
<style>
.invalid {
  border: 1px solid red;
}

.error-message {
  color: red;
}
</style>
