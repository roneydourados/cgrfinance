import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-left: 2rem;

  button {
    display: flex;
    flex-wrap: wrap;
    border: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: 'Poppins';
    font-size: 1.12rem;
    font-weight: 500;

    color: var(--text-color);
    width: 16rem;
    height: 10.56rem;
    background-color: #66b4e0;
    border-radius: 0.32rem;

    margin-left: 1rem;
    margin-top: 1rem;

    transition: filter 0.2s;

    /**hack ajustar a cor do botão */
    &:hover {
      filter: brightness(0.9);
    }
  }
`;
