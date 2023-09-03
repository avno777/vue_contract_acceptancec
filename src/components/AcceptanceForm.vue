<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="contract_id">Contract:</label>
      <input
        type="text"
        id="contract_id"
        v-model="formAcceptanceData.contract_id"
        required
      />
    </div>
    <div>
      <label for="acceptance_name">Acceptance Name:</label>
      <input
        type="text"
        id="acceptance_name"
        v-model="formAcceptanceData.acceptance_name"
        required
      />
    </div>
    <div>
      <label for="acceptance_amount">Acceptance Amount:</label>
      <input
        type="number"
        id="acceptance_amount"
        v-model="formAcceptanceData.acceptance_amount"
        required
      />
    </div>
    <div>
      <label for="volume">Volume:</label>
      <input
        type="number"
        id="volume"
        v-model="formAcceptanceData.volume"
        required
      />
    </div>
    <div>
      <label for="status">Status:</label>
      <input
        type="number"
        id="status"
        v-model="formAcceptanceData.status"
        required
      />
    </div>
    <div>
      <label for="acceptance_date">Acceptance Date:</label>
      <input
        type="date"
        id="acceptance_date"
        v-model="formAcceptanceData.status"
        required
      />
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        v-model="formAcceptanceData.description"
        required
      ></textarea>
    </div>
    <div>
      <button type="submit">
        {{ isEditing ? "Update Acceptance" : "Create Acceptance" }}
      </button>
    </div>
  </form>
</template>

<script>
import { ref, reactive } from "vue";
import { createAcceptance, updateAcceptance } from "../api";

export default {
  props: {
    isEditing: Boolean,
    acceptance: Object,
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const formAcceptanceData = reactive({
      contract_id: "",
      acceptance_name: "",
      acceptance_amount: "",
      volume: "",
      status: "",
      acceptance_date: "",
      description: "",
    });

    if (props.isEditing) {
      formAcceptanceData.contract_id = props.acceptance.contract_id;
      formAcceptanceData.acceptance_name = props.acceptance.acceptance_name;
      formAcceptanceData.acceptance_amount = props.acceptance.acceptance_amount;
      formAcceptanceData.volume = props.acceptance.volume;
      formAcceptanceData.status = props.acceptance.status;
      formAcceptanceData.acceptance_date = props.acceptance.acceptance_date;
      formAcceptanceData.description = props.acceptance.description;
    }

    const handleSubmit = async () => {
      try {
        if (props.isEditing) {
          await updateAcceptance(props.acceptance.id, formAcceptanceData);
        } else {
          await createAcceptance(formAcceptanceData);
        }
        emit("submit"); // Emit the submit event to notify the parent component
      } catch (error) {
        console.error("API error:", error);
      }
    };

    return {
      formAcceptanceData,
      handleSubmit,
    };
  },
};
</script>
