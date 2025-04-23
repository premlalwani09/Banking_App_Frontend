import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, User, Phone, MapPin, Lock } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { UserRequest } from '../../types';

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UserRequest>();
  
  const password = watch('password', '');
  
  const onSubmit = async (data: UserRequest) => {
    try {
      setServerError(null);
      const response = await registerUser(data);
      
      if (response.responseCode === '00') {
        // Redirect to login page with success message
        navigate('/auth/login', { 
          state: { 
            message: 'Account created successfully! Please login with your credentials.',
            type: 'success'
          } 
        });
      } else {
        setServerError(response.responseMessage || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setServerError('An error occurred. Please try again later.');
    }
  };
  
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-center mb-6">Create a New Account</h3>
      
      {serverError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {serverError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            leftIcon={<User size={18} className="text-gray-400" />}
            error={errors.firstName?.message}
            {...register('firstName', {
              required: 'First name is required',
            })}
          />
          
          <Input
            label="Last Name"
            leftIcon={<User size={18} className="text-gray-400" />}
            error={errors.lastName?.message}
            {...register('lastName', {
              required: 'Last name is required',
            })}
          />
        </div>
        
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
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            leftIcon={<Phone size={18} className="text-gray-400" />}
            error={errors.phoneNumber?.message}
            {...register('phoneNumber', {
              required: 'Phone number is required',
            })}
          />
          
          <Input
            label="Alternative Phone (Optional)"
            type="tel"
            leftIcon={<Phone size={18} className="text-gray-400" />}
            error={errors.alternativePhoneNumber?.message}
            {...register('alternativePhoneNumber')}
          />
        </div>
        
        <Input
          label="Address"
          leftIcon={<MapPin size={18} className="text-gray-400" />}
          error={errors.address?.message}
          {...register('address', {
            required: 'Address is required',
          })}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Password"
            type="password"
            leftIcon={<Lock size={18} className="text-gray-400" />}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          
          <Input
            label="Confirm Password"
            type="password"
            leftIcon={<Lock size={18} className="text-gray-400" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              validate: value => 
                value === password || 'The passwords do not match',
            })}
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{' '}
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Privacy Policy
            </a>
          </label>
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          className="mt-4"
        >
          Create Account
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;