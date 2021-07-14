import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Routes';

import { Dashboard } from '../pages/Dahsboard';
import { Movimentos } from '../pages/Movimentos';
import { Cadastros } from '../pages/Cadastros';
import { Relatorios } from '../pages/Relatorios';
import { Login } from '../pages/Login';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';
import { PessoasPesquisaCadastro } from '../pages/Cadastros/Pessoas';
import { MeioPagamentoPesquisaCadastro } from '../pages/Cadastros/MeioPagamento';
import { CategoriaPesquisaCadastro } from '../pages/Cadastros/Categorias';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/forgotfassword" component={ForgotPassword} />
      <Route path="/resetPassword" component={ResetPassword} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/movimentos" component={Movimentos} isPrivate />
      <Route path="/cadastros" component={Cadastros} isPrivate />
      <Route path="/relatorios" component={Relatorios} isPrivate />

      <Route path="/cadpessoas" component={PessoasPesquisaCadastro} isPrivate />
      <Route
        path="/cadcategorias"
        component={CategoriaPesquisaCadastro}
        isPrivate
      />
      <Route
        path="/cadmeiopagamento"
        component={MeioPagamentoPesquisaCadastro}
        isPrivate
      />
    </Switch>
  );
};
