import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

import imgForgotpassword from '../../assets/forgotpassword.png';
import Logo from '../../assets/logo.png';

import { Container, Header, ContetLogo, ContainerEsqueciSenha } from './styles';

export const ResetPassword: React.FC = () => {
  const history = useHistory();

  const handleLogin = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

  return (
    <>
      <Header>
        <ContetLogo>
          <img src={Logo} alt="logo" />
          <h1>CGR - Finance</h1>
        </ContetLogo>
      </Header>
      <Container>
        <div>
          <img src={imgForgotpassword} alt="login" />
          <form>
            <div>
              <FiMail size={24} />
              <input type="password" placeholder="nova senha" />
            </div>
            <div>
              <FiLock size={24} />
              <input type="password" placeholder="confirmar nova senha" />
            </div>
            <button type="button" onClick={handleLogin}>
              <FiLogIn size={24} /> Criar nova senha
            </button>
          </form>
          <ContainerEsqueciSenha>
            <Link to="/">Voltar para login</Link>
          </ContainerEsqueciSenha>
        </div>
      </Container>
    </>
  );
};
