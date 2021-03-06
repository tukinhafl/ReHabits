import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import api from "../../services/api";
import { ICardActivitiesProps } from "../../types";

const StyledContainer = styled.li`
  width: 500px;
  min-height: 100px;

  margin-bottom: 1rem;

  background-color: var(--gold);

  border: 2px solid black;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 600px) {
    width: 98%;
    overflow-x: hidden;
  }
`;

const StyledMainContent = styled.div`
  width: 100%;

  margin-top: 0.8rem;

  display: flex;
  justify-content: space-between;
`;

const StyledTitleDiv = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
  h1 {
    font-family: var(--title-font);
    font-size: 1rem;
    text-align: center;

    @media (max-width: 600px) {
      margin-left: 15px;
    }
  }
`;

const StyledDeleteDiv = styled.div`
  i {
    width: 20px;
    height: 20px;

    margin-right: 2rem;

    color: var(--red);

    cursor: pointer;
  }
`;

const StyledButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    height: 30px;
    width: 40%;
    border-radius: 7px;
    border: 2px solid black;
    background-color: var(--gray);
    font-size: 1rem;
    font-weight: bold;
    margin: 15px 0px 10px 0px;
    cursor: pointer;
    transition: filter 0.2s;
    font-family: var(--font-button);

    &:hover {
      filter: brightness(110%);
    }
  }
`;

export const CardActivity = ({
  actv,
  setIdActivity,
  modal,
  setModal,
  gettingDataFromGroups,
}: ICardActivitiesProps) => {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  const [groupActivities, setGroupActivities] = useState<{id: string}[]>([]);

  const removeFromActivities = async (id: string) => {
    try {
      await api.delete(`activities/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      gettingDataFromGroups();
      setGroupActivities(groupActivities.filter((elm) => elm.id !== id));
      toast.success('Item removido com sucesso')
    }
    catch {
      toast.error('Algo deu errado')
    }
  };

  return (
    <>
      <StyledContainer>
        <StyledMainContent>
          <StyledTitleDiv>
            <h1>{actv.title}</h1>
          </StyledTitleDiv>
          <StyledDeleteDiv>
            <i
              onClick={() => removeFromActivities(actv.id)}
              className="fas fa-minus-circle"
            />
          </StyledDeleteDiv>
        </StyledMainContent>
        <StyledButtonDiv>
          <button
            onClick={() => {
              setModal(!modal);
              setIdActivity(actv.id);
            }}
          >
            Editar
          </button>
        </StyledButtonDiv>
      </StyledContainer>
    </>
  );
};
