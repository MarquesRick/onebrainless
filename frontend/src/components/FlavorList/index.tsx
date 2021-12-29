import React, { useEffect, useState } from 'react';
import { apiToken } from '../../services/api';
import { Flavor } from '../../types/Flavor';
import capitalizeFirstLetter, { replaceToComma } from '../../util';
import { FlavorInfo } from './styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlavorList = (props: any) => {
  const [flavor, setFlavor] = useState<Flavor[] | null>(null);
  const [teste, setTeste] = useState<boolean>(false);

  useEffect(() => {
    apiToken()
      .get<Flavor[]>(`/flavors`)
      .then(response => setFlavor(response.data));
  }, []);

  const onTrigger = (flavor: Flavor): void => {
    setTeste(true);
    props.parentCallback(flavor);
  };

  return (
    <>
      <FlavorInfo>
        {flavor &&
          flavor.map(flavor => (
            <div className="container" key={flavor.id}>
              <div className="row">
                <div className="col col-lg-12">
                  <div className="card" key={flavor.id} style={{}}>
                    <img
                      className="card-img-top"
                      key={flavor.id}
                      src={
                        // eslint-disable-next-line @typescript-eslint/no-var-requires
                        require(`../../assets/${flavor.description}.png`)
                          .default
                      }
                      alt="flavor"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {capitalizeFirstLetter(
                          flavor?.description != null
                            ? flavor?.description
                            : '',
                        )}
                      </h5>
                      <hr />
                      <p className="card-text">
                        <strong>Ingredientes:</strong>
                        <br />
                        {replaceToComma(
                          flavor?.ingredients != null
                            ? flavor?.ingredients
                            : '',
                        )}
                      </p>
                      <label>
                        Quero esse!{'   '}
                        <input
                          className="btn btn-primary"
                          type="radio"
                          name="select-flavor"
                          id={flavor.id.toString()}
                          onClick={() => onTrigger(flavor)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </FlavorInfo>
    </>
  );
};

export default FlavorList;
