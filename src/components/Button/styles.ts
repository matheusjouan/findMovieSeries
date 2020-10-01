import styled from 'styled-components';

export const Container = styled.button`
  flex: 1;
  height: 35px;
  padding: 0 40px;

  font-size: 14px;
  color: #777;
  border: 1px solid #ccc;
  background: transparent;

  text-align: center;
  text-transform: uppercase;

  & + button {
    margin-left: 20px;
  }
`;
