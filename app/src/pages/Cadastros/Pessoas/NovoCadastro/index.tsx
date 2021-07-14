import React, { useRef, useCallback, useState, ChangeEvent } from 'react';
import Modal from 'react-modal';
import { FiSave, FiX } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import { Header, Content, Container } from './styles';

import { Input } from '../../../../components/Input';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';

interface NovoCadastroModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface NovoCadastroFormData {
  nome: string;
  razao_social: string;
  cpf_cnpj: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  telefone_fixo: string;
  celular: string;
  email: string;
  observacao: string;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const NovoCadastroModal: React.FC<NovoCadastroModalProps> = ({
  isOpen,
  onRequestClose,
}: NovoCadastroModalProps) => {
  const { addToast } = useToast();
  const [tipoPessoa, setTipoPessoa] = useState('F');
  const [tipoCadastro, setTipoCadastro] = useState('A');

  // pegar os dados de referencia ao inputs
  const formRef = useRef<FormHandles>(null);

  const handleTipoPessoa = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.options.selectedIndex === 0) {
      setTipoPessoa('F');
      return;
    }
    setTipoPessoa('J');
  }, []);

  const handleTipoCadastro = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.options.selectedIndex === 0) {
        setTipoCadastro('A');
      }

      if (e.target.options.selectedIndex === 1) {
        setTipoCadastro('C');
      }

      if (e.target.options.selectedIndex === 2) {
        setTipoCadastro('F');
      }
    },
    []
  );

  const handleSaveCadastro = useCallback(
    async ({
      nome,
      razao_social,
      cpf_cnpj,
      telefone_fixo,
      celular,
      email,
      cep,
      endereco,
      numero,
      cidade,
      uf,
      bairro,
      observacao,
    }: NovoCadastroFormData) => {
      await api
        .post('pessoas', {
          nome,
          razao_social,
          cpf_cnpj,
          telefone_fixo,
          celular,
          email,
          cep,
          endereco,
          numero,
          cidade,
          uf,
          bairro,
          observacao,
          tipo_cadastro: tipoCadastro,
          tipo_pessoa: tipoPessoa,
        })
        .catch((err) => {
          addToast({
            type: 'error',
            title: 'Erro salvar cadastro',
            description: err.response.data.message,
          });
        });

      onRequestClose();
    },
    [onRequestClose, addToast, tipoCadastro, tipoPessoa]
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        shouldCloseOnOverlayClick={false}
      >
        <Form ref={formRef} onSubmit={handleSaveCadastro}>
          <Header>
            <h1>Cadastro de pessoa</h1>
          </Header>
          <Container>
            <Content>
              <div className="nome">
                <strong>Nome</strong>
                <Input name="nome" />
              </div>
              <div className="razao_social">
                <strong>Razão social</strong>
                <Input name="razao_social" />
              </div>
              <div>
                <strong>Pessoa</strong>
                <div className="pessoa">
                  <select className="selPessoa" onChange={handleTipoPessoa}>
                    <option>Física</option>
                    <option>Jurídica</option>
                  </select>
                </div>
              </div>
              <div>
                <strong>Tipo</strong>
                <div className="tipo">
                  <select className="selTipo" onChange={handleTipoCadastro}>
                    <option>Fornecedor e Cliente</option>
                    <option>Cliente</option>
                    <option>Fornecedor</option>
                  </select>
                </div>
              </div>
            </Content>

            <Content>
              <div className="cpfcnpj">
                <strong>CPF/CNPJ</strong>
                <Input name="cpf_cnpj" />
              </div>
              <div className="cep">
                <strong>Cep</strong>
                <Input name="cep" />
              </div>
              <div className="cidade">
                <strong>Cidade</strong>
                <Input name="cidade" />
              </div>
              <div className="estado">
                <strong>Estado</strong>
                <Input name="uf" />
              </div>
            </Content>

            <Content>
              <div className="rua">
                <strong>Endereço</strong>
                <Input name="endereco" />
              </div>
              <div className="numero">
                <strong>Número</strong>
                <Input name="numero" />
              </div>
              <div className="bairro">
                <strong>Bairro</strong>
                <Input name="bairro" />
              </div>
            </Content>

            <Content>
              <div className="telefonefixo">
                <strong>Telefone fixo</strong>
                <Input name="telefone_fixo" />
              </div>
              <div className="celular">
                <strong>Celular</strong>
                <Input name="celular" />
              </div>
              <div className="email">
                <strong>Email</strong>
                <Input name="email" type="email" />
              </div>
            </Content>
            <Content>
              <div className="observacao">
                <strong>Observação</strong>
                <Input name="observacao" />
              </div>
            </Content>
            <Content>
              <div className="botoes">
                <button type="submit" className="salvar">
                  <FiSave />
                  Salvar
                </button>
                <button
                  type="button"
                  className="cancelar"
                  onClick={onRequestClose}
                >
                  <FiX />
                  Cancelar
                </button>
              </div>
            </Content>
          </Container>
        </Form>
      </Modal>
    </>
  );
};
