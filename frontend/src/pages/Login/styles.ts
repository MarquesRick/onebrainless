import styled, { css } from 'styled-components';

import { shade } from 'polished';

interface IFormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 30px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
  text-align: center;
`;

export const Form = styled.form<IFormProps>`
  /* margin-top: 50px;
  max-width: 700px;
  display: flex; */
  text-align: center;
  body {
    text-align: center;
  }

  input {
    width: 300px;
    /* flex: 1;
    height: 70px;
    width: 80px;
    padding: 0 24px;
    border: 2px solid #fff;
    border-radius: 5px 0 0px 5px;
    color: #3a3a3a;
    border-right: 0; */

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 100px;
    background-color: orange;
    border-radius: 5px 5px 5px 5px;
    border: 0;
    color: #fff;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
