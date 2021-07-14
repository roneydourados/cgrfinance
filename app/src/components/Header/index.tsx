import React, { useCallback } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { format } from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';

import { Container, Content, ContetLogo, ContetUser } from './styles';

import { Menu } from '../Menu';

import Logo from '../../assets/logo.png';
import Avatar from '../../assets/avatar.jpeg';

import { useAuth } from '../../hooks/auth';

/*
  format(parseISO(mov.emissao), 'dd/MM/yyyy')
*/

export const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  const today = format(new Date(), "EEE d 'de' MMMM yyyy", { locale: ptBR });

  const handleLogoff = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <>
      <Container>
        <Content>
          <ContetLogo>
            <img src={Logo} alt="logo" />
            <h1>CGR - Finance</h1>
          </ContetLogo>

          <ContetUser>
            <img src={Avatar} alt="logo" />
            <div className="container">
              <div>
                <button type="button" onClick={handleLogoff}>
                  <AiOutlineCloseCircle size={24} />
                </button>
              </div>
              <span>{user.nome}</span>
              <span>{today}</span>
            </div>
          </ContetUser>
        </Content>
        <Menu />
      </Container>
    </>
  );
};
