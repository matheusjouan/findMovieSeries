import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 20px;
  margin-top: 30px;
  border-top: 1px solid #ddd;

  & + div {
    margin-top: 30px;
  }

  h1 {
    font-size: 25px;
    font-weight: 700;
    text-transform: uppercase;

    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  strong {
    font-weight: 700;
    font-size: 20px;
  }

  span {
    font-size: 16px;
    margin-bottom: 5px;
  }

  button {
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
