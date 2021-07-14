import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToasContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(mensagens: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messagens, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((oldMessagens) => [...oldMessagens, toast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setMessages((oldMessages) =>
      oldMessages.filter((mensagem) => mensagem.id !== id)
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer mensagens={messagens} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      'Só é permitido usar o useToast um contexto dentro de um provider!'
    );
  }
  return context;
}

export { ToastProvider, useToast };
