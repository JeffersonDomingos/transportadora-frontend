// src/services/dashboardService.ts
import axios from 'axios';

const API_URL = 'https://transportadora-backend.onrender.com';

export const getDeliveriesCount = async (): Promise<number> => {
  const response = await axios.get(`${API_URL}/deliveries/count`);
  return response.data.count;
};

export const getDriversCount = async (): Promise<number> => {
  const response = await axios.get(`${API_URL}/drivers/count`);
  return response.data.count;
};

export const getTrucksCount = async (): Promise<number> => {
  const response = await axios.get(`${API_URL}/trucks/count`);
  return response.data.count;
};

export const getTotalDeliveriesValue = async (): Promise<number> => {
    const response = await axios.get(`${API_URL}/deliveries/total-value`);
    return response.data.totalValue;
  };

