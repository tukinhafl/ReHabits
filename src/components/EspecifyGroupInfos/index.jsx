import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../services/api";

const Container = styled.div`
  width: 100%;
  height: 60px;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    height: 55px;
    width: 300px;
    border-radius: 7px;
    border: 2px solid black;
    background-color: var(--gold);
    font-size: 1.5rem;
    font-weight: bold;
    margin: 15px 0px 10px 0px;
    cursor: pointer;
    transition: filter 0.2s;
    font-family: var(--font-button);

    &:hover {
      filter: brightness(110%);
    }
  }

  h1 {
    font-size: 3rem;
  }
`;

export const EspecifyGroupInfos = () => {
  const [dataGroup, setDataGroup] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));

  const gettingDataFromGroups = async () => {
    const resp = await api.get(`/groups/${id}/`);
    setDataGroup(resp.data);
  };

  useEffect(() => {
    gettingDataFromGroups();
    // eslint-disable-next-line
  }, []);

  const handleSubscribe = async (id) => {
    await api
      .post(
        `groups/${id}/subscribe/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => alert("Voce já é inscrito nesse canal!"));
  };

  return (
    <Container>
      <Content>
        <button onClick={() => history.push("/groups")}>Voltar</button>
        <div>
          <h1>Nome: {dataGroup.name}</h1>
        </div>
        <button onClick={() => handleSubscribe(id)}>Inscrever-se</button>
      </Content>
    </Container>
  );
};
