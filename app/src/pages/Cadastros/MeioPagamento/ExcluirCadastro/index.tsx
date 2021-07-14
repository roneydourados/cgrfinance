import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { FiSave, FiX } from 'react-icons/fi';
import { Header, Container } from './styles';

import api from '../../../../services/api';

import { useToast } from '../../../../hooks/toast';

interface ExcluirCadastroModalProps {
  id: string;
  nome: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const ExcluirCadastroModal: React.FC<ExcluirCadastroModalProps> = ({
  id,
  nome,
  isOpen,
  onRequestClose,
}: ExcluirCadastroModalProps) => {
  const { addToast } = useToast();

  const handleExcluirCadastro = useCallback(async () => {
    await api
      .delete('formaspagamento', {
        params: {
          id,
        },
      })
      .catch((err) => {
        addToast({
          type: 'error',
          title: 'Erro salvar cadastro',
          description: err.response.data.message,
        });
      });

    onRequestClose();
  }, [id, onRequestClose, addToast]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content-del"
        shouldCloseOnOverlayClick={false}
      >
        <Header>
          <h1>Confirma exclusão de cadastro de: </h1>
          <div>
            <button type="button" className="cancelar" onClick={onRequestClose}>
              <FiX />
              Cancela
            </button>
            <button
              type="submit"
              className="salvar"
              onClick={handleExcluirCadastro}
            >
              <FiSave />
              Confirma
            </button>
          </div>
        </Header>
        <Container>
          <div>
            <h1>{nome}</h1>
          </div>
        </Container>
      </Modal>
    </>
  );
};
