import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
  margin-left: 2rem;
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

    &.descricao {
      width: 30rem;
    }

    &.botoes {
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
  }

  div + div {
    margin-left: 1rem;
  }
`;
