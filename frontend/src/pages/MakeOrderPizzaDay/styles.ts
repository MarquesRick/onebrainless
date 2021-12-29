import styled from 'styled-components';

import { shade } from 'polished';

export const Hr = styled.hr`
  margin-top: 30px;
  margin-bottom: 30px;
  max-width: 180px;

  &:hover {
    background-color: ${shade(0.2, '#F3701F')};
  }
`;

export const Container = styled.div`
  margin-top: 15%;
  a {
    &:hover {
      color: ${shade(0.1, '#F3701F')};
    }
  }
`;

export const ButtonGridMakeOrder = styled.button`
  width: 180px;
  display: block;
  padding: 10px 10px 10px 10px;
  background-color: #f3701f;
  border-radius: 5px 5px 5px 5px;
  border: 0;
  color: #fff;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#3CA7F1')};
  }
  &:active {
    background-color: ${shade(0.2, '#3CA7F1')};
  }
`;

export const DivGrid = styled.div`
  position: absolute;
  bottom: 20px;
  left: 80px;
  width: 1000px;
  float: left;
  text-align: center;
`;

export const DataOrderInfo = styled.section`
  font-size: 20px;

  input {
    font-size: 15pt;
    min-width: 400px;
    max-width: 800px;
  }
`;

export const ButtonDataOrderSubmit = styled.button`
  width: 180px;
  margin-top: 100px;
  display: block;
  padding: 10px 10px 10px 10px;
  background-color: #f3701f;
  border-radius: 5px 5px 5px 5px;
  border: 0;
  color: #fff;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#3CA7F1')};
  }
  &:active {
    background-color: ${shade(0.2, '#3CA7F1')};
  }
`;
