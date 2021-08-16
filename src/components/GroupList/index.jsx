import styled from "styled-components";
import { StyledBackgroundGroups } from "../BackgroundGroups";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { CardGroup } from "../CardGroup";
import { useHistory } from "react-router";
import { Modal, ButtonPosition } from '../ModalHabit'
import { Input } from '../Input'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const StyledGroupList = styled.ul`
  @media (min-width: 280px) {
    display: flex;
    margin: 0;
    width: 100%;
    align-items: center;
    flex-direction: column;
  }
  @media (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
    height: 75%;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
    overflow: auto;

    h2 {
      width: 100%;
    }
  }
  @media (min-width: 1024px) {
    height: 85%;
  }
  @media (min-width: 1200px) {
    height: 70%;
  }
`;

export const StyledGoalsActivitiesList = styled.ul`
  width: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 550px;
  overflow: auto;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const [showMyGroups, setShowMyGroups] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    api.get("/groups/").then((resp) => setGroups(resp.data.results));
  }, []);

  const enterGroupInterface = (id) => {
    history.push(`/${id}`);
  };

  const getMyGroups = async () => {
    const response = await api.get("/groups/subscriptions/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMyGroups(response.data);
    setShowMyGroups(!showMyGroups);
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Titulo obrigatório").max(20, "Máximo de 20 characteres atingido"),
    description: yup.string().required("Descrição obrigatória"),
    category: yup.string().required("Categoria obrigatória"),
});

  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm({
      resolver: yupResolver(formSchema),
  });

  const handleCreateGroup = async (data) => {
    const resp = await api.post('/groups/', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    alert('grupo criado')
  }

  return (
    <StyledBackgroundGroups background="#F5F3EB">
      <div className="containerGroups">
        <div id="headerPosition">
          <button onClick={() => setModalOpen(true)}>Criar grupos</button>
          <h1>Grupos</h1>
          <button onClick={getMyGroups}>
            {showMyGroups ? "Todos os grupos" : "Meus grupos"}
          </button>
        </div>
        {!showMyGroups ? (
          <StyledGroupList>
            {groups?.map((el) => (
              <CardGroup
                key={el.id}
                title={el.name}
                category={el.category}
                handleFunction={() => enterGroupInterface(el.id)}
              />
            ))}
          </StyledGroupList>
        ) : (
          <StyledGroupList>
            {myGroups?.map((el) => (
              <CardGroup key={el.id} title={el.name} category={el.category} />
            ))}
          </StyledGroupList>
        )}
        <button className="back" onClick={() => history.push("/dashboard")}>
          Voltar
        </button>
      </div>
      {modalOpen && 
      <Modal style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <form onSubmit={handleSubmit(handleCreateGroup)}>
          <i
            onClick={() => setModalOpen(false)}
            class="fas fa-chevron-left"
            id="return"
          />
          <div>
            <div>
              <Input
                error={errors.title?.message}
                name="name"
                register={register}
                placeholder="Coloque um titulo"
                label="Titulo"
              />
            </div>
            <div>
              <Input
                error={errors.description?.message}
                name="description"
                register={register}
                placeholder="Coloque uma descrição"
                label="Descrição"
              />
            </div>
            <div>
              <Input
                error={errors.category?.message}
                name="category"
                register={register}
                placeholder="Coloque uma categoria"
                label="Categoria"
              />
            </div>
          </div>
          <ButtonPosition>
            <button style={{ width: `250px` }} type="submit">
              Adicionar
            </button>
          </ButtonPosition>
        </form>
      </Modal> }
    </StyledBackgroundGroups>
  );
};
