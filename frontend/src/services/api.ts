import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8080/api"; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
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

export interface User {
  userId: number;
  username: string;
  email: string;
}

export interface Transaction {
  transactionId: number;
  wallet: Wallet;
  transactionType: "DEPOSIT" | "WITHDRAWAL";
  amount: number;
  balanceAfter: number;
  date: string;
}

export interface Wallet {
  walletId: number;
  user: User;
  currencyType: string;
  balance: number;
  localCurrencyName: string;
}

interface Trade {
  tradeType: "BUY" | "SELL";
  amount: number;
  rate: number;
  localCurrencyName: string;
}

interface Rate {
  id: number;
  currency_pair: string;
  rate: number;
}

export const login = (
  email: string,
  password: string
): Promise<AxiosResponse<User>> => {
  return api.post("/auth/login", { email, password });
};

export const register = (
  username: string,
  email: string,
  password: string
): Promise<AxiosResponse<RegisterResponse>> => {
  return api.post("/users", { username, email, password });
};

export const getUser = (user_id: number): Promise<AxiosResponse<User>> => {
  return api.get(`/users/${user_id}`);
};

export const updateUser = (
  user_id: number,
  user: User
): Promise<AxiosResponse<User>> => {
  return api.put(`/users/${user_id}`, user);
};

export const withdrawal = (user_id: number): Promise<AxiosResponse<void>> => {
  return api.delete(`/users/${user_id}`);
};

export const getCashTransactions = (
  wallet_id: number
): Promise<AxiosResponse<Transaction[]>> => {
  return api.get(`/wallets/${wallet_id}/transactions`);
};

export const cashDeposit = (
  wallet_id: number,
  amount: number
): Promise<AxiosResponse<void>> => {
  return api.post(`/wallets/${wallet_id}/deposit?amount=${amount}`);
};

export const cashWithdrawal = (
  wallet_id: number,
  amount: number
): Promise<AxiosResponse<void>> => {
  return api.post(`/wallets/${wallet_id}/withdraw?amount=${amount}`);
};

export const getWallets = (
  userId: number
): Promise<AxiosResponse<Wallet[]>> => {
  return api.get(`/wallets?userId=${userId}`);
};

export const createTrade = (
  userId: number,
  tradeType: "BUY" | "SELL",
  amount: number,
  rate: number,
  localCurrencyName: string
): Promise<AxiosResponse<Trade>> => {
  return api.post(`/trades?userId=${userId}`, {
    tradeType: tradeType,
    amount,
    rate,
    localCurrencyName,
  });
};

export default api;
