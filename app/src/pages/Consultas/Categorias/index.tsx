import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';

import { FiSearch } from 'react-icons/fi';

import { Container, ContainerDadosPesquisa, ContainerTabela } from './styles';

import api from '../../../services/api';

interface CategoriaData {
  id: string;
  descricao: string;
  last_page: number;
}

interface Pagination {
  numeroPagina: number;
}

interface NovoCadastroModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const PesquisaCategoria: React.FC<NovoCadastroModalProps> = ({
  isOpen,
  onRequestClose,
}: NovoCadastroModalProps) => {
  const [categorias, setCategorias] = useState<CategoriaData[]>([]);
  const [filtro, setFiltro] = useState('');
  const [pagination, setPagination] = useState<Pagination[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const handleSelectCategoria = useCallback(
    (categoria_id: string, categoria_descricao: string) => {
      console.log('selecionou: ', categoria_id, ' - ', categoria_descricao);
    },
    []
  );

  // dados iniciais ou refresh apos cadastrou ou alteração
  useEffect(() => {
    api
      .get(`categorias/?page=${pageNumber}`, {
        params: {
          descricao: filtro,
        },
      })
      .then((response) => {
        const cat = response.data;
        const { last_page } = cat.meta; // aqui vem os dados do servidor com quantidade de paginas etc..

        const arrayPages = [];

        for (let i = 1; i <= last_page; i++) {
          arrayPages.push(i);
        }

        setPagination(arrayPages);
        setCategorias(cat.data);
      });
  }, [pageNumber, filtro]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content-medium"
        shouldCloseOnOverlayClick={false}
      >
        <Container>
          <ContainerDadosPesquisa>
            <div>
              <h3>Consultar categoria</h3>
            </div>
            <form>
              <div className="divPesquisa">
                <input
                  name="formFiltros"
                  placeholder="dados para pesquisa"
                  onChange={(event) => setFiltro(event.target.value)}
                />
                <FiSearch size={32} />
              </div>
            </form>
            <ContainerTabela>
              <table>
                <tbody>
                  {categorias.map((cat) => (
                    <tr
                      key={cat.id}
                      onClick={() =>
                        handleSelectCategoria(cat.id, cat.descricao)
                      }
                    >
                      <td>{cat.descricao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ContainerTabela>
            <div className="pagination">
              {pagination.map((page) => (
                <button
                  key={page.numeroPagina}
                  type="button"
                  onClick={() => setPageNumber(page.numeroPagina)}
                >
                  {page.numeroPagina}
                </button>
              ))}
            </div>
          </ContainerDadosPesquisa>
        </Container>
      </Modal>
    </>
  );
};
