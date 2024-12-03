import './App.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


const schema = yup
  .object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email().required("O e-mail é obrigatório"),
    password: yup.string().min(6, "A senha deve conter pelo menos 6 caracteres").required("A senha é obrigatória"),
    confirmPassword: yup.string().required("Confirme sua a senha").oneOf([yup.ref('password')], "As senhas nao conferem"),
  })
  .required();

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  function onSubmit(userData) {
    console.log(userData);
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>

      <h1>Formulário de cadastro</h1>
      <label>
        Nome
        <input type="text" placeholder="Digite seu nome" {...register('name')} />
        <span>{errors.name?.message}</span>
      </label>

      <label>
        E-mail
        <input type="text" placeholder="Digite seu e-mail" {...register('email')} />
        <span>{errors.email?.message}</span>
      </label>

      <label>
        Senha
        <input type="password" placeholder="Digite sua senha" {...register('password')} />
        <span>{errors.password?.message}</span>
      </label>

      <label>
        Confirme sua senha
        <input type="password" placeholder="Confirme sua senha" {...register('confirmPassword')} />
        <span>{errors.confirmPassword?.message}</span>
      </label>

      <button type='submit'>Cadastrar</button>
    </form>
  )
}
export default App;
