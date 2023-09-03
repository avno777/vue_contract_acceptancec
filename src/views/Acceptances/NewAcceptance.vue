<template>
  <div>
    <h1>Create contract</h1>

    <form @submit.prevent="handleCreateAcceptance">
      <div>
        <label for="contract_id">Contract:</label>
        <input
          type="text"
          id="contract_id"
          v-model="formData.contract_id"
          required
        />
      </div>
      <div>
        <label for="acceptance_name">Acceptance Name:</label>
        <input
          type="text"
          id="acceptance_name"
          v-model="formData.acceptance_name"
          required
        />
      </div>
      <div>
        <label for="acceptance_amount">Acceptance Amount:</label>
        <input
          type="number"
          id="acceptance_amount"
          v-model="formData.acceptance_amount"
          required
        />
      </div>
      <div>
        <label for="volume">Volume:</label>
        <input type="number" id="volume" v-model="formData.volume" required />
      </div>
      <div>
        <label for="status">Status:</label>
        <input type="number" id="status" v-model="formData.status" required />
      </div>
      <div>
        <label for="acceptance_date">Acceptance Date:</label>
        <input
          type="date"
          id="acceptance_date"
          v-model="formData.acceptance_date"
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
          v-model="formData.description"
          required
        ></textarea>
      </div>
      <div>
        <button type="submit">Create Acceptance</button>
      </div>
    </form>
    <RouterLink to="/contracts">Back to User List</RouterLink>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { createAcceptance, createContract } from "../../api"; // Import the createUser function
import { useRouter } from "vue-router";
import { convertDateToTimestamp } from "../../api/common";
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

    const handleCreateAcceptance = async () => {
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
    };

    return {
      formData,
      handleCreateAcceptance,
    };
  },
};
</script>
