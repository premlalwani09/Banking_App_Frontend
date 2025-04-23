import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, DollarSign, MessageSquare, ArrowRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { TransferRequest } from '../../types';
import { transferMoney } from '../../api/accountService';
import { useAuth } from '../../contexts/AuthContext';

const TransferPage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TransferRequest>({
    defaultValues: {
      sourceAccountNumber: user?.accountNumber || '',
    },
  });
  
  const destinationAccount = watch('destinationAccountNumber');
  
  // Function to simulate fetching recipient name
  const fetchRecipientName = async (accountNumber: string) => {
    if (accountNumber && accountNumber.length >= 10) {
      // Mock API call - would be replaced with real nameEnquiry API call
      setTimeout(() => {
        setRecipientName('John Doe'); // Mock recipient name
      }, 500);
    } else {
      setRecipientName('');
    }
  };
  
  // Handle account number change
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    fetchRecipientName(value);
  };
  
  const onSubmit = async (data: TransferRequest) => {
    setIsLoading(true);
    try {
      // This would be replaced with real API call
      // const response = await transferMoney(data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success state
      setTransferComplete(true);
      reset();
      
      // Reset after 5 seconds
      setTimeout(() => {
        setTransferComplete(false);
      }, 5000);
    } catch (error) {
      console.error('Transfer error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Transfer Money</h1>
        <p className="text-gray-600 mt-1">Send money to other accounts securely</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            {transferComplete ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100">
                  <svg
                    className="h-8 w-8 text-success-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="mt-4 text-lg font-medium text-gray-900">Transfer Successful</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Your money has been transferred successfully.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setTransferComplete(false)}>
                    Make Another Transfer
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-lg font-semibold mb-6">Transfer Details</h2>
                
                <div className="space-y-4">
                  <Input
                    label="From Account"
                    value={user?.accountNumber || ''}
                    disabled
                    leftIcon={<User size={18} className="text-gray-400" />}
                  />
                  
                  <Input
                    label="To Account"
                    placeholder="Enter destination account number"
                    {...register('destinationAccountNumber', {
                      required: 'Destination account is required',
                      minLength: {
                        value: 10,
                        message: 'Please enter a valid account number',
                      },
                    })}
                    error={errors.destinationAccountNumber?.message}
                    leftIcon={<User size={18} className="text-gray-400" />}
                    onChange={handleAccountChange}
                  />
                  
                  {recipientName && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3 bg-gray-50 rounded-md text-sm"
                    >
                      Recipient: <span className="font-medium">{recipientName}</span>
                    </motion.div>
                  )}
                  
                  <Input
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    {...register('amount', {
                      required: 'Amount is required',
                      min: {
                        value: 1,
                        message: 'Amount must be greater than 0',
                      },
                    })}
                    error={errors.amount?.message}
                    leftIcon={<DollarSign size={18} className="text-gray-400" />}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MessageSquare size={18} className="text-gray-400" />
                      </div>
                      <textarea
                        {...register('narration', {
                          required: 'Description is required',
                        })}
                        className={`
                          block pl-10 pr-4 py-2.5 w-full text-gray-900 bg-white rounded-lg border 
                          ${errors.narration ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'}
                          focus:outline-none focus:ring-2 min-h-[100px]
                        `}
                        placeholder="What's this transfer for?"
                      ></textarea>
                    </div>
                    {errors.narration && (
                      <p className="mt-1 text-sm text-error-500">{errors.narration.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isLoading}
                    rightIcon={<ArrowRight size={16} />}
                  >
                    Transfer Money
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Transfer Tips</h2>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-md">
                <h3 className="text-sm font-medium text-blue-800">Security</h3>
                <p className="text-xs text-blue-700 mt-1">
                  Never share your account details or password with anyone.
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-md">
                <h3 className="text-sm font-medium text-yellow-800">Verify Details</h3>
                <p className="text-xs text-yellow-700 mt-1">
                  Always double-check the account number and amount before confirming a transfer.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-md">
                <h3 className="text-sm font-medium text-green-800">Limits</h3>
                <p className="text-xs text-green-700 mt-1">
                  Your daily transfer limit is $10,000. For larger transfers, please contact support.
                </p>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Frequent Transfers</h3>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 flex items-center rounded-md hover:bg-gray-50">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-700 font-medium">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jane Doe</p>
                    <p className="text-xs text-gray-500">xxxx-xxxx-1234</p>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 flex items-center rounded-md hover:bg-gray-50">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-700 font-medium">MS</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mike Smith</p>
                    <p className="text-xs text-gray-500">xxxx-xxxx-5678</p>
                  </div>
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransferPage;