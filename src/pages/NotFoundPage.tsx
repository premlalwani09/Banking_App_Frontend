import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="p-4 rounded-full bg-error-100 mb-6">
        <AlertTriangle size={48} className="text-error-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <Button>Return to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;