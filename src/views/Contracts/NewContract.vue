<template>
  <div>
    <h1>Create contract</h1>

    <form @submit.prevent="handleCreateContract">
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

      <button type="submit">Create Contract</button>
    </form>
    <RouterLink to="/contracts">Back to User List</RouterLink>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { createContract } from "../../api"; // Import the createUser function
import { useRouter } from "vue-router";
import { convertDateToTimestamp, required, isNumber } from "../../api/common";
export default {
  components: {
    //ContractForm,
  },
  setup() {
    const formData = reactive({
      contract_number: "",
      contract_name: "",
      sign_date: "",
      contract_value: "",
      customer_id: "",
      status: "",
      description: "",
    });

    const router = useRouter();

    const isFieldValid = (value, validators) => {
      for (const validator of validators) {
        if (!validator(value)) {
          return false;
        }
      }
      return true;
    };

    const handleCreateContract = async () => {
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

    return {
      formData,
      handleCreateContract,
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
