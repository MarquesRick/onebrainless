import React, { useEffect, useState } from 'react';
import { FiSkipBack } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { apiToken } from '../../services/api';
import { Order } from '../../types/Order';
import capitalizeFirstLetter from '../../util';
import { OrderInfo, TitleOrder } from './styles';

const UserOrder = () => {
  const [orders, setOrderList] = useState<Order[] | null>(null);
  const idUserLocal = (localStorage.getItem('@One:user_id') != null
    ? localStorage.getItem('@One:user_id')
    : 0) as string;
  const idUser = parseInt(idUserLocal);

  useEffect(() => {
    apiToken()
      .get<Order[]>(`/orderByUser?idUser=${idUser}`)
      .then(response => setOrderList(response.data));
  }, []);

  return (
    <>
      <TitleOrder>
        <strong>Pedidos</strong>
        <br />
        <i>{localStorage.getItem('@One:user_name')}</i>
      </TitleOrder>
      <Link to="/home">
        <FiSkipBack /> Voltar para a Home!
      </Link>
      <OrderInfo>
        {orders &&
          orders.map(order => (
            <div className="container" key={order.id}>
              <div className="row">
                <div className="col-lg-16 mb-4">
                  <div className="card" key={order.id} style={{}}>
                    <img
                      className="card-img-top"
                      key={order.id}
                      src={
                        // eslint-disable-next-line @typescript-eslint/no-var-requires
                        require(`../../assets/${order.flavor.description}.png`)
                          .default
                      }
                      alt="order"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Pedido: {order.id}</h5>
                      <hr />
                      <i>
                        <h6>Criado: {order.createdAt}</h6>
                        <h6>
                          Estimativa de entrega: {order.estimatedDelivery}
                        </h6>
                      </i>
                      <hr />
                      <p className="card-text">
                        <strong>Sabor:</strong>
                        {capitalizeFirstLetter(
                          order.flavor.description != null
                            ? order.flavor.description
                            : '',
                        )}
                      </p>
                      <hr />
                      <p className="card-text">
                        <strong>Tipo Massa: </strong>
                        {order.dough.description}
                      </p>
                      <hr />
                      <p className="card-text">
                        <strong>Tamanho: </strong>
                        {order.size.description}
                      </p>
                      <hr />
                      <p className="card-text">
                        <strong>Preço Total: </strong>
                        {order.totalPrice.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </OrderInfo>
    </>
  );
};

export default UserOrder;
