import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Container, MenuItem, Clock } from './styles';

export const Menu: React.FC = () => {
  const [horaAtual, setHoraAtual] = useState('');
  const [intervalo, setIntervalo] = useState(100); // deixar 100 para que assim que o componente redenrizar, já aparecer a hora

  useEffect(() => {
    setIntervalo(60000); // depois do componente redenrizado, mostrar somente quando passar 1 minuto
    // intervalo para mostrar hora atual
    setInterval(() => {
      const formatedHour = format(new Date(), 'HH:mm');
      setHoraAtual(formatedHour);
      return () => clearInterval();
    }, intervalo);
  }, [horaAtual, intervalo]);

  return (
    <>
      <Container>
        <MenuItem>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/cadastros">Cadastros</Link>
          <Link to="/movimentos">Movimentos</Link>
          <Link to="/relatorios">Relatórios</Link>
        </MenuItem>

        <Clock>{horaAtual}</Clock>
      </Container>
    </>
  );
};
