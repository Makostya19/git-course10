import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../index.css';

export default function SignUp() {
  const { register, handleSubmit, setError, watch } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      login(res.user);
      navigate('/');
    } catch (e) {
      if (e?.errors) {
        Object.entries(e.errors).forEach(([field, messages]) => {
          setError(field, { message: messages[0] });
        });
      } else {
        console.error('Sign up error:', e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>SIGN UP</h1>

      <input
        placeholder="Username"
        {...register('username', {
          required: true,
          minLength: 3,
          maxLength: 20,
        })}
      />

      <input
        placeholder="Email"
        {...register('email', { required: true })}
      />

      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: true,
          minLength: 6,
          maxLength: 40,
        })}
      />

      <input
        type="password"
        placeholder="Repeat password"
        {...register('repeatPassword', {
          validate: (v) => v === watch('password'),
        })}
      />

      <label>
        <input type="checkbox" {...register('agree', { required: true })} />
        I agree
      </label>

      <button type="submit">Sign up</button>
    </form>
  );
}
