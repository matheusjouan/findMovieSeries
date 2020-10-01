import React, { useState, useCallback, FormEvent } from 'react';

import { FiChevronsLeft, FiChevronsRight, FiLoader } from 'react-icons/fi';
import {
  Container,
  Menu,
  SearchList,
  SubmitButton,
  PageActions,
  Loading,
} from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';
import SearchResultItem from '../../components/SearchResultItem';

import ModalShowItem from '../../components/ModalShowItem';

import api from '../../services/api';

export interface ISearchItem {
  Title: string;
  Year: string;
  imdbID: string;
}

interface IResponseData {
  Search: ISearchItem[];
  totalResults: number;
  Reponse: boolean;
}

const Dashboard: React.FC = () => {
  // Estado referente ao tipo da pesquisa (filme/série)
  const [selectedTypeSearch, setSelectedTypeSearch] = useState<
    string | undefined
  >();

  // Estados controle de seleção dos botões
  const [selectedTypeButtonMovie, setSelectedTypeButtonMovie] = useState(false);
  const [selectedTypeButtonSerie, setSelectedTypeButtonSerie] = useState(false);

  // Estado das informações referente a pesquisa
  const [data, setData] = useState<IResponseData>({} as IResponseData);

  // Valor do input digitado
  const [formData, setFormData] = useState('');
  const [page, setPage] = useState(1);

  // Estado abri/fechar modal
  const [modalShowOpen, setModalShowOpen] = useState(false);

  // Valor do item selecioado que será passado para o Modal por props
  const [itemId, setItemId] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSelectTypeSearch = useCallback((type: string) => {
    if (type === 'movie') {
      setSelectedTypeButtonMovie(true);
      setSelectedTypeButtonSerie(false);
    } else {
      setSelectedTypeButtonMovie(false);
      setSelectedTypeButtonSerie(true);
    }
    setSelectedTypeSearch(type);
  }, []);

  const handleSubmitForm = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();

        setLoading(true);

        const response = await api.get(
          `/?apikey=f7004bde&s=${formData}&type=${selectedTypeSearch}&page=1`,
        );

        setData(response.data);
        setPage(1);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
    [formData, selectedTypeSearch],
  );

  const handlePage = useCallback(
    async action => {
      let nextPage = page;

      if (action === 'next') {
        nextPage = page + 1;
      } else {
        nextPage = page - 1;
      }

      const response = await api.get(
        `/?apikey=f7004bde&s=${formData}&type=${selectedTypeSearch}&page=${nextPage}`,
      );

      setPage(nextPage);
      setData(response.data);
    },
    [page, formData, selectedTypeSearch],
  );

  const toggleShowModal = useCallback(() => {
    setModalShowOpen(!modalShowOpen);
  }, [modalShowOpen]);

  const openModal = useCallback(
    (id: string) => {
      setItemId(id);
      toggleShowModal();
    },
    [toggleShowModal],
  );

  return (
    <Container>
      <Menu>
        <h1>Pesquisar</h1>
        <p>O que deseja buscar?</p>

        <form onSubmit={handleSubmitForm}>
          <div className="buttons-group">
            <Button
              type="button"
              onClick={() => handleSelectTypeSearch('movie')}
              style={{
                borderColor: selectedTypeButtonMovie ? '#389cf2' : '#ccc',
                color: selectedTypeButtonMovie ? '#389cf2' : '#777',
              }}
            >
              Filmes
            </Button>
            <Button
              type="button"
              onClick={() => handleSelectTypeSearch('series')}
              style={{
                borderColor: selectedTypeButtonSerie ? '#389cf2' : '#ccc',
                color: selectedTypeButtonSerie ? '#389cf2' : '#777',
              }}
            >
              Séries
            </Button>
          </div>

          <Input
            type="text"
            name="search"
            placeholder="Termo da busca (ex: Avatar)"
            onChange={e => setFormData(e.target.value)}
          />

          <SubmitButton
            type="submit"
            data={formData}
            typeSearch={selectedTypeSearch}
          >
            Pesquisar
          </SubmitButton>
        </form>
      </Menu>

      <ModalShowItem
        isOpen={modalShowOpen}
        setIsOpen={toggleShowModal}
        itemId={itemId}
      />

      {loading ? (
        <Loading loading={loading}>
          <FiLoader size={60} />
          <span>Carregando...</span>
        </Loading>
      ) : (
        <SearchList>
          {data.Search ? (
            <div>
              <h1>RESULTADOS DA BUSCA ({data.totalResults} RESULTADOS)</h1>

              {data.Search.map((item: ISearchItem) => (
                <SearchResultItem
                  key={item.imdbID}
                  item={item}
                  handleSelectItem={() => openModal(item.imdbID)}
                />
              ))}

              <PageActions>
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => handlePage('back')}
                >
                  <FiChevronsLeft size={20} color="#389cf2" />
                </button>
                <span>
                  pág {page} a {Math.ceil(data.totalResults / 10)}
                </span>
                <button
                  type="button"
                  onClick={() => handlePage('next')}
                  disabled={page >= Math.ceil(data.totalResults / 10)}
                >
                  <FiChevronsRight size={20} color="#389cf2" />
                </button>
              </PageActions>
            </div>
          ) : (
            <div>
              <h1>Resultado da busca</h1>
              <p>Utilize o formulário ao lado para buscar um filme ou série.</p>
            </div>
          )}
        </SearchList>
      )}
    </Container>
  );
};

export default Dashboard;
