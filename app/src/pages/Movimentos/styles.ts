import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 100rem;
  margin: 0 auto; // centralizar container

  button {
    background-color: #de8c8c;
    border: 0;
    color: var(--text-color);
    width: 12.1rem;
    height: 4rem;
    border-radius: 0.32rem;
    margin-left: 0.3rem;
    transition: filter 0.2s;

    /**hack ajustar a cor do botão */
    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const ContainerTotais = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 1rem;
`;

export const ContainerLancamento = styled.div`
  display: flex;
  padding: 0.2rem;
  align-items: center;

  /**aqui deixa o botão anterior vermelho e o subsequente a ele com a outra estização que colocar */
  button + button {
    background-color: #1ed09b;

    transition: filter 0.2s;

    /**hack ajustar a cor do botão */
    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const ContainerCredito = styled.div`
  display: flex;
  height: 6rem;
  background-color: #1ed09b;
  font-family: 'Poppins';
  font-size: 2rem;
  color: var(--text-color);
  font-weight: 500;
  width: 20rem;
  border-radius: 0.32rem;
  margin-left: 0.5rem;

  span {
    margin-left: 1rem;
    font-family: 'Poppins';
    font-size: 1.12rem;
  }

  div {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  transition: filter 0.2s;

  /**hack ajustar a cor do botão */
  &:hover {
    filter: brightness(0.9);
  }
`;

export const ContainerDebito = styled.div`
  display: flex;
  height: 6rem;
  background-color: #de8c8c;
  font-family: 'Poppins';
  font-size: 2rem;
  color: var(--text-color);
  font-weight: 500;
  width: 20rem;
  border-radius: 0.32rem;
  margin-left: 0.5rem;

  span {
    margin-left: 1rem;
    font-family: 'Poppins';
    font-size: 1.12rem;
  }

  div {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  transition: filter 0.2s;

  /**hack ajustar a cor do botão */
  &:hover {
    filter: brightness(0.9);
  }
`;

export const ContainerSaldo = styled.div`
  display: flex;
  height: 6rem;
  background-color: #66b4e0;
  font-family: 'Poppins';
  font-size: 2rem;
  color: var(--text-color);
  font-weight: 500;
  width: 20rem;
  border-radius: 0.32rem;
  margin-left: 0.5rem;

  span {
    margin-left: 1rem;
    font-family: 'Poppins';
    font-size: 1.12rem;
  }

  div {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  transition: filter 0.2s;

  /**hack ajustar a cor do botão */
  &:hover {
    filter: brightness(0.9);
  }
`;

export const ContainerPesquisa = styled.main`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  width: 100%;
  margin-right: 1rem;
  margin-left: 0.5rem;

  border-radius: 0.32rem;
  height: 6rem;
  background-color: var(--white-background);

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    border: 0;
    border-radius: 0.32rem;
    width: 4rem;
    height: 3.25rem;
    background-color: #8257e5;
    color: var(--text-color);

    font-size: 1.38rem;
    font-weight: 400;
    font-family: 'Poppins';

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const ContainerDatas = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 8rem;
  width: 30rem;
  margin-left: 0.5rem;
  margin-top: -1rem;

  //background-color: #66b4e0;
  font-family: 'Poppins';
  font-size: 2rem;
  color: var(--text-color);
  font-weight: 500;
  border-radius: 0.32rem;

  span {
    margin-left: 0.5rem;
    font-family: 'Poppins';
    font-size: 1.12rem;
    color: #6f6f6f;
    width: 25rem;
  }

  div {
    margin-top: -3.5rem;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f3;
    border-radius: 0.5rem;
    border: 0;
    height: 3rem;
    width: 13rem;

    input {
      margin-left: 0.5rem;
      padding: 0.3rem;
      width: 8.5rem;
      border: 0;
      outline: 0;
      height: 2rem;
      background-color: transparent;
      font-family: 'Poppins';
      font-size: 1.1rem;
      color: #6f6f6f;
      height: 100%;
      width: 100%;
    }

    button {
      display: flex;
      align-items: center;
      background-color: transparent;
      border: 0;

      svg {
        color: #6f6f6f;
        margin-left: 1.5rem;
        margin-right: 1rem;
        transition: 0.2s;

        &:hover {
          color: ${shade(0.3, '#6f6f6f')};
        }
      }
    }
  }

  div + div {
    margin-left: 0.5rem;
  }
`;

export const ContainerTipoMovimento = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 8rem;
  width: 18rem;
  margin-top: -1rem;

  //background-color: #66b4e0;
  font-family: 'Poppins';
  font-size: 2rem;
  color: var(--text-color);
  font-weight: 500;
  border-radius: 0.32rem;

  span {
    margin-left: 0.5rem;
    font-family: 'Poppins';
    font-size: 1.12rem;
    color: #6f6f6f;
    width: 25rem;
  }

  div {
    margin-top: -3.5rem;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f3;
    border-radius: 0.5rem;
    border: 0;
    height: 3rem;
    width: 15rem;

    select {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      padding: 0.3rem;
      width: 8.5rem;
      border: 0;
      outline: 0;
      height: 2rem;
      background-color: transparent;
      font-family: 'Poppins';
      font-size: 1.1rem;
      color: #6f6f6f;
      height: 100%;
      width: 100%;
    }
  }
`;

export const ContainerPessoa = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 8rem;
  width: 40rem;
  margin-left: 0.5rem;
  margin-top: -1rem;

  div {
    margin-top: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f3;
    border-radius: 0.5rem;
    border: 0;
    height: 3rem;
    width: 100%;

    input {
      margin-left: 0.5rem;
      padding: 0.3rem;
      width: 8.5rem;
      border: 0;
      outline: 0;
      height: 2rem;
      background-color: transparent;
      font-family: 'Poppins';
      font-size: 1.1rem;
      color: #6f6f6f;
      height: 100%;
      width: 100%;
    }

    button {
      display: flex;
      align-items: center;
      background-color: transparent;
      border: 0;

      svg {
        color: #6f6f6f;
        margin-left: 1.5rem;
        margin-right: 1rem;
        transition: 0.2s;

        &:hover {
          color: ${shade(0.3, '#6f6f6f')};
        }
      }
    }
  }

  div + div {
    margin-left: 0.5rem;
  }
`;

export const ContainerLancamentos = styled.div`
  margin-left: 0.5rem;
  margin-right: 1rem;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;
    border-collapse: separate;

    th {
      padding: 1rem 2rem;
      color: #6f6f6f;
      font-weight: 600;
      text-align: left;
    }

    tr {
      transition: 0.2s;

      &:hover {
        color: ${shade(0.3, '#ffff')};
      }
    }

    td {
      padding: 1.5rem 2rem;
      border: 0;
      color: var(--text-body);
      border-radius: 0.25rem;
      background: var(--shape);

      &:first-child {
        color: var(--text-tile);
      }

      // aqui são classnames vão possui uma estilização diferente
      &.C {
        color: var(--green);
      }

      &.D {
        color: var(--red);
      }

      &.parcela {
        display: flex;
        justify-content: center;
        font-weight: 600;
      }

      button {
        background-color: var(--white-background);
        width: 1.5rem;
        height: 1.5rem;

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.96);
        }

        svg {
          &.baixa {
            color: #66b4e0;
          }
          &.deletar {
            color: #f90000;
          }
          &.edit {
            color: #29d3d3;
          }
        }
      }
    }
  }
`;
