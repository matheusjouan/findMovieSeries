import React from 'react';

import { ISearchItem } from '../../pages/Dashboard';

import { Container } from './styles';

interface IResultProps {
  item: ISearchItem;
  handleSelectItem(): void;
}

const SearchResultItem: React.FC<IResultProps> = ({
  item,
  handleSelectItem,
}) => {
  return (
    <Container>
      <strong>{item.Title}</strong>
      <span>Ano: {item.Year}</span>
      <button type="button" onClick={handleSelectItem}>
        Ver Detalhes
      </button>
    </Container>
  );
};

export default SearchResultItem;
