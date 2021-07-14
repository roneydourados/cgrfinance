import React, { useState, useEffect, useCallback, FormEvent } from 'react';

import { FiSearch, FiPlusCircle, FiTrash2, FiEdit } from 'react-icons/fi';

import { Header } from '../../../components/Header';

import {
  Container,
  ContainerPesquisa,
  ContainerDadosPesquisa,
  ContainerLancamentos,
  Content,
} from './styles';

import { NovoCadastroModal } from './NovoCadastro';
import { EditarCadastroModal } from './EditarCadastro';
import { ExcluirCadastroModal } from './ExcluirCadastro';

import api from '../../../services/api';

export interface MeioPagamentoData {
  id: string;
  descricao: string;
}

export const MeioPagamentoPesquisaCadastro: React.FC = () => {
  const [meiosPagamentos, setMeiosPagamentos] = useState<MeioPagamentoData[]>(
    []
  );
  const [filtros, setFiltros] = useState('');
  const [refreshData, setRefreshData] = useState(false);
  const [meioPagamentoId, setMeioPagamentoId] = useState('');
  const [meioPagamentoDescricao, setMeioPagamentoDescricao] = useState('');
  const [editMeioPagamento, setEditMeioPagamento] = useState(
    {} as MeioPagamentoData
  );

  const [novoCadastroIsModalOpen, setNovoCadastroIsModalOpen] = useState(false);
  const [editarCadastroModalOpen, setEditarCadastroModalOpen] = useState(false);
  const [excluirCadastroModalOpen, setExcluirCadastroModalOpen] =
    useState(false);

  const openNovoCadastroModal = useCallback(() => {
    setNovoCadastroIsModalOpen(true);
  }, []);

  const openEditarCadastroModal = useCallback(
    (id: string) => {
      // filtrar o registro do array que já esta presente
      const meioPagamento = meiosPagamentos.filter((p) => p.id === id);

      setEditMeioPagamento(meioPagamento[0]); // pegar os dados do unico registro retornado

      setEditarCadastroModalOpen(true);
    },
    [meiosPagamentos]
  );

  const openExcluirCadastroModal = useCallback(
    (id: string, descricao: string) => {
      setMeioPagamentoId(id);
      setMeioPagamentoDescricao(descricao);
      setExcluirCadastroModalOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setNovoCadastroIsModalOpen(false);
    setEditarCadastroModalOpen(false);
    setExcluirCadastroModalOpen(false);
    setRefreshData(true);
  }, []);

  // trazer os dados de acordo com o filtro
  const buscarPessoasFiltrado = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      await api
        .get<MeioPagamentoData[]>('formaspagamento', {
          params: { filtro: filtros },
        })
        .then((response) => {
          setMeiosPagamentos(response.data);
        });
    },
    [filtros]
  );

  // dados iniciais ou refresh apos cadastrou ou alteração
  useEffect(() => {
    setRefreshData(false);
    api.get<MeioPagamentoData[]>('formaspagamento').then((response) => {
      setMeiosPagamentos(response.data);
    });
  }, [refreshData]);

  return (
    <>
      <NovoCadastroModal
        isOpen={novoCadastroIsModalOpen}
        onRequestClose={closeModal}
      />

      <EditarCadastroModal
        meioPagamento={editMeioPagamento}
        isOpen={editarCadastroModalOpen}
        onRequestClose={closeModal}
      />

      <ExcluirCadastroModal
        id={meioPagamentoId}
        nome={meioPagamentoDescricao}
        isOpen={excluirCadastroModalOpen}
        onRequestClose={closeModal}
      />

      <Header />
      <Container>
        <Content>
          <ContainerPesquisa>
            <ContainerDadosPesquisa>
              <form onSubmit={buscarPessoasFiltrado}>
                <div className="divPesquisa">
                  <input
                    name="formFiltros"
                    placeholder="dados para pesquisa"
                    onChange={(event) => setFiltros(event.target.value)}
                  />
                  <button type="submit">
                    <FiSearch size={32} />
                  </button>
                </div>

                <button
                  className="novo"
                  type="button"
                  onClick={openNovoCadastroModal}
                >
                  <FiPlusCircle size={32} /> Novo cadastro
                </button>
              </form>
            </ContainerDadosPesquisa>
          </ContainerPesquisa>

          <ContainerLancamentos>
            <table>
              <thead>
                <tr>
                  <th>Meio de pagamento</th>
                  <th>Deletar</th>
                  <th>Editar</th>
                </tr>
              </thead>

              <tbody>
                {meiosPagamentos.map((m) => (
                  <tr key={m.id}>
                    <td>{m.descricao}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          openExcluirCadastroModal(m.id, m.descricao)
                        }
                      >
                        <FiTrash2 size={24} className="deletar" />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openEditarCadastroModal(m.id)}
                      >
                        <FiEdit size={24} className="edit" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ContainerLancamentos>
        </Content>
      </Container>
    </>
  );
};
