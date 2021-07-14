import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background: var(--blue);
  color: var(--text-title);
  height: 5rem;

  h1 {
    margin-left: 2rem;
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 2rem;
  }

  div {
    margin-right: 2rem;

    button {
      color: var(--text-color);
      border-radius: 0.32rem;
      border: 0;
      width: 10.12rem;
      height: 3.25rem;

      font-size: 1.37rem;
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
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;

  h1 {
    margin-left: 1rem;
  }
`;
