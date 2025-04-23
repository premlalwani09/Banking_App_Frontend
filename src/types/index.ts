// User related types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
}

export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  alternativePhoneNumber?: string;
  address: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

// Bank response and request types
export interface BankResponse {
  responseCode: string;
  responseMessage: string;
  accountInfo?: AccountInfo;
  data?: any;
}

export interface AccountInfo {
  accountNumber: string;
  accountName: string;
  accountBalance: number;
}

export interface EnquiryRequest {
  accountNumber: string;
}

export interface CreditDebitRequest {
  accountNumber: string;
  amount: number;
}

export interface TransferRequest {
  sourceAccountNumber: string;
  destinationAccountNumber: string;
  amount: number;
  narration: string;
}

// Transaction related types
export interface Transaction {
  id: string;
  transactionType: 'CREDIT' | 'DEBIT';
  accountNumber: string;
  amount: number;
  narration: string;
  transactionDate: string;
  status: 'SUCCESSFUL' | 'PENDING' | 'FAILED';
}

export interface StatementRequest {
  accountNumber: string;
  startDate: string;
  endDate: string;
}

// Card types for UI
export interface AccountCard {
  id: string;
  accountNumber: string;
  accountName: string;
  balance: number;
  currency: string;
  currencySymbol: string;
  color: string;
}