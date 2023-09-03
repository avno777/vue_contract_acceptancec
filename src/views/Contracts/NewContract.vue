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

      <button type="submit">Create Contract</button>
    </form>
    <RouterLink to="/contracts">Back to User List</RouterLink>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { createContract } from "../../api"; // Import the createUser function
import { useRouter } from "vue-router";
import { convertDateToTimestamp } from "../../api/common";
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

    const handleCreateContract = async () => {
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
    };

    return {
      formData,
      handleCreateContract,
    };
  },
};
</script>
