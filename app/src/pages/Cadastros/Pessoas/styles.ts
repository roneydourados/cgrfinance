import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  max-width: 90rem;

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
`;

export const ContainerDadosPesquisa = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 8rem;
  width: 40rem;
  margin-left: 0.5rem;
  margin-top: -1rem;
  width: 80rem;

  form {
    display: flex;
    align-items: center;
    width: 100%;

    div {
      svg {
        color: #6f6f6f;
        margin-right: 1rem;
      }

      &.divPesquisa {
        svg {
          margin-left: 3rem;
        }
      }
    }

    button {
      border: 0;
      border-radius: 0.32rem;
      width: 8rem;
      height: 3.25rem;
      background-color: var(--blue);
      color: var(--text-color);

      font-size: 1.38rem;
      font-weight: 400;
      font-family: 'Poppins';

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }

      &.novo {
        width: 25rem;
      }
    }
  }

  div {
    margin-left: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f3;
    border-radius: 0.5rem;
    border: 0;
    height: 3rem;
    width: 100%;
    max-width: 38rem;

    select {
      border: 0;
      font-family: 'Poppins';
      font-size: 1.1rem;
      color: #6f6f6f;
      height: 2.2rem;
      width: 10rem;
      outline: 0;
      margin-left: 1rem;
      border-radius: 0.32rem;
      background-color: #f3f3f3;
    }

    &.selecionarFiltro {
      width: 35rem;
      background: inherit;

      strong {
        font-family: 'Poppins';
        font-size: 1.1rem;
        color: #6f6f6f;
      }
    }

    input {
      margin-left: 0.5rem;
      padding: 0.3rem;
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

      button {
        background-color: var(--white-background);
        width: 1.5rem;
        height: 1.5rem;

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.96);
        }

        svg {
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
