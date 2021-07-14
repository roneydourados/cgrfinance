import React, { useState, useCallback, ChangeEvent } from 'react';
import { format } from 'date-fns';

import {
  FiArrowDownCircle,
  FiArrowDown,
  FiArrowUp,
  FiFilter,
  FiSearch,
  FiTrash2,
  FiEdit,
} from 'react-icons/fi';

import { Header } from '../../components/Header';

import { NovoCadastroModal } from './Transacoes/NovoCadastro';

import {
  Container,
  ContainerPesquisa,
  ContainerTotais,
  ContainerCredito,
  ContainerDebito,
  ContainerSaldo,
  ContainerLancamento,
  ContainerDatas,
  ContainerTipoMovimento,
  ContainerPessoa,
  ContainerLancamentos,
} from './styles';

import api from '../../services/api';

export interface CategoriaData {
  id: string;
  descricao: string;
}

interface MovimentoData {
  id: string;
  emissao: string;
  vencimento: string;
  parcela: string;
  tipo_mov: string;
  valor_nominal: number;
  valor_aberto: number;
  valor_pago: number;
  categoria: string;
  pessoa: string;
  parcelaFormated: string;
}

export const Movimentos: React.FC = () => {
  const [dateInicialValue, setDateInitialValue] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const [dateFinalValue, setDateFinalValue] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );

  const [tipoMov, setTipoMov] = useState('');
  const [pessoaId, setPessoaId] = useState('');
  const [totalCredito, setTotalCredito] = useState(0);
  const [totalDebito, setTotalDebito] = useState(0);
  // const [refreshData, setRefreshData] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [novoCadastroIsModalOpen, setNovoCadastroIsModalOpen] = useState(false);
  const [editarCadastroModalOpen, setEditarCadastroModalOpen] = useState(false);
  const [excluirCadastroModalOpen, setExcluirCadastroModalOpen] =
    useState(false);

  const [movimento, setMovimento] = useState<MovimentoData[]>([]);

  const handlePessoaId = useCallback((id: string) => {
    setPessoaId(id);
  }, []);

  const handleTipoMov = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.options.selectedIndex === 0) {
      setTipoMov('');
    }

    if (e.target.options.selectedIndex === 1) {
      setTipoMov('C');
    }

    if (e.target.options.selectedIndex === 2) {
      setTipoMov('D');
    }
  }, []);

  const handleDateInitialChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDateInitialValue(e.target.value);
    },
    []
  );

  const handleDateFinalChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDateFinalValue(e.target.value);
    },
    []
  );

  const getMovimento = useCallback(() => {
    api
      .get<MovimentoData[]>('movimento', {
        params: {
          data_inicial: dateInicialValue,
          data_final: dateFinalValue,
          pessoa_id: pessoaId,
          tipo_mov: tipoMov,
        },
      })
      .then((response) => {
        const movimentosFormatado = response.data.map((mov) => {
          return {
            ...mov,
            parcelaFormated:
              Number(mov.parcela) <= 9
                ? String(`0${mov.parcela}`)
                : String(mov.parcela),
          };
        });

        let credito: number;
        let debito: number;

        credito = 0;
        debito = 0;

        movimentosFormatado.map((mov) => {
          if (mov.tipo_mov === 'C') {
            credito += mov.valor_aberto;
          }

          if (mov.tipo_mov === 'D') {
            debito += mov.valor_aberto;
          }
        });

        setSaldo(credito - debito);
        setTotalCredito(credito);
        setTotalDebito(debito);
        setMovimento(movimentosFormatado);
      });
  }, [dateInicialValue, dateFinalValue, pessoaId, tipoMov]);

  const openNovoCadastroModal = useCallback((tpMovimento: string) => {
    setTipoMov(tpMovimento);
    setNovoCadastroIsModalOpen(true);
  }, []);

  /* const openEditarCadastroModal = useCallback(
    (id: string) => {
      // filtrar o registro do array que já esta presente
      const pessoa = pessoas.filter((p) => p.id === id);


      setEditarCadastroModalOpen(true);
    },
    [pessoas]
  ); */

  /*
  const openExcluirCadastroModal = useCallback((id: string, nome: string) => {
    setPessoaId(id);
    setExcluirCadastroModalOpen(true);
  }, []); */

  const closeModal = useCallback(() => {
    setNovoCadastroIsModalOpen(false);
    setEditarCadastroModalOpen(false);
    setExcluirCadastroModalOpen(false);
    // setRefreshData(true);
  }, []);

  return (
    <>
      <NovoCadastroModal
        tipoMovimento={tipoMov}
        isOpen={novoCadastroIsModalOpen}
        onRequestClose={closeModal}
      />

      <Header />
      <Container>
        <ContainerLancamento>
          <button type="button" onClick={() => openNovoCadastroModal('D')}>
            <FiArrowDown size={36} /> Novo débito
          </button>

          <button type="button" onClick={() => openNovoCadastroModal('C')}>
            <FiArrowUp size={36} />
            Novo crédito
          </button>
        </ContainerLancamento>
        <ContainerTotais>
          <ContainerCredito>
            <span>Total crédito</span>
            <div>
              <h2>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalCredito)}
              </h2>
            </div>
          </ContainerCredito>

          <ContainerDebito>
            <span>Total débito</span>
            <div>
              <h2>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalDebito)}
              </h2>
            </div>
          </ContainerDebito>

          <ContainerSaldo>
            <span>Total saldo</span>
            <div>
              <h2>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(saldo)}
              </h2>
            </div>
          </ContainerSaldo>
        </ContainerTotais>
        <ContainerPesquisa>
          <ContainerDatas>
            <span>Período</span>
            <div>
              <input
                name="datainicial"
                type="date"
                placeholder="Data inicial"
                onChange={handleDateInitialChange}
              />
            </div>
            <div>
              <input
                name="datafinal"
                type="date"
                placeholder="Data final"
                onChange={handleDateFinalChange}
              />
            </div>
          </ContainerDatas>

          <ContainerTipoMovimento>
            <span>Tipo de movimento</span>
            <div>
              <select onChange={handleTipoMov}>
                <option>Todos</option>
                <option>Créditos</option>
                <option>Débitos</option>
              </select>
            </div>
          </ContainerTipoMovimento>
          <ContainerPessoa>
            <div>
              <input
                placeholder="Credor/Cliente"
                onChange={() => handlePessoaId}
              />
              <button type="button">
                <FiSearch size={32} />
              </button>
            </div>
          </ContainerPessoa>
          <button type="button" onClick={getMovimento}>
            <FiFilter size={32} />
          </button>
        </ContainerPesquisa>

        <ContainerLancamentos>
          <table>
            <thead>
              <tr>
                <th>Emisão</th>
                <th>Vencimento</th>
                <th>Parcela</th>
                <th>Cliente/Credor</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Deletar</th>
                <th>Editar</th>
                <th>Baixa</th>
              </tr>
            </thead>

            <tbody>
              {movimento.map((mov) => (
                <tr key={mov.id}>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(mov.emissao)
                    )}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(mov.vencimento)
                    )}
                  </td>
                  <td className="parcela">{mov.parcelaFormated}</td>
                  <td>{mov.pessoa}</td>
                  <td className={mov.tipo_mov}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(mov.valor_aberto)}
                  </td>
                  <td>{mov.categoria}</td>
                  <td>
                    <button type="button">
                      <FiTrash2 size={24} className="deletar" />
                    </button>
                  </td>
                  <td>
                    <button type="button">
                      <FiEdit size={24} className="edit" />
                    </button>
                  </td>
                  <td>
                    <button type="button">
                      <FiArrowDownCircle size={24} className="baixa" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContainerLancamentos>
      </Container>
    </>
  );
};
