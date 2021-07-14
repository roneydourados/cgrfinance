import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  color: var(--black);
  height: 5rem;

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
  margin-top: 1rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100rem;
  margin-bottom: 3rem;

  div {
    border-radius: 0.32rem;
    height: 3rem;

    strong {
      color: #6f6f6f;
      font-family: 'Poppins';
      font-size: 1.2rem;
      font-weight: 500;
    }

    &.pessoa {
      width: 10rem;
      background-color: var(--white-background);
      strong {
        margin-left: 0.5rem;
        margin-top: 0.5rem;
        color: #6f6f6f;
      }
    }

    &.tipo {
      width: 15rem;
      background-color: var(--white-background);

      strong {
        margin-left: 0.5rem;
        margin-top: 0.5rem;
        color: #6f6f6f;
      }
    }

    &.cep {
      width: 10rem;
    }

    &.nome {
      width: 26rem;
    }
    &.razao_social {
      width: 26rem;
    }

    &.estado {
      width: 7rem;
    }

    &.cpfcnpj {
      width: 20rem;
    }

    &.cidade {
      width: 40rem;
    }

    &.numero {
      width: 10rem;
    }

    &.rua {
      width: 34rem;
    }

    &.bairro {
      width: 34rem;
    }

    &.email {
      width: 43.5rem;
    }

    &.observacao {
      width: 80rem;
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
      color: #6f6f6f;
      width: 100%;
    }

    textarea {
      font-family: 'Poppins';
      font-weight: 500;
      font-size: 1.25rem;
      color: #6f6f6f;
      width: 100%;
      border: 0;
      border-radius: 0.32rem;
      outline: 0;
      padding: 1rem;
    }

    select {
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
      margin-left: 0.3rem;
      &.selPessoa {
        max-width: 9rem;
      }

      &.selTipo {
        max-width: 14rem;
      }
    }
  }

  div + div {
    margin-left: 1rem;
  }
`;
