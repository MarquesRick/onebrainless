import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiSkipBack } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PizzaOfDay from '../../components/PizzaOfDay';

import TitleDefault from '../../components/TitleDefault';
import { apiToken } from '../../services/api';
import { Order } from '../../types/Order';
import { PizzaDay } from '../../types/PizzaDay';
import { Container } from '../Home/styles';
import { ButtonDataOrderSubmit, DataOrderInfo, DivGrid, Hr } from './styles';

const MakeOrderPizzaDay: React.FC = () => {
  const history = useHistory();
  const [pizzaDay, setPizzaList] = useState<PizzaDay | null>(null);
  const today = new Date();

  const weekday = [
    'Domingo',
    'Segunda',
    'Terca',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sabado',
  ];

  const day = weekday[today.getDay()].trim();

  useEffect(() => {
    apiToken()
      .get<PizzaDay>(`/pizzaByWeekDay?dayOfWeek=${day}`)
      .then(response => setPizzaList(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputLocal, setInputLocal] = useState('');

  const handleInputLocalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLocal(event.target.value);
  };

  function redirectToOrder(): void {
    setTimeout(function () {
      history.push('/userOrder');
    }, 4000);
  }

  const calculateTotalPrice = () => {
    const value =
      (pizzaDay?.dough.price != null ? pizzaDay?.dough.price : 0) +
      (pizzaDay?.flavor.price != null ? pizzaDay?.flavor.price : 0) +
      (pizzaDay?.size.price != null ? pizzaDay?.size.price : 0);
    return value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const calculeDelivery = (date: Date) => {
    const minutesToAdd = 45;
    const futureDate = new Date(date.getTime() + minutesToAdd * 60000);

    return futureDate.toLocaleString('pt-br', { hour12: false });
  };

  function setFormData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const listError = [];

    if (!inputLocal) listError.push('Necessário informar o endereço!');

    if (listError.length > 0) return errorMsg(listError);

    const idUser = parseInt(localStorage.getItem('@One:user_id') as string);

    const price = calculateTotalPrice()
      .replace(',', '.')
      .replace(/[^0-9.-]+/g, '');

    const dateNow = new Date();

    const order: Order = {
      user: {
        id: idUser,
        username: localStorage.getItem('@One:user_name') as string,
      },
      flavor: {
        id: pizzaDay?.flavor.id != null ? pizzaDay?.flavor.id : 0,
      },
      dough: {
        id: pizzaDay?.dough.id != null ? pizzaDay?.dough.id : 0,
      },
      size: {
        id: pizzaDay?.size.id != null ? pizzaDay?.size.id : 0,
      },
      totalPrice: parseFloat(price),
      createdAt: dateNow.toLocaleString('pt-br', { hour12: false }),
      estimatedDelivery: calculeDelivery(dateNow),
    };

    apiToken()
      .post<Order>(`/orderSave`, order)
      .then(response => {
        console.log(response.data);
        successMsg();
        redirectToOrder();
      })
      .catch(error => {
        const listError = [error];
        errorMsg(listError);
      });
  }

  const errorMsg = (errors: string[]) => {
    errors.forEach(error =>
      toast.error(`😓 ${error}!`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { fontSize: '12pt' },
      }),
    );
  };

  const successMsg = () => {
    toast.success(`🍕 Pedido criado com sucesso!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: { fontSize: '15pt' },
    });
  };

  return (
    <>
      <TitleDefault name={'Pizza do dia!'} />
      <Link to="/home">
        <FiSkipBack /> Voltar para a Home!
      </Link>
      <Container>
        <PizzaOfDay />
        <DivGrid>
          <DataOrderInfo>
            <form onSubmit={setFormData}>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Nome Completo</label>
                <div className="col-sm-4">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nome Completo"
                    value={localStorage.getItem('@One:user_name') as string}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Endereco</label>
                <div className="col-sm-4">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Endereço"
                    onChange={handleInputLocalChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Preço</label>
                <div className="col-sm-4">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Preço"
                    readOnly
                    value={calculateTotalPrice()}
                  />
                </div>
              </div>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <ButtonDataOrderSubmit type="submit">
                  Finalizar pedido
                </ButtonDataOrderSubmit>
              </div>
            </form>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </DataOrderInfo>
        </DivGrid>
        <Hr />
      </Container>
    </>
  );
};

export default MakeOrderPizzaDay;
