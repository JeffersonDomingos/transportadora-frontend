import axios from 'axios';

const API_URL = 'https://transportadora-backend.onrender.com/cargo'; 

export interface Cargo {
  id: number;
  description: string;
  type: string;
}

export const getCargos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCargo = async (cargo: { description: string; type: string }) => {
  const response = await axios.post(API_URL, cargo);
  return response.data;
};

export const updateCargo = async (id: number, cargo: { description: string; type: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, cargo);
  return response.data;
};

export const deleteCargo = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
