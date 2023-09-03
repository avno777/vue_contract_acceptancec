<template>
  <div>
    <h1>Contract List</h1>
    <input
      v-model="searchKeyword"
      placeholder="Search by keyword"
      @input="searchUsers"
    />
    <RouterLink to="/contracts/new">Create New Contract</RouterLink>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Contract Number</th>
          <th>Contract Name</th>
          <th>Sign Date</th>
          <th>Contract Value</th>
          <th>Customer</th>
          <th>status</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contract in contracts" :key="contract.id">
          <td>{{ contract.id }}</td>
          <td>{{ contract.contract_number }}</td>
          <td>{{ contract.contract_name }}</td>
          <td>{{ formatTimeStamp(contract.sign_date) }}</td>
          <td>{{ contract.contract_value }}</td>
          <td>{{ contract.customer_id }}</td>
          <td>{{ contract.status }}</td>
          <td>{{ contract.description }}</td>
          <td>
            <button @click="viewContractDetails(contract)">View</button>
            <button @click="updateContract(contract)">Edit</button>
            <button @click="handleDeleteContract(contract.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <ContractList :contracts="contracts" /> -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllContracts, deleteContract } from "../../api/index";
import { convertTimestampToDate } from "../../api/common";

export default {
  components: {
    //ContractList,
  },
  setup() {
    const contracts = ref([]);
    const router = useRouter();

    const fetchContracts = async () => {
      try {
        const response = await getAllContracts();
        console.log("respond data", response);
        contracts.value = response;
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    const viewContractDetails = (contract) => {
      router.push({ path: "/contracts", params: { id: contract.id } });
    };

    const updateContract = (contract) => {
      router.push({ path: "/contracts/update", params: { id: contract.id } });
    };

    const handleDeleteContract = async (contractId) => {
      try {
        await deleteContract(contractId);
        contracts.value = contracts.value.filter(
          (contract) => contract.id !== contractId
        );
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    const formatTimeStamp = (timestamp) => {
      return convertTimestampToDate(timestamp);
    };

    onMounted(fetchContracts);

    return {
      contracts,
      viewContractDetails,
      updateContract,
      handleDeleteContract,
      formatTimeStamp,
    };
  },
};
</script>
