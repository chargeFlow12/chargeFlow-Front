import { createPortal } from 'react-dom';

export const ModalPortal = ({ children }: any) => {
  const element = document.getElementById('modal');
  return element && createPortal(children, element);
};
