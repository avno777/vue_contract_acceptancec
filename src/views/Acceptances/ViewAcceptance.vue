<template>
  <div>
    <div class="px-20 pt-16">
      <h1 class="text-3xl font-bold mb-4">AcceptanceList List</h1>
      <input
        class="w-[300px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500"
        v-model="searchKeyword"
        placeholder="Search by keyword"
        @input="searchAcceptances"
      />
      <RouterLink
        to="/acceptances/new"
        class="mt-4 block text-blue-500 hover:underline hover:text-blue-600 font-semibold"
        >Create New Acceptance</RouterLink
      >

      <div class="py-4">
        <table border="{1}" class="min-w-full border-collapse">
          <thead class="border">
            <tr>
              <th class="py-2 px-4 bg-gray-100">ID</th>
              <th class="py-2 px-4 bg-gray-100">Contract</th>
              <th class="py-2 px-4 bg-gray-100">Acceptance Name</th>
              <th class="py-2 px-4 bg-gray-100">Acceptance Amount</th>
              <th class="py-2 px-4 bg-gray-100">Volume</th>
              <th class="py-2 px-4 bg-gray-100">Status</th>
              <th class="py-2 px-4 bg-gray-100">Acceptance Date</th>
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
            <tr v-else v-for="acceptance in acceptances" :key="acceptance.id">
              <td class="py-2 px-4 border">{{ acceptance.id }}</td>
              <td class="py-2 px-4 border">{{ acceptance.contract_id }}</td>
              <td class="py-2 px-4 border">{{ acceptance.acceptance_name }}</td>
              <td class="py-2 px-4 border">
                {{ acceptance.acceptance_amount }}
              </td>
              <td class="py-2 px-4 border">{{ acceptance.volume }}</td>
              <td class="py-2 px-4 border">{{ acceptance.status }}</td>
              <td class="py-2 px-4 border">
                {{ formatTimeStamp(acceptance.acceptance_date) }}
              </td>
              <td class="py-2 px-4 border">{{ acceptance.description }}</td>
              <td class="py-2 px-4 border">
                <button
                  @click="viewAcceptanceDetails(acceptance)"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mb-2"
                >
                  View
                </button>
                <button
                  @click="updateAcceptance(acceptance)"
                  class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mb-2"
                >
                  Edit
                </button>
                <button
                  @click="handleDeleteAcceptance(acceptance.id)"
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
    <!-- <AcceptanceList :acceptances="acceptances" /> -->
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getAllAcceptances, deleteAcceptance } from "../../api";

import { useRouter } from "vue-router";
import { convertTimestampToDate } from "../../api/common";

export default {
  components: {
    // AcceptanceList,
  },
  setup() {
    const acceptances = ref([]);
    const router = useRouter();
    const searchKeyword = ref("");
    const loadingTable = ref(false);

    const searchAcceptances = () => {
      setTimeout(fetchAcceptances, 1000);
    };

    watch(searchKeyword, searchAcceptances);

    const fetchAcceptances = async () => {
      loadingTable.value = true;
      try {
        const response = await getAllAcceptances(searchKeyword.value);
        console.log("keyword", searchKeyword.value);
        console.log("respond data", response);
        acceptances.value = response;

        loadingTable.value = false;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const viewAcceptanceDetails = (acceptance) => {
      router.push({ path: `/acceptances/${acceptance.id}` });
    };

    const updateAcceptance = (acceptance) => {
      router.push({
        path: `/acceptances/update/${acceptance.id}`,
      });
    };

    const handleDeleteAcceptance = async (acceptanceId) => {
      try {
        await deleteAcceptance(acceptanceId);
        acceptances.value = acceptances.value.filter(
          (acceptance) => acceptance.id !== acceptanceId
        );
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    const formatTimeStamp = (timestamp) => {
      return convertTimestampToDate(timestamp);
    };

    onMounted(fetchAcceptances);

    return {
      acceptances,
      loadingTable,
      viewAcceptanceDetails,
      updateAcceptance,
      handleDeleteAcceptance,
      formatTimeStamp,
      searchKeyword,
      searchAcceptances,
    };
  },
};
</script>
