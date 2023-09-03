import axios from "axios";

const baseURL =
  "https://64f0e8678a8b66ecf77a3df9.mockapi.io/api/list_contract/";

const axiosInstance = axios.create({
  baseURL,
});

export const getAllContracts = async () => {
  try {
    const response = await axiosInstance.get("/contract");
    console.log("contracts data api", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Contracts:", error);
    throw error;
  }
};

export const createContract = async (contractData) => {
  try {
    const {
      contract_number,
      contract_name,
      sign_date,
      contract_value,
      customer_id,
      status,
      description,
    } = contractData;
    const response = await axiosInstance.post("/contract", contractData);
    return response;
  } catch (error) {
    console.error("Error creating Contract:", error);
    throw error;
  }
};

export const updateContract = async (contractId, contractData) => {
  try {
    const { id } = contractId;
    const {
      contract_number,
      contract_name,
      sign_date,
      contract_value,
      customer_id,
      status,
      description,
    } = contractData;
    const response = await axiosInstance.put(
      `/contract/${contractId}`,
      contractData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Contract:", error);
    throw error;
  }
};

export const deleteContract = async (contractId) => {
  try {
    await axiosInstance.delete(`/contract/${contractId}`);
  } catch (error) {
    console.error("Error deleting Contract:", error);
    throw error;
  }
};

export const getContract = async (contractId) => {
  try {
    const response = await axiosInstance.get(`/contract/${contractId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Contract by ID:", error);
    throw error;
  }
};

export const getAllAcceptances = async () => {
  try {
    const response = await axiosInstance.get("/acceptance/");
    return response.data;
  } catch (error) {
    console.error("Error fetching Acceptances:", error);
    throw error;
  }
};

export const createAcceptance = async (acceptanceData) => {
  try {
    const {
      contract_id,
      acceptance_name,
      acceptance_amount,
      volume,
      status,
      acceptance_date,
      description,
    } = acceptanceData;
    const response = await axiosInstance.post("/acceptance", acceptanceData);
    return response.data;
  } catch (error) {
    console.error("Error creating Acceptance:", error);
    throw error;
  }
};

export const updateAcceptance = async (acceptanceId, acceptanceData) => {
  try {
    const { id } = acceptanceId;
    const {
      contract_id,
      acceptance_name,
      acceptance_amount,
      volume,
      status,
      acceptance_date,
      description,
    } = acceptanceData;
    const response = await axiosInstance.put(
      `/acceptance/${acceptanceId}`,
      acceptanceData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Acceptance:", error);
    throw error;
  }
};

export const deleteAcceptance = async (acceptanceId) => {
  try {
    await axiosInstance.delete(`/acceptance/${acceptanceId}`);
  } catch (error) {
    console.error("Error deleting Acceptance:", error);
    throw error;
  }
};

export const getAcceptance = async (acceptanceId) => {
  try {
    const response = await axiosInstance.get(`/acceptance/${acceptanceId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Acceptance by ID:", error);
    throw error;
  }
};
