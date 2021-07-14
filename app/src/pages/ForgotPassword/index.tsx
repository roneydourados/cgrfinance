import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiUpload } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
// @ts-ignore
import imgForgotpassword from '../../assets/forgotpassword.png';
// @ts-ignore
import Logo from '../../assets/logo.png';

import { Container, Header, ContetLogo, ContainerEsqueciSenha } from './styles';
import { Input } from '../../components/Input';

export const ForgotPassword: React.FC = () => {
  const history = useHistory();

  // pegar os dados de referencia ao inputs
  const formRef = useRef<FormHandles>(null);

  const handleForgotPassword = useCallback(() => {
    history.push('/resetPassword');
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
          <Form ref={formRef} onSubmit={handleForgotPassword}>
            <div>
              <Input
                name="email"
                icon={FiMail}
                placeholder="informe email para reset de senha"
              />
            </div>
            <button type="submit">
              <FiUpload size={24} /> Enviar nova senha
            </button>
          </Form>
          <ContainerEsqueciSenha>
            <Link to="/">Voltar para login</Link>
          </ContainerEsqueciSenha>
        </div>
      </Container>
    </>
  );
};
