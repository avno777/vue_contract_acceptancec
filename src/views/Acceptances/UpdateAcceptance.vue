<template>
  <div>
    <h1>Edit Acceptance</h1>

    <form @submit.prevent="handleUpdateAcceptance">
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
        <button type="submit">Update Acceptance</button>
      </div>
    </form>
    <!-- <ContractForm
      :isEditing="true"
      :contract="formContractData"
      @submit="handleUpdateContract"
    /> -->
    <RouterLink to="/contracts">Back to Contracts List</RouterLink>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getContract, updateContract } from "../../api";
import { convertDateToTimestamp } from "../../api/common";

export default {
  components: {
    //ContractForm,
  },
  setup() {
    const formData = ref({
      contract_id: "",
      acceptance_name: "",
      acceptance_amount: "",
      volume: "",
      status: "",
      acceptance_date: "",
      description: "",
    });
    const router = useRouter();
    const contractId = router.currentRoute.value.params.id;

    const fetchAcceptanceData = async () => {
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

    const handleUpdateAcceptance = async () => {
      try {
        if (contractId) {
          formData.value.acceptance_date = convertDateToTimestamp(
            formData.value.acceptance_date
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
    };

    onMounted(() => {
      fetchAcceptanceData();
    });

    return {
      formData,
      handleUpdateAcceptance,
    };
  },
};
</script>
