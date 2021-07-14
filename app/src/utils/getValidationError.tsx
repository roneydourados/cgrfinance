/**
 * aqui é a função responsável por capturar qualquer erro encontrado
 * o validationerror que esta presente dentro do yup é quem guarda esses erros
 * a interface erros, possui uma "key", não necessariamente precisa ser key o nome,
 * serve apenas para indicar qual é a chave do erro que esta sendo passado em qusetão
 */
import { ValidationError } from 'yup';

interface Erros {
  [key: string]: string;
}

export default function getValidationErros(err: ValidationError): Erros {
  const validationErros: Erros = {};

  err.inner.forEach((error) => {
    validationErros[error.path] = error.message;
  });

  return validationErros;
}
