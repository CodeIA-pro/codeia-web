import { useState } from 'react';
import { Button, FormGroup, Input } from '@mui/material';
import { useNotification } from './hooks/useNotification';
import { useLogin } from './queries/useAuth';
import { LoginRequest } from './interfaces/auth/auth.interface';

const LoginState: LoginRequest = {
  email: '',
  password: '',
};


export const AppTwo = () => {
  const [counter, setCounter] = useState(0);
  const { isSuccess, isError, isPending, error, mutate, data} = useLogin();
  const [credential, setCredential] = useState<LoginRequest>(LoginState);
  const { getSuccess, getWarning } = useNotification();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  };

  const sum = () => {
    setCounter(counter + 1);
    getSuccess('Project created successfully');
  }

  const res = () => {
    setCounter(counter - 1);
    getWarning('Project update successfully');
  }

  const onSubmit = () => {
    // Lógica para enviar las credenciales al servidor
    mutate(credential);
  }

  return (
    <div>
      <Button onClick={sum}>Click me</Button>
      <Button onClick={res}>Click me 2</Button>
      <p>{counter}</p>
      <h1 className="text-1xl font-bold underline text-red-500">
        Hello world!
      </h1>
      {
        isPending ? <p>Loading...</p> 
        : isSuccess ? <p>Hola {data.name}</p>
        : isError ? <p>Error { `${error}`}</p>
        : <p>Logeate</p>
      }
      <div className='flex'>
      <FormGroup>
        <Input
          type="email"
          name="email"
          value={credential.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          value={credential.password}
          onChange={handleChange}
        />
      <Button type="submit" color="primary" variant="contained" onClick={onSubmit}>Login</Button>
    </FormGroup>
      </div>
    </div>
  )
}