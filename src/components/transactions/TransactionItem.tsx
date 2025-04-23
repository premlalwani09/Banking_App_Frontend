import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { Transaction } from '../../types';
import { format } from 'date-fns';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { transactionType, amount, narration, transactionDate, status } = transaction;
  
  const isCredit = transactionType === 'CREDIT';
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'SUCCESSFUL':
        return isCredit 
          ? <ArrowDownLeft className="w-5 h-5 text-success-500" /> 
          : <ArrowUpRight className="w-5 h-5 text-error-500" />;
      case 'PENDING':
        return <Clock className="w-5 h-5 text-warning-500" />;
      case 'FAILED':
        return <div className="w-5 h-5 text-error-500">×</div>;
      default:
        return null;
    }
  };
  
  const getStatusClass = () => {
    switch (status) {
      case 'SUCCESSFUL':
        return isCredit ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800';
      case 'PENDING':
        return 'bg-warning-100 text-warning-800';
      case 'FAILED':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <div className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-100">
      <div className="flex-shrink-0 p-2 rounded-full bg-gray-100">
        {getStatusIcon()}
      </div>
      
      <div className="ml-4 flex-1">
        <h4 className="text-sm font-medium text-gray-900">{narration}</h4>
        <p className="text-xs text-gray-500">{formatDate(transactionDate)}</p>
      </div>
      
      <div className="flex flex-col items-end">
        <span className={`font-medium ${isCredit ? 'text-success-600' : 'text-error-600'}`}>
          {isCredit ? '+' : '-'} {formatAmount(amount)}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 ${getStatusClass()}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default TransactionItem;