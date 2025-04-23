import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download } from 'lucide-react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import TransactionItem from '../../components/transactions/TransactionItem';
import { Transaction } from '../../types';

// Mock data (would be fetched from API in real implementation)
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
  {
    id: '5',
    transactionType: 'CREDIT',
    accountNumber: '1234567890123456',
    amount: 200.00,
    narration: 'Refund - Online Store',
    transactionDate: '2025-04-28T10:20:00',
    status: 'SUCCESSFUL',
  },
  {
    id: '6',
    transactionType: 'DEBIT',
    accountNumber: '1234567890123456',
    amount: 120.00,
    narration: 'Electricity Bill',
    transactionDate: '2025-04-25T08:45:00',
    status: 'SUCCESSFUL',
  },
  {
    id: '7',
    transactionType: 'DEBIT',
    accountNumber: '1234567890123456',
    amount: 35.99,
    narration: 'Streaming Service',
    transactionDate: '2025-04-20T19:30:00',
    status: 'SUCCESSFUL',
  },
  {
    id: '8',
    transactionType: 'CREDIT',
    accountNumber: '1234567890123456',
    amount: 500.00,
    narration: 'Transfer from John',
    transactionDate: '2025-04-15T14:10:00',
    status: 'SUCCESSFUL',
  },
];

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    status: 'all',
  });
  
  // Filter transactions based on search term and filters
  const filteredTransactions = transactions.filter(transaction => {
    let matchesSearch = true;
    let matchesFilters = true;
    
    // Search filter
    if (searchTerm) {
      matchesSearch = transaction.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      transaction.accountNumber.includes(searchTerm);
    }
    
    // Transaction type filter
    if (filters.type !== 'all') {
      matchesFilters = matchesFilters && transaction.transactionType === filters.type;
    }
    
    // Status filter
    if (filters.status !== 'all') {
      matchesFilters = matchesFilters && transaction.status === filters.status;
    }
    
    // Date range filter
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      const transactionDate = new Date(transaction.transactionDate);
      matchesFilters = matchesFilters && transactionDate >= startDate;
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      const transactionDate = new Date(transaction.transactionDate);
      matchesFilters = matchesFilters && transactionDate <= endDate;
    }
    
    // Amount range filter
    if (filters.minAmount) {
      matchesFilters = matchesFilters && transaction.amount >= parseFloat(filters.minAmount);
    }
    
    if (filters.maxAmount) {
      matchesFilters = matchesFilters && transaction.amount <= parseFloat(filters.maxAmount);
    }
    
    return matchesSearch && matchesFilters;
  });
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      type: 'all',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: '',
      status: 'all',
    });
  };
  
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600 mt-1">View and manage your transaction history</p>
      </header>
      
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} className="text-gray-400" />}
            className="flex-1"
          />
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Filter size={16} />}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filter
            </Button>
            
            <Button
              variant="outline"
              size="md"
              leftIcon={<Download size={16} />}
            >
              Export
            </Button>
          </div>
        </div>
        
        {filterOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 border border-gray-200 rounded-lg"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Type
                </label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All</option>
                  <option value="CREDIT">Credit</option>
                  <option value="DEBIT">Debit</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Amount
                </label>
                <input
                  type="number"
                  name="minAmount"
                  value={filters.minAmount}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Amount
                </label>
                <input
                  type="number"
                  name="maxAmount"
                  value={filters.maxAmount}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All</option>
                  <option value="SUCCESSFUL">Successful</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={resetFilters} className="mr-2">
                Reset
              </Button>
              <Button onClick={() => setFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </motion.div>
        )}
        
        <div className="overflow-hidden bg-white">
          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map(transaction => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TransactionsPage;