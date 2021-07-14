import React, { useRef, useCallback, useState } from 'react';
import AsyncSelect from 'react-select/async';

import Modal from 'react-modal';
import { FiSave, FiX } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import { Header, Content, Container } from './styles';

import { Input } from '../../../../components/Input';
import { useToast } from '../../../../hooks/toast';

import api from '../../../../services/api';

interface NovoCadastroFormData {
  parcela: number;
  emissao: string;
  vencimento: string;
  tipo_mov: string;
  status: string;
  observacao: string;
}

interface NovoCadastroModalProps {
  isOpen: boolean;
  tipoMovimento: string;
  onRequestClose: () => void;
}

interface CategoriaData {
  id: string;
  descricao: string;
}

interface PessoasData {
  id: string;
  nome: string;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const NovoCadastroModal: React.FC<NovoCadastroModalProps> = ({
  isOpen,
  tipoMovimento,
  onRequestClose,
}: NovoCadastroModalProps) => {
  const { addToast } = useToast();
  const [descricaoCategoria, setDescricaoCategoria] = useState('');
  const [filtroPessoa, setFiltroPessoa] = useState('');
  const [valorAberto, setValorAberto] = useState(0);
  const [valorMulta, setValorMulta] = useState(0);
  const [valorJuros, setValorJuros] = useState(0);
  const [selectedValueCategoria, setSelectedValueCategoria] =
    useState<CategoriaData>({} as CategoriaData);

  const [selectedValuePessoa, setSelectedValuePessoa] = useState<PessoasData>(
    {} as PessoasData
  );

  // pegar os dados de referencia ao inputs
  const formRef = useRef<FormHandles>(null);

  const handleInputChangeCategoria = useCallback((value) => {
    setDescricaoCategoria(value);
  }, []);

  const handleChangeCategoria = useCallback((value: CategoriaData) => {
    setSelectedValueCategoria(value);
  }, []);

  const loadCategorias = useCallback(async () => {
    const response = await api.get<CategoriaData[]>('categorias', {
      params: {
        descricao: descricaoCategoria,
      },
    });

    const categorias = response.data;

    return categorias;
  }, [descricaoCategoria]);

  const handleInputChangePessoa = useCallback((value) => {
    setFiltroPessoa(`and upper(p.nome) like upper('${value}%')`);
  }, []);

  const handleChangePessoa = useCallback((value: PessoasData) => {
    setSelectedValuePessoa(value);
  }, []);

  const loadPessoas = useCallback(async () => {
    const response = await api.get<PessoasData[]>('pessoas', {
      params: { filtro: filtroPessoa, campo: 'nome' },
    });

    const pessoas = response.data;

    return pessoas;
  }, [filtroPessoa]);

  const handleSaveCadastro = useCallback(
    async ({
      parcela,
      emissao,
      vencimento,
      status,
      observacao,
    }: NovoCadastroFormData) => {
      await api
        .post('movimento', {
          pessoa_id: selectedValuePessoa.id,
          categoria_id: selectedValueCategoria.id,
          parcela,
          emissao,
          vencimento,
          valor_nominal: valorAberto,
          valor_aberto: valorAberto,
          valor_pago: 0,
          juros: valorJuros,
          multa: valorMulta,
          tipo_mov: tipoMovimento,
          status,
          observacao,
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
    [
      onRequestClose,
      addToast,
      tipoMovimento,
      selectedValuePessoa.id,
      selectedValueCategoria.id,
      valorAberto,
      valorJuros,
      valorMulta,
    ]
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content-medium"
        shouldCloseOnOverlayClick={false}
      >
        <Form ref={formRef} onSubmit={handleSaveCadastro}>
          <Header>
            <h1>Cadastro de categorias</h1>
          </Header>
          <Container>
            <Content>
              <div className="emissao">
                <strong>Emissão</strong>
                <Input name="emissao" type="date" />
              </div>
              <div className="vencimento">
                <strong>Vencimento</strong>
                <Input name="vencimento" type="date" />
              </div>
              <div className="categoria">
                <strong>Categoria</strong>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  value={selectedValueCategoria}
                  onInputChange={handleInputChangeCategoria}
                  getOptionLabel={(categoria) => categoria.descricao}
                  getOptionValue={(categoria) => categoria.id}
                  loadOptions={loadCategorias}
                  onChange={handleChangeCategoria}
                />
              </div>
            </Content>
            <Content>
              <div className="pessoa">
                <strong>Pessoa</strong>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  value={selectedValuePessoa}
                  onInputChange={handleInputChangePessoa}
                  getOptionLabel={(pessoa) => pessoa.nome}
                  getOptionValue={(pessoa) => pessoa.id}
                  loadOptions={loadPessoas}
                  onChange={handleChangePessoa}
                />
              </div>
              <div>
                <strong>Valor</strong>
                <Input
                  name="valor_aberto"
                  type="number"
                  onChange={(e) => setValorAberto(Number(e.target.value))}
                />
              </div>
            </Content>
            <Content>
              <div className="juros">
                <strong>Juros</strong>
                <Input
                  name="juros"
                  type="number"
                  onChange={(e) => setValorJuros(Number(e.target.value))}
                />
              </div>
              <div className="multa">
                <strong>Multa</strong>
                <Input
                  name="multa"
                  type="number"
                  onChange={(e) => setValorMulta(Number(e.target.value))}
                />
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
