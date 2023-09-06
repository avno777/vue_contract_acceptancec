<template>
  <div>
    <div class="px-20 pt-16">
      <h1 class="text-3xl font-bold mb-4">Contract List</h1>
      <input
        class="w-[300px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
        v-model="searchKeyword"
        placeholder="Search by keyword"
        @input="searchContracts"
      />
      <RouterLink
        to="/contracts/new"
        class="mt-4 block text-blue-500 hover:underline hover:text-blue-600 font-semibold"
        >Create New Contract</RouterLink
      >

      <div class="py-4">
        <table class="min-w-full border-collapse">
          <thead class="border">
            <tr>
              <th class="py-2 px-4 bg-gray-100">ID</th>
              <th class="py-2 px-4 bg-gray-100">Contract Number</th>
              <th class="py-2 px-4 bg-gray-100">Contract Name</th>
              <th class="py-2 px-4 bg-gray-100">Sign Date</th>
              <th class="py-2 px-4 bg-gray-100">Contract Value</th>
              <th class="py-2 px-4 bg-gray-100">Customer</th>
              <th class="py-2 px-4 bg-gray-100">Status</th>
              <th class="py-2 px-4 bg-gray-100">Description</th>
              <th class="py-2 px-4 bg-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loadingTable">
              <td colspan="9" class="py-2 px-4 text-center font-medium">
                Loading
              </td>
            </tr>
            <tr v-for="contract in contracts" :key="contract.id">
              <td class="py-2 px-4 border">{{ contract.id }}</td>
              <td class="py-2 px-4 border">{{ contract.contract_number }}</td>
              <td class="py-2 px-4 border">{{ contract.contract_name }}</td>
              <td class="py-2 px-4 border">
                {{ formatTimeStamp(contract.sign_date) }}
              </td>
              <td class="py-2 px-4 border">{{ contract.contract_value }}</td>
              <td class="py-2 px-4 border">{{ contract.customer_id }}</td>
              <td class="py-2 px-4 border">{{ contract.status }}</td>
              <td class="py-2 px-4 border">{{ contract.description }}</td>
              <td class="py-2 px-4 border">
                <button
                  @click="viewContractDetails(contract)"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mb-2"
                >
                  View
                </button>
                <button
                  @click="updateContract(contract)"
                  class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mb-2"
                >
                  Edit
                </button>
                <button
                  @click="handleDeleteContract(contract.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <ContractList :contracts="contracts" /> -->
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getAllContracts, deleteContract } from "../../api/index";
import { convertTimestampToDate } from "../../api/common";

export default {
  components: {
    //ContractList,
  },
  setup() {
    const contracts = ref([]);
    const searchKeyword = ref("");
    const router = useRouter();
    const loadingTable = ref(false);

    const searchContracts = () => {
      setTimeout(fetchContracts, 1000);
    };

    watch(searchKeyword, searchContracts);

    const fetchContracts = async () => {
      loadingTable.value = true;
      try {
        const response = await getAllContracts(searchKeyword.value);
        console.log("keyword", searchKeyword.value);
        console.log("respond data", response);
        contracts.value = response;
        loadingTable.value = false;
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    const viewContractDetails = (contract) => {
      router.push({
        path: `/contracts/${contract.id}`,
      });
    };

    const updateContract = (contract) => {
      router.push({ path: `/contracts/update/${contract.id}` });
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
      loadingTable,
      viewContractDetails,
      updateContract,
      handleDeleteContract,
      formatTimeStamp,
      searchKeyword,
      searchContracts,
    };
  },
};
</script>
<style></style>
