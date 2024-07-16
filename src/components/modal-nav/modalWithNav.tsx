import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../modal/modal';

export const ModalWithNavigation: React.FC<{
  title: string;
  children: ReactNode;
}> = ({ title, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || location.state.background || '/';
  const handleClose = () => {
    navigate(from);
  };
  return (
    <Modal title={title} onClose={handleClose}>
      {children}
    </Modal>
  );
};
