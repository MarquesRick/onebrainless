import styled from 'styled-components';

import { shade } from 'polished';

export const Hr = styled.hr`
  margin-top: 30px;
  margin-bottom: 30px;
  max-width: 400px;

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
