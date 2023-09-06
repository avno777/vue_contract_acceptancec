<template>
  <div>
    <div class="py-4 px-24">
      <h1 class="text-2xl font-semibold mb-4">Create contract</h1>
      <div class="space-y-4">
        <div class="flex flex-col">
          <label for="contract_number" class="font-semibold mb-2"
            >Contract Number:</label
          >
          <input
            type="text"
            id="contract_number"
            v-model="formData.contract_number"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isContractNumberValid == true,
              invalid: isContractNumberValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="
              formSubmitted &&
              !isContractNumberValid &&
              formData.contract_number == ''
            "
          >
            Please enter a valid contract number.
          </span>
        </div>

        <div class="flex flex-col">
          <label class="font-semibold" for="contract_name mb-2"
            >Contract Name:</label
          >
          <input
            type="text"
            id="contract_name"
            v-model="formData.contract_name"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isContractNameValid == true,
              invalid: isContractNameValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="
              formSubmitted &&
              !isContractNameValid &&
              formData.contract_name == ''
            "
          >
            Please enter a contract name.
          </span>
        </div>

        <div class="flex flex-col">
          <label class="font-semibold mb-2" for="sign_date">Sign Date:</label>
          <input
            type="date"
            id="sign_date"
            v-model="formData.sign_date"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isSignDateValid == true,
              invalid: isSignDateValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="formSubmitted && !isSignDateValid && formData.sign_date != ''"
          >
            Please select a sign date.
          </span>
        </div>

        <div class="flex flex-col">
          <label class="font-semibold mb-2" for="contract_value"
            >Contract Value:</label
          >
          <input
            type="text"
            id="contract_value"
            v-model="formData.contract_value"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isContractValueValid == true,
              invalid: isContractValueValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="
              formSubmitted &&
              !isContractValueValid &&
              formData.contract_value == ''
            "
          >
            Please enter a valid contract value.
          </span>
        </div>

        <div class="flex flex-col">
          <label class="font-semibold mb-2" for="customer_id">Customer:</label>
          <input
            type="text"
            id="customer_id"
            v-model="formData.customer_id"
            class="pl-2 py-1 border-solid border-2 border-gray-200 rounded-lg w-3/6"
            :class="{
              valid: isCustomerIdValid == true,
              invalid: isCustomerIdValid == false,
            }"
            required
          />
          <span
            class="error-message"
            v-if="
              formSubmitted && !isCustomerIdValid && formData.customer_id != ''
            "
          >
            Please enter a customer ID.
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
            v-if="formSubmitted && !isStatusValid && formData.status == ''"
          >
            Please enter a status.
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
              formSubmitted && !isDescriptionValid && formData.description == ''
            "
          >
            Please enter a description.
          </span>
        </div>
        <button
          @click="handleCreateContract"
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Create Contract
        </button>
      </div>

      <RouterLink
        to="/contracts"
        class="mt-4 block text-blue-500 hover:underline font-semibold"
        >Back to User List</RouterLink
      >
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { createContract } from "../../api"; // Import the createUser function
import { useRouter } from "vue-router";
import { convertDateToTimestamp, required, isNumber } from "../../api/common";
export default {
  components: {
    //ContractForm,
  },
  setup() {
    const formData = ref({
      contract_number: "",
      contract_name: "",
      sign_date: "",
      contract_value: "",
      customer_id: "",
      status: "",
      description: "",
    });

    const router = useRouter();
    const formSubmitted = ref(false);

    const handleCreateContract = async () => {
      formSubmitted.value = true;
      if (
        isContractNumberValid.value == true &&
        isContractNameValid.value == true &&
        isSignDateValid.value == true &&
        isContractValueValid.value == true &&
        isCustomerIdValid.value == true &&
        isStatusValid.value == true &&
        isDescriptionValid.value == true
      ) {
        try {
          formData.value.sign_date = convertDateToTimestamp(
            formData.value.sign_date
          );
          const response = await createContract(formData);
          console.log("response", response);
          if (response.status === 201) {
            router.push({ path: "/contracts" }); // Replace 'userList' with your route name
          }
        } catch (error) {
          console.log("Error create contract", error);
        }
      }
    };

    const isContractNumberValid = computed(() => {
      return formSubmitted.value ? required(formData.contract_number) : null;
    });

    const isContractNameValid = computed(() => {
      return formSubmitted.value ? required(formData.contract_name) : null;
    });

    const isSignDateValid = computed(() => {
      return formSubmitted.value ? required(formData.sign_date) : null;
    });

    const isContractValueValid = computed(() => {
      return formSubmitted.value
        ? required(formData.contract_value) && isNumber(formData.contract_value)
        : null;
    });

    const isCustomerIdValid = computed(() => {
      return formSubmitted.value ? required(formData.customer_id) : null;
    });

    const isStatusValid = computed(() => {
      return formSubmitted.value
        ? required(formData.status) && isNumber(formData.status)
        : null;
    });

    const isDescriptionValid = computed(() => {
      return formSubmitted.value ? required(formData.description) : null;
    });

    return {
      formData,
      handleCreateContract,
      formSubmitted,
      isContractNumberValid,
      isContractNameValid,
      isSignDateValid,
      isContractValueValid,
      isCustomerIdValid,
      isStatusValid,
      isDescriptionValid,
    };
  },
};
</script>
<style>
.valid {
  border: 1px solid blue;
}
.invalid {
  border: 1px solid red;
}

.error-message {
  color: red;
}
</style>
