import styled, { keyframes, css } from 'styled-components';

interface LoadingProps {
  loading: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 100%;
`;

export const Loading = styled.div<LoadingProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #bbb;

  span {
    font-size: 16px;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 20px;

  button {
    margin-top: 10px;
    height: 25px;
    width: 130px;
    padding: 0 20px;

    color: #389cf2;
    font-size: 14px;
    align-items: center;

    background: transparent;
    border: 1px solid #389cf2;

    text-transform: uppercase;
    transition: all 0.3s;

    &:hover {
      background: #389cf2;
      color: #fff;
    }
  }
`;
