import React, { useEffect, useState } from 'react';
import { apiToken } from '../../services/api';
import { PizzaDay } from '../../types/PizzaDay';
import capitalizeFirstLetter from '../../util';
import { ImagePizzaDay } from './styles';

const PizzaOfDay = () => {
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
  }, []);

  function calculateTotalPrice(): string {
    const value =
      (pizzaDay?.dough.price != null ? pizzaDay?.dough.price : 0) +
      (pizzaDay?.flavor.price != null ? pizzaDay?.flavor.price : 0) +
      (pizzaDay?.size.price != null ? pizzaDay?.size.price : 0);
    return value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <>
      {pizzaDay && (
        <div className="content">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Sabor:</label>
            <div className="col-sm-2">
              <strong className="form-control-plaintext">
                {capitalizeFirstLetter(
                  pizzaDay.flavor?.description != null
                    ? pizzaDay.flavor?.description
                    : '',
                )}
              </strong>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Tamanho:</label>
            <div className="col-sm-2">
              <strong className="form-control-plaintext">
                {pizzaDay.size.description}
              </strong>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Tipo da Massa:</label>
            <div className="col-sm-2">
              <strong className="form-control-plaintext">
                {pizzaDay.dough.description}
              </strong>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Price:</label>
            <div className="col-sm-2">
              <strong className="form-control-plaintext">
                {calculateTotalPrice()}
              </strong>
            </div>
          </div>
          <ImagePizzaDay
            src={
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              require(`../../assets/${pizzaDay.flavor.description}.png`).default
            }
          />
        </div>
      )}
    </>
  );
};

export default PizzaOfDay;
