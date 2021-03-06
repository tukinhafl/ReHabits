import { Input } from "../Input";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { useContext } from "react";
import { LoginContext } from "../../providers/Login";
import { useUserId } from "../../providers/UserId";
import toast from "react-hot-toast";
import { IFormProps } from '../../types'

export const FormLogin = () => {
  const history = useHistory();
  const { setUserId } = useUserId();
  const { setIsLogged } = useContext(LoginContext);

  const formSchema = yup.object().shape({
    username: yup.string().required("Usuário obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const formSubmit = async (data: IFormProps) => {
    try {
      const resp = await api.post("/sessions/", data)
        const { access } = resp.data;
        localStorage.setItem("token", JSON.stringify(access));
        setUserId(access);
        setIsLogged(localStorage.getItem("token"));
        history.push("/dashboard");
        window.location.reload();
    }
    catch {
      toast.error("Usuário ou senha inválido")
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="inputDiv">
        <Input
          error={errors.username?.message}
          name="username"
          register={register}
          placeholder="Coloque seu usuário"
          label="Usuário"
        />
      </div>
      <div className="inputDiv">
        <Input
          error={errors.password?.message}
          name="password"
          register={register}
          placeholder="Coloque sua senha"
          label="Senha"
          type="password"
        />
      </div>
      <button type="submit">Login</button>
      <p>
        Ainda não possui uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </form>
  );
};
