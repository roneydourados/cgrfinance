import React, { useEffect, useState } from 'react';

import Chart from 'react-apexcharts';

import { Header } from '../../components/Header';
import { Container } from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface DashData {
  totalcredito: number;
  totaldebito: number;
}

export const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [series, setSeries] = useState([]);

  const chartOptions = {
    labels: ['Crédito', 'Débito', 'Saldo'],
    colors: ['#66B4E0', '#E91E63', '#8257E5'],
    plotOptions: {
      pie: {
        expandOnClick: false,

        donut: {
          size: '65%',
          labels: {
            show: true,

            name: {
              show: true,
              fontSize: '25',
              fontWeight: 700,
            },

            value: {
              show: true,
              fontSize: '20',
              fontWeight: 700,
              formatter(value) {
                return new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(value);
              },
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    api
      .get<DashData[]>('movimento/dash')
      .then((response) => {
        response.data.map((mov) => {
          setSeries([
            mov.totalcredito,
            mov.totaldebito,
            mov.totalcredito - mov.totaldebito,
          ]);
        });
      })
      .catch(() => {
        signOut();
      });
  }, [signOut, series]);

  return (
    <>
      <Header />
      <Container>
        <div className="despesas">
          <Chart
            options={chartOptions}
            series={series}
            type="donut"
            width="580"
          />
        </div>
      </Container>
    </>
  );
};
