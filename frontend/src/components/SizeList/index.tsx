import React, { useEffect, useState } from 'react';
import { apiToken } from '../../services/api';
import { Size } from '../../types/Size';
import { SizeInfo } from './styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SizeList = (props: any) => {
  const [size, setSize] = useState<Size[] | null>(null);
  console.log(props);
  useEffect(() => {
    apiToken()
      .get<Size[]>(`/sizes`)
      .then(response => setSize(response.data));
  }, []);

  const onTrigger = (size: Size) => {
    props.parentCallback(size);
  };

  return (
    <>
      <SizeInfo>
        {size &&
          size.map((size, index) => (
            <div key={index} className="card text-center">
              <div className="card-body">
                <h5 className="card-title">{size.measure}</h5>
                <input
                  type="radio"
                  name="select-size"
                  id={size.id.toString()}
                  onClick={() => onTrigger(size)}
                />
              </div>
            </div>
          ))}
      </SizeInfo>
    </>
  );
};

export default SizeList;
