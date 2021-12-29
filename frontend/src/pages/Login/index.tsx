import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { api } from '../../services/api';
import { Title, Form, Error } from './styles';

interface ILoginResponse {
  id: number;
  username: string;
  email: string;
  token: string;
  message: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [inputError, setInputError] = useState('');
  const formEl = useRef<HTMLFormElement | null>(null);

  function handleInputLoginChange(event: ChangeEvent<HTMLInputElement>): void {
    setLogin(event.target.value);
  }

  function handleInputPasswordChange(
    event: ChangeEvent<HTMLInputElement>,
  ): void {
    setPassword(event.target.value);
  }

  function redirectToHome(): void {
    history.push('/home');
  }

  async function handleGetLogin(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    //não executa mais reload no onSubmit
    event.preventDefault();

    if (!login) {
      setInputError('Informe seu login! ⚠️');
      return;
    }

    if (!password) {
      setInputError('Informe sua senha! ⚠️');
      return;
    }

    try {
      const user = {
        login: login,
        password: password,
      };

      const response = await api.post<ILoginResponse>(`/auth`, user);

      if (response.status === 400) {
        setInputError('Erro inesperado!☹️ tente novamente mais tarde!');
        return;
      }

      console.log(response.data);

      const loginResponse = response.data;

      switch (loginResponse.message) {
        case 'notFound': {
          setInputError('Usuário não encontrando!');
          return;
        }
        case 'error': {
          setInputError('Erro inesperado!☹️ tente novamente mais tarde!');
          return;
        }
        case 'incorrectPass': {
          setInputError('Senha incorreta!');
          return;
        }
        default: {
          setInputError('');
          formEl.current?.reset();
          localStorage.setItem('@One:user', loginResponse.email);
          localStorage.setItem('@One:user_name', loginResponse.username);
          localStorage.setItem('@One:user_token', loginResponse.token);
          localStorage.setItem(
            '@One:user_id',
            loginResponse?.id != null ? loginResponse?.id.toString() : '',
          );
          redirectToHome();
          break;
        }
      }
    } catch {
      setInputError('Usuário não encontrado! :( ');
    }
  }

  return (
    <>
      <Title>Onebrainless Pizza 🍕</Title>

      <Form
        ref={formEl}
        hasError={Boolean(inputError)}
        onSubmit={handleGetLogin}
      >
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Login 😬</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              placeholder="login"
              onChange={handleInputLoginChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Senha 🔑</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="password"
              placeholder="senha"
              onChange={handleInputPasswordChange}
            />
          </div>
        </div>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </div>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      {/* <Repos> */}
      {/*Uso de 'index' para evitar erro de chave composta do navegador */}
      {/* {repos.map((repository, index) => (
          <Link
            to={`/repositories/${repository.full_name}`}
            key={repository.full_name + index}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repos> */}
    </>
  );
};

export default Login;
