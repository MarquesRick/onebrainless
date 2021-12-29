import React, { useEffect, useState } from 'react';
import { apiToken } from '../../services/api';
import { Dough } from '../../types/Dough';
import { DoughInfo } from './styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DoughList = (props: any) => {
  const [dough, setDough] = useState<Dough[] | null>(null);

  useEffect(() => {
    apiToken()
      .get<Dough[]>(`/doughs`)
      .then(response => setDough(response.data));
  }, []);

  const onTrigger = (dough: Dough): void => {
    props.parentCallback(dough);
  };

  return (
    <>
      <DoughInfo>
        {dough &&
          dough.map((dough, index) => (
            <div key={index} className="card text-center">
              <div className="card-body">
                <h5 className="card-title">{dough.description}</h5>
                <input
                  type="radio"
                  name="select-dough"
                  id={dough.id.toString()}
                  onClick={() => onTrigger(dough)}
                />
              </div>
            </div>
          ))}
      </DoughInfo>
    </>
  );
};

export default DoughList;
