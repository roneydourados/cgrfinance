import styled from 'styled-components';

export const Container = styled.header`
  background: var(--blue);
  color: var(--text-title);
  height: 10rem;
  margin-bottom: 3rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContetLogo = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 2rem;
    margin-left: 1rem;
    margin-top: 1rem;
  }

  img {
    margin-top: 1rem;
    margin-left: 2rem;

    width: 4.68rem;
    height: 4.68rem;
  }
`;

export const ContetUser = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  img {
    width: 4.68rem;
    height: 4.68rem;
    border-radius: 50%;
  }

  div {
    &.container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 19rem;
    }

    div {
      margin-left: 13rem;
      height: 3rem;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      border: 0;
      transition: filter 0.2s;
      background-color: transparent;
      width: 2rem;
      height: 3rem;

      /**hack ajustar a cor do botão */
      &:hover {
        filter: brightness(0.9);
      }

      svg {
        color: var(--white-background);
      }
    }
  }

  span {
    font-size: 1rem;
  }
`;
