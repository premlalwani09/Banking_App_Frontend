import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Calendar, Download, FileText } from 'lucide-react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { StatementRequest, Transaction } from '../../types';
import { getBankStatement } from '../../api/accountService';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';

const StatementPage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StatementRequest>({
    defaultValues: {
      accountNumber: user?.accountNumber || '',
      startDate: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
    },
  });
  
  const onSubmit = async (data: StatementRequest) => {
    setIsLoading(true);
    try {
      // This would be replaced with real API call
      // const response = await getBankStatement(data);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock transactions
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          transactionType: 'DEBIT',
          accountNumber: data.accountNumber,
          amount: 250.00,
          narration: 'Online Subscription',
          transactionDate: '2025-05-10T14:30:00',
          status: 'SUCCESSFUL',
        },
        {
          id: '2',
          transactionType: 'CREDIT',
          accountNumber: data.accountNumber,
          amount: 3450.00,
          narration: 'Salary Payment',
          transactionDate: '2025-05-05T09:15:00',
          status: 'SUCCESSFUL',
        },
        {
          id: '3',
          transactionType: 'DEBIT',
          accountNumber: data.accountNumber,
          amount: 45.50,
          narration: 'Coffee Shop',
          transactionDate: '2025-05-02T11:20:00',
          status: 'SUCCESSFUL',
        },
        {
          id: '4',
          transactionType: 'DEBIT',
          accountNumber: data.accountNumber,
          amount: 180.00,
          narration: 'Grocery Shopping',
          transactionDate: '2025-04-30T16:45:00',
          status: 'SUCCESSFUL',
        },
      ];
      
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Statement error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate summary data
  const calculateSummary = () => {
    if (!transactions) return null;
    
    let totalCredit = 0;
    let totalDebit = 0;
    
    transactions.forEach(transaction => {
      if (transaction.transactionType === 'CREDIT') {
        totalCredit += transaction.amount;
      } else {
        totalDebit += transaction.amount;
      }
    });
    
    return {
      totalCredit,
      totalDebit,
      netAmount: totalCredit - totalDebit,
      transactionCount: transactions.length,
    };
  };
  
  const summaryData = calculateSummary();
  
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bank Statement</h1>
        <p className="text-gray-600 mt-1">View and download your account statements</p>
      </header>
      
      <Card className="mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Account Number"
              value={user?.accountNumber || ''}
              disabled
              {...register('accountNumber')}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  {...register('startDate', {
                    required: 'Start date is required',
                  })}
                  className={`
                    block pl-10 pr-4 py-2.5 w-full text-gray-900 bg-white rounded-lg border 
                    ${errors.startDate ? 'border-error-500' : 'border-gray-300'}
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                  `}
                />
              </div>
              {errors.startDate && (
                <p className="mt-1 text-sm text-error-500">{errors.startDate.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  {...register('endDate', {
                    required: 'End date is required',
                  })}
                  className={`
                    block pl-10 pr-4 py-2.5 w-full text-gray-900 bg-white rounded-lg border 
                    ${errors.endDate ? 'border-error-500' : 'border-gray-300'}
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                  `}
                />
              </div>
              {errors.endDate && (
                <p className="mt-1 text-sm text-error-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button type="submit" isLoading={isLoading} leftIcon={<FileText size={16} />}>
              Generate Statement
            </Button>
          </div>
        </form>
      </Card>
      
      {transactions && transactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Statement Summary</h2>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download size={16} />}
              >
                Download PDF
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Credits</p>
                <p className="text-xl font-semibold text-success-600">
                  {formatCurrency(summaryData?.totalCredit || 0)}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Debits</p>
                <p className="text-xl font-semibold text-error-600">
                  {formatCurrency(summaryData?.totalDebit || 0)}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Net Amount</p>
                <p className={`text-xl font-semibold ${(summaryData?.netAmount || 0) >= 0 ? 'text-success-600' : 'text-error-600'}`}>
                  {formatCurrency(summaryData?.netAmount || 0)}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Transactions</p>
                <p className="text-xl font-semibold text-gray-900">
                  {summaryData?.transactionCount || 0}
                </p>
              </div>
            </div>
          </Card>
          
          <Card>
            <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(transaction.transactionDate)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {transaction.narration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.transactionType === 'CREDIT' ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'}`}>
                          {transaction.transactionType}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium
                        ${transaction.transactionType === 'CREDIT' ? 'text-success-600' : 'text-error-600'}`}>
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.status === 'SUCCESSFUL' ? 'bg-success-100 text-success-800' : 
                           transaction.status === 'PENDING' ? 'bg-warning-100 text-warning-800' : 
                          'bg-error-100 text-error-800'}`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}
      
      {transactions && transactions.length === 0 && (
        <Card>
          <div className="py-10 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No transactions found</h3>
            <p className="mt-2 text-sm text-gray-500">
              There are no transactions for the selected date range.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default StatementPage;