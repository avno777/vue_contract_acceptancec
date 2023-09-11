<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="contract_number">Contract Number:</label>
      <input
        type="text"
        id="contract_number"
        v-model="formData.contract_number"
        required
      />
    </div>
    <div>
      <label for="contract_name">Contract Name:</label>
      <input
        type="text"
        id="contract_name"
        v-model="formData.contract_name"
        required
      />
    </div>
    <div>
      <label for="birthday">Sign Date:</label>
      <input type="date" id="birthday" v-model="formData.sign_date" required />
    </div>
    <div>
      <label for="gender">Contract Value:</label>
      <input
        type="text"
        id="gender"
        v-model="formData.contract_value"
        required
      />
    </div>
    <div>
      <label for="gender">Customer:</label>
      <input type="text" id="gender" v-model="formData.customer_id" required />
    </div>
    <div>
      <label for="gender">Status:</label>
      <input type="text" id="gender" v-model="formData.status" required />
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        v-model="formData.description"
        required
      ></textarea>
    </div>
    <div>
      <button type="submit">
        {{ isEditing ? "Update Contract" : "Create Contract" }}
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
    const formData = reactive({
      contract_number: "",
      contract_name: "",
      sign_date: "",
      contract_value: "",
      customer_id: "",
      status: "",
      description: "",
    });

    if (props.isEditing) {
      console.log("before", props.contract);
      formData.contract_number = props.contract.contract_number;
      formData.contract_name = props.contract.contract_name;
      formData.sign_date = props.contract.sign_date;
      formData.contract_value = props.contract.contract_value;
      formData.customer_id = props.contract.customer_id;
      formData.status = props.contract.status;
      formData.description = props.contract.description;
    }
    console.log("after", formData);

    const handleSubmit = async () => {
      try {
        if (props.isEditing) {
          await updateContract(props.contract.id, formData);
        } else {
          await createContract(formData);
        }
        emit("submit"); // Emit the submit event to notify the parent component
      } catch (error) {
        console.error("API error:", error);
      }
    };

    return {
      formData,
      handleSubmit,
    };
  },
};
</script>
