import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
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
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 2rem;

  h1 {
    margin-left: 2rem;
    font-size: 2rem;
  }

  div {
    &.botoes {
      margin-left: 2rem;
      margin-top: 1rem;

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
  }
`;
