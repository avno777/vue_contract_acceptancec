<template>
  <div>
    <h1>Create contract</h1>
    <ContractForm :isEditing="false" @submit="handleCreateContract" />
    <RouterLink to="/contracts">Back to User List</RouterLink>
  </div>
</template>

<script>
import ContractForm from "../../components/ContractForm.vue";
import { ref, reactive } from "vue";
import { createContract } from "../../api"; // Import the createUser function
import { useRouter } from "vue-router";

export default {
  components: {
    ContractForm,
  },
  setup() {
    const contractData = reactive({
      contract_number: "",
      contract_name: "",
      sign_date: "",
      contract_value: "",
      customer_id: "",
      status: "",
      description: "",
    });

    const router = useRouter();

    const handleCreateContract = async () => {
      try {
        const response = await createContract(contractData);
        if (response) {
          router.push({ path: "/contracts" }); // Replace 'userList' with your route name
        }
      } catch (error) {
        console.log("Error create contract", error);
      }
    };

    return {
      contractData,
      handleCreateContract,
    };
  },
};
</script>
