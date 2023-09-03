<template>
  <div>
    <h1>Edit Contract</h1>

    <form @submit.prevent="handleUpdateContract">
      <div>
        <label for="contract_number">Contract Number:</label>
        <input
          type="text"
          id="contract_number"
          v-model="formData.contract_number"
          :class="{
            invalid: !isFieldValid(formData.contract_number, [required]),
          }"
          required
        />
        <span
          class="error-message"
          v-if="!isFieldValid(formData.contract_number, [required])"
        >
          Please enter a valid contract number.
        </span>
      </div>
      <div>
        <label for="contract_name">Contract Name:</label>
        <input
          type="text"
          id="contract_name"
          v-model="formData.contract_name"
          :class="{
            invalid: !isFieldValid(formData.contract_name, [required]),
          }"
          required
        />
        <span
          class="error-message"
          v-if="!isFieldValid(formData.contract_name, [required])"
        >
          Please enter a contract name.
        </span>
      </div>
      <div>
        <label for="sign_date">Sign Date:</label>
        <input
          type="date"
          id="sign_date"
          v-model="formData.sign_date"
          :class="{ invalid: !isFieldValid(formData.sign_date, [required]) }"
          required
        />
        <span
          class="error-message"
          v-if="!isFieldValid(formData.sign_date, [required])"
        >
          Please select a sign date.
        </span>
      </div>
      <div>
        <label for="contract_value">Contract Value:</label>
        <input
          type="number"
          id="contract_value"
          v-model="formData.contract_value"
          :class="{
            invalid: !isFieldValid(formData.contract_value, [
              required,
              isNumber,
            ]),
          }"
          required
        />
        <span
          class="error-message"
          v-if="!isFieldValid(formData.contract_value, [required, isNumber])"
        >
          Please enter a valid contract value.
        </span>
      </div>
      <div>
        <label for="customer_id">Customer:</label>
        <input
          type="text"
          id="customer_id"
          v-model="formData.customer_id"
          :class="{ invalid: !isFieldValid(formData.customer_id, [required]) }"
          required
        />
        <span
          class="error-message"
          v-if="!isFieldValid(formData.customer_id, [required])"
        >
          Please enter a customer ID.
        </span>
      </div>
      <div>
        <label for="status">Status:</label>
        <input
          type="number"
          id="status"
          v-model="formData.status"
          :class="{
            invalid: !isFieldValid(formData.status, [required, isNumber]),
          }"
          required
        />
        <span
          class="error-message"
          v-if="!isFieldValid(formData.status, [required, isNumber])"
        >
          Please enter a status.
        </span>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          v-model="formData.description"
          :class="{ invalid: !isFieldValid(formData.description, [required]) }"
          required
        ></textarea>
        <span
          class="error-message"
          v-if="!isFieldValid(formData.description, [required])"
        >
          Please enter a description.
        </span>
      </div>

      <button type="submit">Update Contract</button>
    </form>
    <RouterLink to="/contracts">Back to Contracts List</RouterLink>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getContract, updateContract } from "../../api";
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
    const contractId = router.currentRoute.value.params.id;

    const isFieldValid = (value, validators) => {
      for (const validator of validators) {
        if (!validator(value)) {
          return false;
        }
      }
      return true;
    };

    const fetchContractData = async () => {
      try {
        if (contractId) {
          console.log("date", formData.value.sign_date);

          const contractData = await getContract(contractId);
          console.log("data contract", contractData);
          formData.value = { ...contractData };
          console.log("formData", formData);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    const handleUpdateContract = async () => {
      if (
        isFieldValid(formData.contract_number, [required, isNumber]) &&
        isFieldValid(formData.contract_name, [required]) &&
        isFieldValid(formData.sign_date, [required]) &&
        isFieldValid(formData.contract_value, [required, isNumber]) &&
        isFieldValid(formData.customer_id, [required]) &&
        isFieldValid(formData.status, [required]) &&
        isFieldValid(formData.description, [required])
      ) {
        try {
          if (contractId) {
            formData.value.sign_date = convertDateToTimestamp(
              formData.value.sign_date
            );
            const response = await updateContract(contractId, formData.value);
            console.log("response", response);
            if (response) {
              router.push({ path: "/contracts" });
            }
          }
        } catch (error) {
          console.error("API error:", error);
        }
      }
    };

    onMounted(() => {
      fetchContractData();
    });

    return {
      formData,
      handleUpdateContract,
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
