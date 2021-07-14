import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70rem;
  margin: 2rem auto;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ContainerPesquisa = styled.main`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  width: 70rem;
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
  width: 60rem;

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
        width: 22rem;
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
    max-width: 45rem;

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
        background-color: transparent;
        border: 0;
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
