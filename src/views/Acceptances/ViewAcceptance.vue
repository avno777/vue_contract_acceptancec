<template>
  <div>
    <h1>AcceptanceList List</h1>
    <input
      v-model="searchKeyword"
      placeholder="Search by keyword"
      @input="searchAcceptances"
    />
    <RouterLink to="/acceptances/new">Create New Acceptance</RouterLink>

    <table border="{1}">
      <thead>
        <tr>
          <th>ID</th>
          <th>Contract</th>
          <th>Acceptance Name</th>
          <th>Acceptance Amount</th>
          <th>Volume</th>
          <th>Status</th>
          <th>Acceptance Date</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loadingTable">
          <td colspan="9">Loading</td>
        </tr>
        <tr v-else v-for="acceptance in acceptances" :key="acceptance.id">
          <td>{{ acceptance.id }}</td>
          <td>{{ acceptance.contract_id }}</td>
          <td>{{ acceptance.acceptance_name }}</td>
          <td>{{ acceptance.acceptance_amount }}</td>
          <td>{{ acceptance.volume }}</td>
          <td>{{ acceptance.status }}</td>
          <td>{{ formatTimeStamp(acceptance.acceptance_date) }}</td>
          <td>{{ acceptance.description }}</td>
          <td>
            <button @click="viewAcceptanceDetails(acceptance)">View</button>
            <button @click="updateAcceptance(acceptance)">Edit</button>
            <button @click="handleDeleteAcceptance(acceptance.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <AcceptanceList :acceptances="acceptances" /> -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
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
        const response = await getAllAcceptances();
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
