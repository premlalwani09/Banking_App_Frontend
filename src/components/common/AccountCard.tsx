import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { AccountCard as AccountCardType } from '../../types';

interface AccountCardProps {
  account: AccountCardType;
  onClick?: () => void;
  isActive?: boolean;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onClick, isActive = false }) => {
  const { accountNumber, balance, currency, currencySymbol, color } = account;
  
  // Format account number to show only last 4 digits
  const formatAccountNumber = (acctNum: string) => {
    const last4 = acctNum.slice(-4);
    return `xxxx-xxxx-xxxx-${last4}`;
  };
  
  // Format balance with commas
  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-xl p-5 cursor-pointer
        ${isActive ? 'ring-2 ring-primary-500' : ''}
        ${color || 'bg-gradient-to-r from-primary-600 to-primary-400'}
      `}
      onClick={onClick}
    >
      {/* Card content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-white/80 text-sm mb-1">{formatAccountNumber(accountNumber)}</p>
            <h3 className="text-white text-2xl font-bold flex items-baseline">
              <span className="mr-1">{currencySymbol}</span>
              <span>{formatBalance(balance)}</span>
            </h3>
            <p className="text-white/90 text-sm mt-1">{currency}</p>
          </div>
          <ChevronRight className="text-white/70" />
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 transform -translate-x-1/2 translate-y-1/3"></div>
    </motion.div>
  );
};

export default AccountCard;