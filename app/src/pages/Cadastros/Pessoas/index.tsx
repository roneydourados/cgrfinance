import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';

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

export interface PessoasData {
  id: string;
  nome: string;
  razao_social?: string;
  cpf_cnpj?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  telefone_fixo?: string;
  celular?: string;
  email?: string;
  observacao?: string;
}

export const PessoasPesquisaCadastro: React.FC = () => {
  const [pessoas, setPessoas] = useState<PessoasData[]>([]);
  const [filtros, setFiltros] = useState('');
  const [campoFiltro, setCampoFiltro] = useState('nome');
  const [refreshData, setRefreshData] = useState(false);
  const [pessoaId, setPessoaId] = useState('');
  const [pessoaNome, setPessoaNome] = useState('');
  const [editPessoa, setEditPessoa] = useState({} as PessoasData);

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
      const pessoa = pessoas.filter((p) => p.id === id);

      setEditPessoa(pessoa[0]); // pegar os dados do unico registro retornado

      setEditarCadastroModalOpen(true);
    },
    [pessoas]
  );

  const openExcluirCadastroModal = useCallback((id: string, nome: string) => {
    setPessoaId(id);
    setPessoaNome(nome);
    setExcluirCadastroModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setNovoCadastroIsModalOpen(false);
    setEditarCadastroModalOpen(false);
    setExcluirCadastroModalOpen(false);
    setRefreshData(true);
  }, []);

  // capturar os dados do filtro
  const handleFilter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        setFiltros('');
        return;
      }

      setFiltros(
        `and upper(p.${campoFiltro}) like upper('${e.target.value}%')`
      );
    },
    [campoFiltro]
  );

  // trazer os dados de acordo com o filtro
  const buscarPessoasFiltrado = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      await api
        .get<PessoasData[]>('pessoas', {
          params: { filtro: filtros, campo: campoFiltro },
        })
        .then((response) => {
          setPessoas(response.data);
        });
    },
    [filtros, campoFiltro]
  );

  // dados iniciais ou refresh apos cadastrou ou alteração
  useEffect(() => {
    setRefreshData(false);
    api.get<PessoasData[]>('pessoas').then((response) => {
      setPessoas(response.data);
    });
  }, [refreshData]);

  return (
    <>
      <NovoCadastroModal
        isOpen={novoCadastroIsModalOpen}
        onRequestClose={closeModal}
      />

      <EditarCadastroModal
        pessoa={editPessoa}
        isOpen={editarCadastroModalOpen}
        onRequestClose={closeModal}
      />

      <ExcluirCadastroModal
        pessoa_id={pessoaId}
        nome={pessoaNome}
        isOpen={excluirCadastroModalOpen}
        onRequestClose={closeModal}
      />

      <Header />
      <Container>
        <Content>
          <ContainerPesquisa>
            <ContainerDadosPesquisa>
              <form onSubmit={buscarPessoasFiltrado}>
                <div className="selecionarFiltro">
                  <strong>Pesquisar por:</strong>
                  <select
                    onChange={(event) => setCampoFiltro(event.target.value)}
                  >
                    <option value="nome">Nome</option>
                    <option value="razao_social">Razão Social</option>
                    <option value="celular">Celular</option>
                    <option value="telefone_fixo">Telefone</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div className="divPesquisa">
                  <input
                    name="formFiltros"
                    placeholder="dados para pesquisa"
                    onChange={handleFilter}
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
                  <th>Nome</th>
                  <th>Razão Social</th>
                  <th>Celular</th>
                  <th>Telefone fixo</th>
                  <th>Email</th>
                  <th>Deletar</th>
                  <th>Editar</th>
                </tr>
              </thead>

              <tbody>
                {pessoas.map((pessoa) => (
                  <tr key={pessoa.id}>
                    <td>{pessoa.nome}</td>
                    <td>{pessoa.razao_social}</td>
                    <td>{pessoa.celular}</td>
                    <td>{pessoa.telefone_fixo}</td>
                    <td>{pessoa.email}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          openExcluirCadastroModal(pessoa.id, pessoa.nome)
                        }
                      >
                        <FiTrash2 size={24} className="deletar" />
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openEditarCadastroModal(pessoa.id)}
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
