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

export interface CategoriaData {
  id: string;
  descricao: string;
}

export const CategoriaPesquisaCadastro: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaData[]>([]);
  const [filtros, setFiltros] = useState('');
  const [refreshData, setRefreshData] = useState(false);
  const [categoriaId, setCategoriaId] = useState('');
  const [categoriaDescricao, setCategoriaDescricao] = useState('');
  const [editCategoria, setEditCategoria] = useState({} as CategoriaData);

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
      const categoria = categorias.filter((c) => c.id === id);

      setEditCategoria(categoria[0]); // pegar os dados do unico registro retornado

      setEditarCadastroModalOpen(true);
    },
    [categorias]
  );

  const openExcluirCadastroModal = useCallback(
    (id: string, descricao: string) => {
      setCategoriaId(id);
      setCategoriaDescricao(descricao);
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
        .get<CategoriaData[]>('categorias', {
          params: { filtro: filtros },
        })
        .then((response) => {
          setCategorias(response.data);
        });
    },
    [filtros]
  );

  // dados iniciais ou refresh apos cadastrou ou alteração
  useEffect(() => {
    setRefreshData(false);
    api.get<CategoriaData[]>('categorias').then((response) => {
      setCategorias(response.data);
    });
  }, [refreshData]);

  return (
    <>
      <NovoCadastroModal
        isOpen={novoCadastroIsModalOpen}
        onRequestClose={closeModal}
      />

      <EditarCadastroModal
        categoria={editCategoria}
        isOpen={editarCadastroModalOpen}
        onRequestClose={closeModal}
      />

      <ExcluirCadastroModal
        id={categoriaId}
        nome={categoriaDescricao}
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
                  <th>Categoria</th>
                  <th>Deletar</th>
                  <th>Editar</th>
                </tr>
              </thead>

              <tbody>
                {categorias.map((c) => (
                  <tr key={c.id}>
                    <td>{c.descricao}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          openExcluirCadastroModal(c.id, c.descricao)
                        }
                      >
                        <FiTrash2 size={24} className="deletar" />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openEditarCadastroModal(c.id)}
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
