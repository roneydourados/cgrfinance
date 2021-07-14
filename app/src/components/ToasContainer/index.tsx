import React from 'react';
// cimport { useTransition } from 'react-spring';

import Toast from './Toast';

import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  mensagens: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ mensagens }) => {
  /* const messageWithTransitions = useTransition(
    mensagens,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
  ); */

  return (
    <Container>
      {mensagens.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
