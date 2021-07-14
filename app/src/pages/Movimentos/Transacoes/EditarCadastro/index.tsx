import React, { useRef, useCallback } from 'react';
import Modal from 'react-modal';
import { FiSave, FiX } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import { Header, Content, Container } from './styles';

import { Input } from '../../../../components/Input';
import { useToast } from '../../../../hooks/toast';

import api from '../../../../services/api';

import { CategoriaData } from '../../index';

interface NovoCadastroModalProps {
  categoria: CategoriaData;
  isOpen: boolean;
  onRequestClose: () => void;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const EditarCadastroModal: React.FC<NovoCadastroModalProps> = ({
  categoria,
  isOpen,
  onRequestClose,
}: NovoCadastroModalProps) => {
  const { addToast } = useToast();

  // pegar os dados de referencia ao inputs
  const formRef = useRef<FormHandles>(null);

  const handleSaveCadastro = useCallback(
    async ({ descricao }: CategoriaData) => {
      await api
        .put('categorias', { id: categoria.id, descricao })
        .catch((err) => {
          addToast({
            type: 'error',
            title: 'Erro salvar cadastro',
            description: err.response.data.message,
          });
        });

      onRequestClose();
    },
    [onRequestClose, addToast, categoria]
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <Form
          ref={formRef}
          onSubmit={handleSaveCadastro}
          initialData={{ descricao: categoria.descricao }}
        >
          <Header>
            <h1>Cadastro de categorias</h1>
            <div>
              <button
                type="button"
                className="cancelar"
                onClick={onRequestClose}
              >
                <FiX />
                Cancelar
              </button>
              <button type="submit" className="salvar">
                <FiSave />
                Salvar
              </button>
            </div>
          </Header>
          <Container>
            <Content>
              <div>
                <strong>Descrição</strong>
                <Input name="descricao" />
              </div>
            </Content>
          </Container>
        </Form>
      </Modal>
    </>
  );
};
