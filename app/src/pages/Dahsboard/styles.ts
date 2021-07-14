import styled, { css } from 'styled-components';

interface ImageProps {
  color: string;
}

export const ImageFinance = styled.div<ImageProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f4f4;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-left: 2rem;
  margin-top: 1rem;

  svg {
    ${(props) =>
      props.color === 'green' &&
      css`
        color: #1ed09b;
      `}

    ${(props) =>
      props.color === 'red' &&
      css`
        color: #ef6363;
      `}

    ${(props) =>
      props.color === 'blue' &&
      css`
        color: #66b4e0;
      `}
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  div {
    &.despesas {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      background: var(--white-background);
      width: 100%;
      max-width: 60rem;
      height: 30rem;
      border-radius: 0.32rem;

      span {
        font-size: 1.75rem;
        color: #808080;
      }

      &.totaldespesa {
        h1 {
          margin-top: 5rem;
          font-size: 4.5rem;
          font-weight: 500;
          color: #ef6363;
        }
      }
    }

    transition: filter 0.2s;

    /**hack ajustar a cor do botão */
    &:hover {
      filter: brightness(0.95);
    }
  }
`;
