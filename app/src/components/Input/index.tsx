import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core'; // aqui vai importar o carinha que é responsável para pegar as propriedades que o unform

import { Container, Error } from './styles';

interface Inputprops extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: object;
}
export const Input: React.FC<Inputprops> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null); // usar uma ref, para referenciar o input para unform
  const [isFocused, setIsFocused] = useState(false);
  const [isPreenchido, setIsPreenchido] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name); // aqui é oque vai ser para o unform pegar os dados do input

  // função que indica quando o input vai perder o foco
  const handleInputBur = useCallback(() => {
    setIsFocused(false); // informa pro estado

    setIsPreenchido(!!inputRef.current?.value); // já verifica se possui um input e se o mesmo contem valor, assim passando true ou false para o estado que verifica se existe dados dentro do input
  }, []);

  // função que indica quando o input recebe o foco
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    // registar field é quem pega todos os dados o input
    registerField({
      name: fieldName, // field name é o nome do input
      ref: inputRef.current, // inputref.current que é a ref, é o input em si
      path: 'value', // path com a propriedade value, diz pro unform onde buscar o valor desejado
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isPreenchido={isPreenchido}
      isFocused={isFocused}
      data-testid="input-container"
    >
      {Icon && <Icon size="20" />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
