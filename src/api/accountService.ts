import api from './api';
import { EnquiryRequest, CreditDebitRequest, TransferRequest, BankResponse, StatementRequest, Transaction } from '../types';

export const getBalance = async (request: EnquiryRequest): Promise<BankResponse> => {
  const response = await api.get('/api/user/balanceEnquiry', { data: request });
  return response.data;
};

export const getAccountName = async (request: EnquiryRequest): Promise<string> => {
  const response = await api.get('/api/user/nameEnquiry', { data: request });
  return response.data;
};

export const creditAccount = async (request: CreditDebitRequest): Promise<BankResponse> => {
  const response = await api.post('/api/user/credit', request);
  return response.data;
};

export const debitAccount = async (request: CreditDebitRequest): Promise<BankResponse> => {
  const response = await api.post('/api/user/debit', request);
  return response.data;
};

export const transferMoney = async (request: TransferRequest): Promise<BankResponse> => {
  const response = await api.post('/api/user/transfer', request);
  return response.data;
};

export const getBankStatement = async (request: StatementRequest): Promise<Transaction[]> => {
  const { accountNumber, startDate, endDate } = request;
  const response = await api.get(`/bankStatement?accountNumber=${accountNumber}&startDate=${startDate}&endDate=${endDate}`);
  return response.data;
};