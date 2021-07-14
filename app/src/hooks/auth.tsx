import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  nome: string;
  email: string;
  avatar_url: string;
}

// interface para armazedar os dados do usuario em um estado
interface AuthState {
  token: string;
  user: User;
}

// interface para passar as crendeciais para logar
interface signInCredentials {
  email: string;
  password: string;
}

// interface para guardar dados do contexto de login
interface AuthContextData {
  user: User;
  signIn(Credentials: signInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const storageKey = '@cgrfinance';

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(`${storageKey}:token`); // pegar o token do usuário no localstorage
    const user = localStorage.getItem(`${storageKey}:user`); // pegar o usuário no localstorage

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState; // caso não caixa no if acima, retornar um objeto vazio
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('login', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem(`${storageKey}:token`, token); // armazenar o token do usuário no localstorage
    localStorage.setItem(`${storageKey}:user`, JSON.stringify(user)); // armazenar o usuário no localstorage

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await api.post('logout');

    localStorage.removeItem(`${storageKey}:token`); // apagar o token do usuário no localstorage
    localStorage.removeItem(`${storageKey}:user`); // apagar o usuário no localstorage

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem(`${storageKey}:user`, JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'Só é permitido usar o useAuth um contexto dentro de um provider!'
    );
  }
  return context;
}

export { AuthProvider, useAuth };
