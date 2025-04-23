import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import AccountCard from '../../components/common/AccountCard';
import { AccountCard as AccountCardType, Transaction } from '../../types';
import TransactionItem from '../../components/transactions/TransactionItem';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Mock data
const mockAccounts: AccountCardType[] = [
  {
    id: '1',
    accountNumber: '1234567890123456',
    accountName: 'John Doe',
    balance: 5434.34,
    currency: 'USD',
    currencySymbol: '$',
    color: 'bg-gradient-to-r from-blue-600 to-blue-400',
  },
  {
    id: '2',
    accountNumber: '2345678901234567',
    accountName: 'John Doe',
    balance: 3435.34,
    currency: 'EUR',
    currencySymbol: '€',
    color: 'bg-gradient-to-r from-green-600 to-green-400',
  },
  {
    id: '3',
    accountNumber: '3456789012345678',
    accountName: 'John Doe',
    balance: 235.65,
    currency: 'GBP',
    currencySymbol: '£',
    color: 'bg-gradient-to-r from-purple-600 to-purple-400',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    transactionType: 'DEBIT',
    accountNumber: '1234567890123456',
    amount: 250.00,
    narration: 'Online Subscription',
    transactionDate: '2025-05-10T14:30:00',
    status: 'SUCCESSFUL',
  },
  {
    id: '2',
    transactionType: 'CREDIT',
    accountNumber: '1234567890123456',
    amount: 3450.00,
    narration: 'Salary Payment',
    transactionDate: '2025-05-05T09:15:00',
    status: 'SUCCESSFUL',
  },
  {
    id: '3',
    transactionType: 'DEBIT',
    accountNumber: '1234567890123456',
    amount: 45.50,
    narration: 'Coffee Shop',
    transactionDate: '2025-05-02T11:20:00',
    status: 'SUCCESSFUL',
  },
  {
    id: '4',
    transactionType: 'DEBIT',
    accountNumber: '1234567890123456',
    amount: 180.00,
    narration: 'Grocery Shopping',
    transactionDate: '2025-04-30T16:45:00',
    status: 'PENDING',
  },
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeAccount, setActiveAccount] = useState<string>(mockAccounts[0].id);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  
  const selectedAccount = mockAccounts.find(account => account.id === activeAccount);
  
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName || 'User'}</h1>
        <p className="text-gray-600 mt-1">Here's your financial overview</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <h2 className="text-lg font-semibold mb-4">Your Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockAccounts.map(account => (
                <AccountCard
                  key={account.id}
                  account={account}
                  isActive={account.id === activeAccount}
                  onClick={() => setActiveAccount(account.id)}
                />
              ))}
            </div>
            
            {selectedAccount && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gray-50 rounded-lg"
              >
                <h3 className="text-sm font-medium text-gray-500 mb-2">Account Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Account Number</p>
                    <p className="font-medium">XXXX-XXXX-{selectedAccount.accountNumber.slice(-4)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Account Type</p>
                    <p className="font-medium">Checking Account</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Currency</p>
                    <p className="font-medium">{selectedAccount.currency}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </div>
        
        <Card className="h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          
          <div className="space-y-3">
            <Link to="/transfer">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-3 bg-primary-50 rounded-lg cursor-pointer"
              >
                <div className="p-2 bg-primary-100 rounded-full mr-3">
                  <ArrowUpRight className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-700">Transfer Money</h3>
                  <p className="text-xs text-primary-600">Send money to accounts</p>
                </div>
              </motion.div>
            </Link>
            
            <Link to="/accounts">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-3 bg-success-50 rounded-lg cursor-pointer"
              >
                <div className="p-2 bg-success-100 rounded-full mr-3">
                  <ArrowDownLeft className="h-5 w-5 text-success-600" />
                </div>
                <div>
                  <h3 className="font-medium text-success-700">Deposit</h3>
                  <p className="text-xs text-success-600">Add money to your account</p>
                </div>
              </motion.div>
            </Link>
            
            <Link to="/statement">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-3 bg-accent-50 rounded-lg cursor-pointer"
              >
                <div className="p-2 bg-accent-100 rounded-full mr-3">
                  <TrendingUp className="h-5 w-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-medium text-accent-700">Statements</h3>
                  <p className="text-xs text-accent-600">View and download statements</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <Link 
                to="/transactions" 
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="overflow-hidden">
              {transactions.length > 0 ? (
                <div>
                  {transactions.map(transaction => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p>No recent transactions</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <Card>
          <h2 className="text-lg font-semibold mb-4">Your Spending</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">Monthly Budget</h3>
                <span className="text-sm text-gray-500">75% used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">Savings Goal</h3>
                <span className="text-sm text-gray-500">45% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-success-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Top Spending Categories</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                  <span className="text-sm">Shopping</span>
                </div>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                  <span className="text-sm">Dining</span>
                </div>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-warning-500 mr-2"></div>
                  <span className="text-sm">Transport</span>
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-error-500 mr-2"></div>
                  <span className="text-sm">Utilities</span>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;