import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70rem;
  margin: 2rem auto;
  margin-left: -2rem;
`;

export const ContainerDadosPesquisa = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 8rem;
  width: 60rem;

  div {
    &.pagination {
      button {
        border: 0;
        width: 2rem;
        height: 2rem;
        background-color: var(--blue);
        color: var(--white-background);
        border-radius: 50%;
        font-size: 1rem;
        font-weight: 500;
        font-family: 'Poppins';

        transition: filter 0.2s;
        /**hack ajustar a cor do botão */
        &:hover {
          filter: brightness(0.9);
        }
      }

      button + button {
        margin-left: 0.3rem;
      }
    }
  }

  form {
    display: flex;
    margin-top: 1rem;
    align-items: center;
    width: 100%;

    div {
      display: flex;
      background-color: #f3f3f3;
      border-radius: 0.5rem;
      border: 0;
      height: 3rem;
      width: 100%;

      svg {
        color: #6f6f6f;
        margin-right: 1rem;
      }

      &.divPesquisa {
        svg {
          margin-left: 3rem;
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
      svg {
        color: #6f6f6f;
        margin-top: 0.5rem;
        margin-left: 1.5rem;
        margin-right: 1rem;
        transition: 0.2s;

        &:hover {
          color: ${shade(0.3, '#6f6f6f')};
        }
      }
    }
  }
`;

export const ContainerTabela = styled.div`
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
      cursor: pointer;
    }
  }
`;
