import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/useAuth';
import '../index.css';

export default function SignUp() {
  const { register, handleSubmit, setError, watch, formState: { errors } } = useForm();
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
        {...register('username', { required: true, minLength: 3, maxLength: 20 })}
      />
      {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
      <input placeholder="Email" {...register('email', { required: true })} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: true, minLength: 6, maxLength: 40 })}
      />
      {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      <input
        type="password"
        placeholder="Repeat password"
        {...register('repeatPassword', {
          validate: (v) => v === watch('password') || 'Passwords must match',
        })}
      />
      {errors.repeatPassword && <p style={{ color: 'red' }}>{errors.repeatPassword.message}</p>}
      <label>
        <input type="checkbox" {...register('agree', { required: 'You must agree' })} /> I agree
      </label>
      {errors.agree && <p style={{ color: 'red' }}>{errors.agree.message}</p>}
      <button type="submit">Sign up</button>
    </form>
  );
}
