import React, { useCallback } from 'react';
import { FiFolderMinus, FiFolderPlus, FiDollarSign } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Header } from '../../components/Header';

import { Container } from './styles';

export const Relatorios: React.FC = () => {
  const history = useHistory();

  const handleClickCadastro = useCallback(
    (rota: string) => {
      history.push(`/${rota}`);
    },
    [history]
  );

  return (
    <>
      <Header />
      <Container>
        <button
          type="button"
          onClick={() => handleClickCadastro('/relcontasreceber')}
        >
          <FiFolderPlus size={69} />
          <span>(+) Relatório de contas a receber</span>
        </button>
        <button
          type="button"
          onClick={() => handleClickCadastro('/relcontaspagar')}
        >
          <FiFolderMinus size={69} />
          <span>(-) Relatório de contas a pagar</span>
        </button>
        <button
          type="button"
          onClick={() => handleClickCadastro('/relanalisefinanceira')}
        >
          <FiDollarSign size={69} />
          <span>(*) Análise financeira</span>
        </button>
      </Container>
    </>
  );
};
