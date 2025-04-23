import api from './api';
import { LoginDTO, UserRequest, BankResponse } from '../types';

export const login = async (credentials: LoginDTO): Promise<BankResponse> => {
  const response = await api.post('/api/user/login', credentials);
  return response.data;
};

export const register = async (userRequest: UserRequest): Promise<BankResponse> => {
  const response = await api.post('/api/user', userRequest);
  return response.data;
};

export const verifyToken = async (): Promise<boolean> => {
  try {
    // This endpoint would validate the token is still valid
    // You would need to implement this on your backend
    await api.get('/api/user/validate-token');
    return true;
  } catch (error) {
    return false;
  }
};