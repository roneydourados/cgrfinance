import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  background: var(--blue);
  color: var(--text-title);
  height: 8rem;

  display: flex;
  align-items: center;
`;

export const ContetLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  h1 {
    font-size: 2.5rem;
    margin-left: 1rem;
    margin-top: 1rem;
  }

  img {
    margin-top: 0.3rem;
    margin-left: 2rem;
    height: 5rem;
    width: 5rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;

  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 30rem;

    img {
      width: 12rem;
      height: 12rem;
      margin-bottom: 2rem;
    }

    form {
      display: flex;
      justify-content: center;
      width: 35rem;
      flex-wrap: wrap;

      div {
        display: flex;
        align-items: center;
        background: var(--white-background);
        width: 25rem;
        height: 3.5rem;
        border-radius: 0.32rem;
        margin-bottom: 1rem;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 25rem;
        height: 3.25rem;
        border: 0;
        border-radius: 0.32rem;
        background-color: #8257e5;
        color: var(--text-color);
        font-size: 1.38rem;
        font-weight: 400;

        transition: filter 0.2s;

        /**hack ajustar a cor do botão */
        &:hover {
          filter: brightness(0.9);
        }

        svg {
          margin-left: 2rem;
          margin-right: 3.5rem;
        }
      }
    }
  }
`;

export const ContainerEsqueciSenha = styled.div`
  display: flex;
  align-items: flex-start;

  a {
    width: 100%;
    margin-top: 1rem;
    text-decoration: none;
    margin-left: 2.7rem;
    color: #044aff;
    transition: 0.2s;

    &:hover {
      color: ${shade(0.2, '#044aff')};
    }
  }
`;
