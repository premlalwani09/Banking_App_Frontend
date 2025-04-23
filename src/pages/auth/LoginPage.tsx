import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { LoginDTO } from '../../types';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDTO>();
  
  const onSubmit = async (data: LoginDTO) => {
    try {
      setServerError(null);
      const response = await login(data);
      
      if (response.responseCode === '00') {
        navigate('/');
      } else {
        setServerError(response.responseMessage || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setServerError('An error occurred. Please try again later.');
    }
  };
  
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-center mb-6">Sign In to Your Account</h3>
      
      {serverError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {serverError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          leftIcon={<Mail size={18} className="text-gray-400" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          autoComplete="email"
        />
        
        <Input
          label="Password"
          type="password"
          leftIcon={<Lock size={18} className="text-gray-400" />}
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          autoComplete="current-password"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          className="mt-4"
        >
          Sign In
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;