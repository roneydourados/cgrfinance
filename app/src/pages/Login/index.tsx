import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

// o comentário (@ts-ignore) serve para sumir com o erro chato de tipagem da imagem dizendo que não é um modulo encontrado

// @ts-ignore
import imgLogin from '../../assets/imgLogin.png';
// @ts-ignore
import Logo from '../../assets/logo.png';

import { Input } from '../../components/Input';

import getValidationErros from '../../utils/getValidationError';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, Header, ContetLogo, ContainerEsqueciSenha } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  // pegar os dados de referencia ao inputs
  const formRef = useRef<FormHandles>(null);

  const handleLogin = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({}); // deixar os erros limpos

        const schema = Yup.object().shape({
          email: Yup.string().email().required('Email é obrigatório!'),
          password: Yup.string().required('Senha obrigatorio!'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
          return;
        }

        // se não for erro do yup então disparar um toast
        addToast({
          type: 'error',
          title: 'Erro Login',
          description: 'Falha ao efetuar login, verifique usuário e senha!',
        });
      }
    },
    [signIn, addToast, history]
  );

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
          <img src={imgLogin} alt="login" />
          <Form ref={formRef} onSubmit={handleLogin}>
            <div>
              <Input name="email" icon={FiMail} placeholder="E-mail" />
            </div>
            <div>
              <Input
                name="password"
                icon={FiLock}
                placeholder="Senha"
                type="password"
              />
            </div>
            <button type="submit">
              <FiLogIn size={24} /> Acessar
            </button>
          </Form>
          <ContainerEsqueciSenha>
            <Link to="/forgotfassword">Esqueci minha senha</Link>
          </ContainerEsqueciSenha>
        </div>
      </Container>
    </>
  );
};
