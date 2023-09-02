<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="contract_number">Contract Number:</label>
      <input
        type="text"
        id="contract_number"
        v-model="formContractData.contract_number"
        required
      />
    </div>
    <div>
      <label for="contract_name">Contract Name:</label>
      <input
        type="text"
        id="contract_name"
        v-model="formContractData.contract_name"
        required
      />
    </div>
    <div>
      <label for="birthday">Sign Date:</label>
      <input
        type="date"
        id="birthday"
        v-model="formContractData.sign_date"
        required
      />
    </div>
    <div>
      <label for="gender">Contract Value:</label>
      <input
        type="text"
        id="gender"
        v-model="formContractData.contract_value"
        required
      />
    </div>
    <div>
      <label for="gender">Customer:</label>
      <input
        type="text"
        id="gender"
        v-model="formContractData.customer_id"
        required
      />
    </div>
    <div>
      <label for="gender">Status:</label>
      <input
        type="text"
        id="gender"
        v-model="formContractData.status"
        required
      />
    </div>
    <div>
      <label for="gender">Description:</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        v-model="formContractData.description"
        required
      ></textarea>
    </div>
    <div>
      <button type="submit">
        {{ isEditing ? "Update User" : "Create User" }}
      </button>
    </div>
  </form>
</template>

<script>
import { ref, reactive } from "vue";
import { createContract, updateContract } from "../api";

export default {
  props: {
    isEditing: Boolean,
    contract: Object,
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const formContractData = reactive({
      contract_number: "",
      contract_name: "",
      sign_date: "",
      contract_value: "",
      customer_id: "",
      status: "",
      description: "",
    });

    if (props.isEditing) {
      formContractData.contract_number = props.contract.contract_number;
      formContractData.contract_name = props.contract.contract_name;
      formContractData.sign_date = props.contract.sign_date;
      formContractData.contract_value = props.contract.contract_value;
      formContractData.customer_id = props.contract.customer_id;
      formContractData.status = props.contract.status;
      formContractData.description = props.contract.description;
    }

    const handleSubmit = async () => {
      try {
        if (props.isEditing) {
          await updateContract(props.contract.id, formContractData);
        } else {
          await createContract(formContractData);
        }
        emit("submit"); // Emit the submit event to notify the parent component
      } catch (error) {
        console.error("API error:", error);
      }
    };

    return {
      formContractData,
      handleSubmit,
    };
  },
};
</script>
