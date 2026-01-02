import React from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    loading: <Loader size={20} className="spinning" />,
  };

  return (
    <div className={`toast toast-${type}`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
