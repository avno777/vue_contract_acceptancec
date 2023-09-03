<template>
  <div>
    <h1>Edit User</h1>

    <form @submit.prevent="handleUpdateContract">
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
        <input
          type="date"
          id="birthday"
          v-model="formData.sign_date"
          required
        />
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
        <input
          type="text"
          id="gender"
          v-model="formData.customer_id"
          required
        />
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

      <button type="submit">Update Contract</button>
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
