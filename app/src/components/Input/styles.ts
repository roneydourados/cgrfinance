import styled, { css } from 'styled-components';
import { shade } from 'polished';
import Tooltip from '../Tooltip';

interface ContainserProps {
  isFocused: boolean;
  isPreenchido: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainserProps>`
  border-radius: 0.63rem;
  border: 0;
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--white-background);

  color: #666360;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #ff0000;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isPreenchido &&
    css`
      color: #ff9000;
    `}

  input {
    background: transparent;
    flex: 1;
    color: #666666;
    font-family: 'Poppins';
    border: 0;
    outline: none;
    height: 2rem;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
    transition: 0.2s;
    color: #888888;
    width: 1.5rem;
    height: 1.5rem;

    size: 20;
    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #ff6464;
    color: #fff;

    &::before {
      border-color: #ff6464 transparent;
    }
  }
`;
