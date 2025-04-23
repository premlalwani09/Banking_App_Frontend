import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginDTO, UserRequest, BankResponse } from '../types';
import { login as loginApi, register as registerApi, verifyToken } from '../api/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginDTO) => Promise<BankResponse>;
  register: (data: UserRequest) => Promise<BankResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (storedUser && token) {
        try {
          // Verify the token is still valid
          const isValid = await verifyToken();
          
          if (isValid) {
            setUser(JSON.parse(storedUser));
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);
  
  const login = async (credentials: LoginDTO): Promise<BankResponse> => {
    setLoading(true);
    try {
      const response = await loginApi(credentials);
      
      if (response.responseCode === '00' && response.accountInfo) {
        // Create a user object from the response
        const loggedInUser: User = {
          id: response.accountInfo.accountNumber,
          firstName: response.accountInfo.accountName.split(' ')[0],
          lastName: response.accountInfo.accountName.split(' ')[1] || '',
          email: credentials.email,
          accountNumber: response.accountInfo.accountNumber
        };
        
        // Save to local storage
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        // Assuming the token comes in the response, adjust as needed
        localStorage.setItem('token', response.data?.token || 'mock-token');
        
        setUser(loggedInUser);
      }
      
      return response;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (userData: UserRequest): Promise<BankResponse> => {
    setLoading(true);
    try {
      const response = await registerApi(userData);
      return response;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};