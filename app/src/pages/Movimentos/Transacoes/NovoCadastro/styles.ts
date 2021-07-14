import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  color: var(--balck);
  height: 2rem;

  h1 {
    margin-left: 2rem;
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 2rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
  max-width: 110rem;

  strong {
    color: #6f6f6f;
    font-family: 'Poppins';
    font-size: 1.2rem;
    font-weight: 500;
  }

  div {
    border-radius: 0.32rem;
    div {
      height: 3.5rem;

      input {
        height: 100%;
      }
    }

    &.emissao {
      width: 15rem;
    }

    &.vencimento {
      width: 15rem;
    }

    &.categoria {
      width: 30rem;
      color: #6f6f6f;
      font-family: 'Poppins';
      font-size: 1.2rem;
      font-weight: 500;
    }

    &.pessoa {
      width: 44rem;
      color: #6f6f6f;
      font-family: 'Poppins';
      font-size: 1.2rem;
      font-weight: 500;
    }

    &.juros {
      width: 8rem;
    }

    &.multa {
      width: 8rem;
    }

    &.observacao {
      width: 50rem;
      div {
        height: 5rem;

        input {
          height: 100%;
        }
      }
    }

    &.botoes {
      margin-top: 2rem;

      button {
        color: var(--text-color);
        border-radius: 0.32rem;
        border: 0;
        width: 9rem;
        height: 3.25rem;

        font-size: 1rem;
        font-weight: 500;
        font-family: 'Poppins';

        &.cancelar {
          background-color: var(--red);
        }
        &.salvar {
          background-color: var(--green);
        }

        transition: filter 0.2s;
        /**hack ajustar a cor do botão */
        &:hover {
          filter: brightness(0.9);
        }

        svg {
          width: 2rem;
          height: 2rem;
          margin-right: 0.5rem;
        }
      }
      button + button {
        margin-left: 0.5rem;
      }
    }
    input {
      font-family: 'Poppins';
      font-weight: 500;
      font-size: 1.25rem;
      width: 100%;
    }
  }

  div + div {
    margin-left: 1rem;
  }
`;
