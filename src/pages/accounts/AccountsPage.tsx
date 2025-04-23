import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, PiggyBank, CreditCard, Clock, DollarSign } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import AccountCard from '../../components/common/AccountCard';
import { AccountCard as AccountCardType } from '../../types';
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

const AccountsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedAccount, setSelectedAccount] = useState<string>(mockAccounts[0].id);
  
  const activeAccount = mockAccounts.find(acc => acc.id === selectedAccount);
  
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Accounts</h1>
        <p className="text-gray-600 mt-1">Manage your bank accounts and cards</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {mockAccounts.map(account => (
          <div key={account.id} onClick={() => setSelectedAccount(account.id)}>
            <AccountCard 
              account={account}
              isActive={account.id === selectedAccount}
            />
          </div>
        ))}
        
        <motion.div
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-xl p-5 cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
        >
          <Plus size={32} className="mb-2" />
          <p className="text-sm font-medium">Add New Account</p>
        </motion.div>
      </div>
      
      {activeAccount && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-lg font-semibold mb-6">Account Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account Name</p>
                  <p className="font-medium">{activeAccount.accountName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account Number</p>
                  <p className="font-medium">XXXX-XXXX-{activeAccount.accountNumber.slice(-4)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Account Type</p>
                  <p className="font-medium">Checking Account</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Currency</p>
                  <p className="font-medium">{activeAccount.currency}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current Balance</p>
                  <p className="font-medium text-xl text-primary-700">
                    {activeAccount.currencySymbol}{activeAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Available Balance</p>
                  <p className="font-medium text-xl text-success-600">
                    {activeAccount.currencySymbol}{activeAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <Button leftIcon={<DollarSign size={16} />}>Deposit</Button>
                <Button 
                  variant="outline" 
                  leftIcon={<Clock size={16} />}>
                  Standing Orders
                </Button>
                <Button 
                  variant="outline" 
                  leftIcon={<PiggyBank size={16} />}>
                  Savings Goals
                </Button>
              </div>
            </Card>
          </div>
          
          <Card>
            <h2 className="text-lg font-semibold mb-4">Cards</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/5 transform -translate-x-1/2 translate-y-1/3"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <CreditCard size={24} />
                    <p className="text-xs font-medium">VIRTUAL CARD</p>
                  </div>
                  
                  <p className="text-base mb-1 tracking-widest">
                    **** **** **** {activeAccount.accountNumber.slice(-4)}
                  </p>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <p className="text-xs mb-1 opacity-80">CARD HOLDER</p>
                      <p className="text-sm">{activeAccount.accountName}</p>
                    </div>
                    <div>
                      <p className="text-xs mb-1 opacity-80">EXPIRES</p>
                      <p className="text-sm">12/28</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <button className="w-full py-2 text-sm text-center rounded-md border border-gray-300 hover:bg-gray-50">
                  View Card Details
                </button>
                <button className="w-full py-2 text-sm text-center rounded-md border border-gray-300 hover:bg-gray-50">
                  Freeze Card
                </button>
                <button className="w-full py-2 text-sm text-center rounded-md border border-gray-300 hover:bg-gray-50">
                  Report Lost/Stolen
                </button>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center py-2 text-sm text-primary-600 font-medium rounded-md hover:bg-primary-50">
                  <Plus size={16} className="mr-2" />
                  Order New Card
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      <Card>
        <h2 className="text-lg font-semibold mb-6">Account Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-blue-100 mr-3">
                <CreditCard size={18} className="text-blue-600" />
              </div>
              <h3 className="font-medium">Spending Categories</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your top spending category this month is <span className="font-medium">Shopping</span> at 42%.
            </p>
          </div>
          
          <div className="p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-green-100 mr-3">
                <TrendingUp size={18} className="text-green-600" />
              </div>
              <h3 className="font-medium">Savings Growth</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your savings have increased by <span className="font-medium text-success-600">12%</span> this month.
            </p>
          </div>
          
          <div className="p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-purple-100 mr-3">
                <Clock size={18} className="text-purple-600" />
              </div>
              <h3 className="font-medium">Recurring Payments</h3>
            </div>
            <p className="text-sm text-gray-600">
              You have <span className="font-medium">3</span> upcoming recurring payments this month.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountsPage;