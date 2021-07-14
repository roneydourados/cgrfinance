import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--blue);
  color: var(--text-title);
  height: 5rem;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 2rem;
  flex-wrap: wrap;

  a {
    margin-left: 3rem;
    font-size: 1.1rem;
    text-decoration: none;
    color: var(--text-title);
    transition: filter 0.2s;

    /**hack ajustar a cor do botão */
    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const Clock = styled.h1`
  font-size: 3rem;
  margin-right: 3rem;
  font-weight: 500;
`;
