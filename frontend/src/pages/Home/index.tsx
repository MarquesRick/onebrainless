import React, { useEffect } from 'react';
import { FiCreditCard, FiTrendingUp } from 'react-icons/fi';
import { Link, Route } from 'react-router-dom';
import PizzaOfDay from '../../components/PizzaOfDay';
import TitleDefault from '../../components/TitleDefault';
import { Container, Hr } from './styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => {
  useEffect(() => {
    toast.info(`🥳 Bem-Vindo ${localStorage.getItem('@One:user_name')}!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: { fontSize: '10pt' },
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <TitleDefault name={'Peça sua Pizza!'} />
      <Container>
        <Link to="/makeOrder">
          <FiCreditCard /> Monte seu pedido!
        </Link>
        <Hr />
        <Link to="/makeOrderPizzaDay">
          <FiTrendingUp /> Pedir pizza do dia!
        </Link>
        <Hr />
        <PizzaOfDay />
      </Container>
    </>
  );
};

export default Home;
