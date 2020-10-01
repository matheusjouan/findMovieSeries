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

interface SubmitButtonProps {
  data: string;
  typeSearch: string | undefined;
}

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Menu = styled.div`
  width: 300px;
  padding: 15px;
  max-width: 100%;
  border-right: 1px solid #eee;

  h1 {
    font-size: 25px;
    font-weight: 700;
    text-transform: uppercase;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
  }

  div.buttons-group {
    margin-top: 10px;
  }
`;

export const SubmitButton = styled.button.attrs((props: SubmitButtonProps) => ({
  disabled: !(props.data && props.typeSearch),
}))<SubmitButtonProps>`
  flex: 1;
  width: 100%;
  margin-top: 10px;
  height: 40px;
  padding: 0 40px;

  color: #fff;
  font-size: 16px;

  border: 0;
  border-radius: 2px;

  background: #eee;
  cursor: not-allowed;

  text-align: center;
  text-transform: uppercase;
  font-weight: 700;

  & + button {
    margin-left: 20px;
  }

  ${props =>
    props.data !== '' &&
    props.typeSearch !== undefined &&
    css`
      background-color: #389cf2;
      cursor: pointer;
      :disabled={false}
    `}
`;

export const Loading = styled.div<LoadingProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 300px);
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

export const SearchList = styled.section`
  flex: 1;
  padding: 20px 15px;

  > h1 {
    font-size: 25px;
    font-weight: 700;
    text-transform: uppercase;
  }

  > p {
    margin-top: 10px;
    font-size: 16px;
  }
`;

export const SearchResult = styled.div``;

export const PageActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
  padding-bottom: 30px;

  button {
    color: #389cf2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border: 0;
    margin-left: 10px;
    margin-right: 10px;

    background: transparent;

    :disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;
