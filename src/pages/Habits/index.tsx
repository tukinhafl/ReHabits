import { Menu } from "../../components/Menu";
import styled from "styled-components";
import { HabitsContext } from "../../providers/Habits";
import { useContext, useEffect, useState } from "react";
import { CardHabits } from "../../components/CardHabits";
import { ModalHabit } from "../../components/ModalHabit";
import { ModalEditHabit } from "../../components/ModalEditHabit";
import { Redirect } from "react-router-dom";
import { LoginContext } from "../../providers/Login";

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 95%;
  max-width: 1366px;
  height: 88vh;
  background-color: var(--white);
  border-radius: 10px;
  padding: 0.75rem;

  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0;
    height: 90vh;
  }

  h1 {
    font-family: var(--font-title);
    font-size: 3rem;
    font-weight: 400;
  }
`;

const StyledBackground = styled.div`
  background-color: var(--background);
  width: 100%;
  min-height: calc(100vh - 55px);
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`;

const StyledContainer = styled.div`
  background-color: var(--background);
  height: calc(100vh - 55px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const ButtonPosition = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    height: 65px;
    width: 30%;
    border-radius: 7px;
    border: 2px solid black;
    background-color: var(--gold);
    font-size: 1.5rem;
    font-weight: bold;
    margin: 15px 0px 10px 0px;
    cursor: pointer;
    transition: filter 0.2s;
    font-family: var(--font-button);

    @media (max-width: 600px) {
      width: 80%;
    }
  }

  button:hover {
    filter: brightness(110%);
  }
`;

const StyledHabitsContainer = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  @media (max-width: 800px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }

  > div {
    width: 50%;
    padding: 2rem 2rem 0rem 2rem;

    @media (max-width: 800px) {
      width: 100%;
      padding: 1rem 0rem 0rem 0rem;
    }

    > div {
      min-height: 150px;

      @media (max-width: 800px) {
        min-height: 120px;
      }

      @media (max-width: 350px) {
        min-height: 150px;
      }
    }
  }
`;

export const Habits = () => {
  const { habits, getHabits } = useContext(HabitsContext);
  const [modal, setModal] = useState<string>("closed");

  const { isLogged } = useContext(LoginContext);

  useEffect(() => {
    getHabits();
    // eslint-disable-next-line
  }, []);

  if (isLogged === null) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Menu />
      {modal === "closed" ? (
        <>
          <StyledContainer>
            <StyledContent>
              <h1>Seus H??bitos</h1>
              <StyledHabitsContainer>
                {habits.map((elm, i) => (
                  <CardHabits key={i} eachHabits={elm} setModal={setModal} />
                ))}
              </StyledHabitsContainer>
              <ButtonPosition>
                <button onClick={() => setModal("create")}>
                  Adicionar H??bito
                </button>
              </ButtonPosition>
            </StyledContent>
          </StyledContainer>
        </>
      ) : modal === "create" ? (
        <StyledBackground>
          <ModalHabit setModal={setModal} />
        </StyledBackground>
      ) : (
        <StyledBackground>
          <ModalEditHabit setModal={setModal} />
        </StyledBackground>
      )}
    </>
  );
};
