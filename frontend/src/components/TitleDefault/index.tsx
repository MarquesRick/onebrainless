import React from 'react';
import { Title } from './styles';

const TitleDefault = (props: any) => {
  const { name } = props;
  return (
    <>
      <Title>{name}</Title>
    </>
  );
};

export default TitleDefault;
