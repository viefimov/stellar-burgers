import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../modal/modal';

export const ModalWithNavigation: React.FC<{
  title: string;
  children: ReactNode;
}> = ({ title, children }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <Modal title={title} onClose={handleClose}>
      {children}
    </Modal>
  );
};
