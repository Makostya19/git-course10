import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../services/api';
import '../index.css';

export default function SignIn() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      // API Realworld принимает { user: { email, password } }
      const res = await api.login({
        user: {
          email: data.email,
          password: data.password
        }
      });

      login(res.user);
      localStorage.setItem('token', res.user.token);

      navigate('/');
    } catch (e) {
      // обработка ошибок 422
      if (e?.errors) {
        Object.entries(e.errors).forEach(([field, messages]) => {
          setError(field, { message: messages[0] });
        });
      } else {
        setError('email', { message: 'Invalid email or password' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>SIGN IN</h1>

      <input
        placeholder="Email"
        {...register('email', { required: true })}
      />
      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: true })}
      />
      {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

      <button type="submit">Sign in</button>
    </form>
  );
}
