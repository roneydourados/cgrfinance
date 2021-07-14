import React, { useCallback } from 'react';
import { FiUser, FiUsers, FiList, FiCreditCard } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Header } from '../../components/Header';

import { Container } from './styles';

export const Cadastros: React.FC = () => {
  const history = useHistory();

  const handleClickCadastro = useCallback(
    (rota: string) => {
      history.push(`${rota}`);
    },
    [history]
  );

  return (
    <>
      <Header />
      <Container>
        <button type="button" onClick={() => handleClickCadastro('cadpessoas')}>
          <FiUser size={69} />
          <span>Pessoas</span>
        </button>

        <button
          type="button"
          onClick={() => handleClickCadastro('cadcategorias')}
        >
          <FiList size={69} />
          <span>Categorias</span>
        </button>

        <button
          type="button"
          onClick={() => handleClickCadastro('cadmeiopagamento')}
        >
          <FiCreditCard size={69} />
          <span>Meios pagamento</span>
        </button>

        <button
          type="button"
          onClick={() => handleClickCadastro('cadastros/ususers')}
        >
          <FiUsers size={69} />
          <span>Usuários</span>
        </button>
      </Container>
    </>
  );
};
