import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}

interface Wallet {
  id: number;
  user_id: number;
  currency_type: string;
  balance: number;
}

interface Trade {
  id: number;
  user_id: number;
  trade_type: 'buy' | 'sell';
  amount: number;
  rate: number;
  status: 'open' | 'completed' | 'cancelled';
}

interface Rate {
  id: number;
  currency_pair: string;
  rate: number;
}

export const login = (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
  return api.post('/users/login', { email, password });
};

export const register = (username: string, email: string, password: string): Promise<AxiosResponse<RegisterResponse>> => {
  return api.post('/users', { username, email, password });
};

export const getWallets = (): Promise<AxiosResponse<Wallet[]>> => {
  return api.get('/wallets');
};

export const createTrade = (tradeType: 'buy' | 'sell', amount: number, rate: number): Promise<AxiosResponse<Trade>> => {
  return api.post('/trades', { trade_type: tradeType, amount, rate });
};

export const getRates = (): Promise<AxiosResponse<Rate[]>> => {
  return api.get('/rates');
};

export default api;