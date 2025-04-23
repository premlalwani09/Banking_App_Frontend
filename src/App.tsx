import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import TransactionsPage from './pages/transactions/TransactionsPage';
import TransferPage from './pages/transfer/TransferPage';
import AccountsPage from './pages/accounts/AccountsPage';
import StatementPage from './pages/statement/StatementPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" />;
};

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      
      {/* Dashboard routes - protected */}
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="transfer" element={<TransferPage />} />
        <Route path="accounts" element={<AccountsPage />} />
        <Route path="statement" element={<StatementPage />} />
      </Route>
      
      {/* Not found page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;