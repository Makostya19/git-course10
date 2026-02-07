import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../services/api';
import '../index.css';

export default function SignIn() {
  const { register, handleSubmit, setError } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.login(data.email, data.password);
      login(res.user);
      navigate('/');
    } catch {
      setError('email', { message: 'Invalid email or password' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>SIGN IN</h1>
      <input placeholder="Email" {...register('email', { required: true })} />
      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
      />
      <button type="submit">Sign in</button>
    </form>
  );
}
