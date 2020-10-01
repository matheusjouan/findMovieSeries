import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
}

const Input: React.FC<InputProps> = ({ name, type, ...rest }) => (
  <Container type={type} name={name} {...rest} />
);

export default Input;
