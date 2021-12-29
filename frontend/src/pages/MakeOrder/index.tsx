import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FiSkipBack } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoughList from '../../components/DoughList';
import FlavorList from '../../components/FlavorList';

import SizeList from '../../components/SizeList';
import TitleDefault from '../../components/TitleDefault';
import { apiToken } from '../../services/api';
import { Dough } from '../../types/Dough';
import { Flavor } from '../../types/Flavor';
import { Order } from '../../types/Order';
import { Size } from '../../types/Size';
import capitalizeFirstLetter from '../../util';
import { Container } from '../Home/styles';
import {
  ButtonDataOrderSubmit,
  ButtonGridMakeOrder,
  DataOrderInfo,
  DivGrid,
  Hr,
} from './styles';

const MakeOrder: React.FC = () => {
  const history = useHistory();
  const [flavor, setFlavor] = useState<boolean>(false);
  const [size, setSize] = useState<boolean>(false);
  const [dough, setDough] = useState<boolean>(false);
  const [data, setData] = useState<boolean>(false);

  const [selectSize, setSelectSize] = useState<Size>();
  const [selectFlavor, setSelectFlavor] = useState<Flavor>();
  const [selectDough, setSelectDough] = useState<Dough>();
  const [inputLocal, setInputLocal] = useState('');
  const [inputPrice, setInputPrice] = useState('');

  const handleView = (name: string, idButton: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById(idButton)!.style.backgroundColor = 'green';

    if (name === 'flavor') {
      setFlavor(true);
      setSize(false);
      setDough(false);
      setData(false);
    }

    if (name === 'dough') {
      setFlavor(false);
      setSize(false);
      setDough(true);
      setData(false);
    }

    if (name === 'size') {
      setFlavor(false);
      setSize(true);
      setDough(false);
      setData(false);
    }

    if (name === 'data') {
      setFlavor(false);
      setSize(false);
      setDough(false);
      setData(true);
    }
  };

  function redirectToOrder(): void {
    setTimeout(function () {
      history.push('/userOrder');
    }, 4000);
  }

  const handleInputLocalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLocal(event.target.value);
  };

  const handleInputPrice = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPrice(event.target.value);
  };

  const calculateTotalPrice = () => {
    const value =
      (selectDough?.price != null ? selectDough?.price : 0) +
      (selectFlavor?.price != null ? selectFlavor?.price : 0) +
      (selectSize?.price != null ? selectSize?.price : 0);
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

    if (!selectSize) listError.push('Necessário escolher um tamanho de pizza!');

    if (!selectFlavor) listError.push('Necessário escolher um sabor!');

    if (!selectDough) listError.push('Necessário escolher um Tipo de massa!');

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
        id: selectFlavor?.id != null ? selectFlavor?.id : 0,
      },
      dough: {
        id: selectDough?.id != null ? selectDough?.id : 0,
      },
      size: {
        id: selectSize?.id != null ? selectSize?.id : 0,
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
      <TitleDefault name={'Monte sua Pizza!'} />
      <Link to="/home">
        <FiSkipBack /> Voltar para a Home!
      </Link>
      <Container>
        <ButtonGridMakeOrder
          id="flavor"
          onClick={e =>
            handleView('flavor', (e.target as HTMLTextAreaElement).id)
          }
        >
          Sabor
        </ButtonGridMakeOrder>
        <DivGrid>
          {flavor ? (
            <FlavorList
              parentCallback={(flavor: Flavor) => setSelectFlavor(flavor)}
            />
          ) : null}
        </DivGrid>
        <Hr />
        <ButtonGridMakeOrder
          id="dough"
          onClick={e =>
            handleView('dough', (e.target as HTMLTextAreaElement).id)
          }
        >
          Tipo Massa
        </ButtonGridMakeOrder>
        <DivGrid>
          {dough ? (
            <DoughList
              parentCallback={(dough: Dough) => setSelectDough(dough)}
            />
          ) : null}
        </DivGrid>
        <Hr />
        <ButtonGridMakeOrder
          id="size"
          onClick={e =>
            handleView('size', (e.target as HTMLTextAreaElement).id)
          }
        >
          Tamanho
        </ButtonGridMakeOrder>
        <DivGrid>
          {size ? (
            <SizeList parentCallback={(size: Size) => setSelectSize(size)} />
          ) : null}
        </DivGrid>
        <Hr />
        <ButtonGridMakeOrder
          id="data"
          onClick={e =>
            handleView('data', (e.target as HTMLTextAreaElement).id)
          }
        >
          Dados
        </ButtonGridMakeOrder>
        <DivGrid>
          {data ? (
            <DataOrderInfo>
              <form onSubmit={setFormData}>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Nome Completo
                  </label>
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
                      onChange={handleInputPrice}
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
          ) : null}
        </DivGrid>
        <Hr />

        <ul className="list-group">
          <li
            className="list-group-item active"
            style={{
              textAlign: 'center',
              backgroundColor: '#f3701f',
              border: '0',
            }}
            aria-current="true"
          >
            Como está ficando meu pedido
          </li>
          <li className="list-group-item" style={{ textAlign: 'center' }}>
            <strong>Sabor:</strong>{' '}
            {capitalizeFirstLetter(
              selectFlavor?.description != null
                ? selectFlavor?.description
                : '',
            )}
          </li>
          <li className="list-group-item" style={{ textAlign: 'center' }}>
            <strong>Massa:</strong> {selectDough?.description}
          </li>
          <li className="list-group-item" style={{ textAlign: 'center' }}>
            <strong>Tamanho:</strong> {selectSize?.description}
          </li>
          <li className="list-group-item" style={{ textAlign: 'center' }}>
            <strong>Preço:</strong> {calculateTotalPrice()}
          </li>
        </ul>
      </Container>
    </>
  );
};

export default MakeOrder;
