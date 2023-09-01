<template>
  <table>
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
      <tr v-for="acceptance in acceptances" :key="acceptance.id">
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
          <button @click="handleDeleteAcceptance(acceptance.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { formatTimestampToDate } from "../api/common";
import { deleteAcceptance } from "../api";

export default {
  props: {
    acceptances: Array,
  },
  setup(props, { emit }) {
    const acceptances = ref(props.acceptances);
    const router = useRouter();

    const viewAcceptanceDetails = (acceptance) => {
      router.push({ name: "detail contract", params: { id: acceptance.id } });
    };

    const updateAcceptance = (acceptance) => {
      router.push({ name: "update contract", params: { id: acceptance.id } });
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
      return formatTimestampToDate(timestamp);
    };

    watch(
      () => props.acceptances,
      (newAcceptances) => {
        acceptances.value = newAcceptances;
      }
    );

    return {
      acceptances,
      viewAcceptanceDetails,
      updateAcceptance,
      handleDeleteAcceptance,
      formatTimeStamp,
    };
  },
};
</script>
