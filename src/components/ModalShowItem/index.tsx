import React, { useState, useEffect } from 'react';

import { FiLoader } from 'react-icons/fi';
import Modal from '../Modal';

import { Container, InfoItem, Item, Loading } from './styles';
import api from '../../services/api';

interface IData {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  Poster: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  itemId: string;
}

const ModalShowUser: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  itemId,
}) => {
  const [data, setData] = useState<IData>({} as IData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await api.get(`?apikey=f7004bde&i=${itemId}`);

        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    loadData();
  }, [itemId]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {loading ? (
        <Loading loading={loading}>
          <FiLoader size={60} />
          <span>Carregando...</span>
        </Loading>
      ) : (
        <Container>
          <Item>
            {data.Poster !== 'N/A' && (
              <img src={data.Poster} alt={data.Title} />
            )}

            <InfoItem>
              <h1>{data.Title}</h1>
              <span>
                <strong>Ano: </strong>
                {data.Year}
              </span>
              <span>
                <strong>Gênero: </strong>
                {data.Genre}
              </span>
              <span>
                <strong>Diretor: </strong>
                {data.Director}
              </span>
              <span>
                <strong>Atores: </strong>
                {data.Actors}
              </span>

              <button type="button" onClick={setIsOpen}>
                Fechar
              </button>
            </InfoItem>
          </Item>
        </Container>
      )}
    </Modal>
  );
};

export default ModalShowUser;
