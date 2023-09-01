<template>
  <div>
    <h1>AcceptanceList List</h1>
    <AcceptanceList :acceptances="acceptances" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAllAcceptances } from "../../api";
import AcceptanceList from "../../components/AcceptanceList.vue";

export default {
  components: {
    AcceptanceList,
  },
  setup() {
    const acceptances = ref([]);

    const fetchAcceptances = async () => {
      try {
        const response = await getAllAcceptances();
        console.log("respond data", response);
        acceptances.value = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    onMounted(fetchAcceptances);

    return { acceptances };
  },
};
</script>
