// api.js
import axios from "axios";

const apiUrl = "https://64f0e8678a8b66ecf77a3df9.mockapi.io/api/list_contract/";

export const getAllContracts = () => {
  return axios.get(`${apiUrl}/contract`);
};

export const getContract = () => {
  return axios.get(`${apiUrl}/contract/${contractId}`);
};

export const createContract = (contract) => {
  return axios.post(`${apiUrl}/contract`, contract);
};

export const updateContract = (contract) => {
  const contractId = contract.id;
  return axios.put(`${apiUrl}/users/${contractId}`, contract);
};

export const deleteContract = (contractId) => {
  return axios.delete(`${apiUrl}/contract/${contractId}`);
};

export const getAllAcceptances = () => {
  return axios.get(`${apiUrl}/acceptance`);
};

export const getAcceptance = () => {
  return axios.get(`${apiUrl}/acceptance/${acceptanceId}`);
};

export const createAcceptance = (acceptance) => {
  return axios.post(`${apiUrl}/acceptance`, acceptance);
};

export const updateAcceptance = (acceptance) => {
  const acceptanceId = acceptance.id;
  return axios.put(`${apiUrl}/users/${acceptanceId}`, acceptance);
};

export const deleteAcceptance = (acceptanceId) => {
  return axios.delete(`${apiUrl}/acceptance/${acceptanceId}`);
};
