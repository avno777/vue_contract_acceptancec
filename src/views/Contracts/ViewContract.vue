<template>
  <div>
    <h1>Contract List</h1>
    <ContractList :contracts="contracts" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAllContracts } from "../../api";
import ContractList from "../../components/ContractList.vue";

export default {
  components: {
    ContractList,
  },
  setup() {
    const contracts = ref([]);

    const fetchUsers = async () => {
      try {
        const response = await getAllContracts();
        console.log("respond data", response);
        contracts.value = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    onMounted(fetchUsers);

    return { contracts };
  },
};
</script>
