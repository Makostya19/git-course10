import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, login } = useAuth();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      image: user?.image || '',
    },
  });

  const onSubmit = async (data) => {
    const res = await api.updateUser(data);
    login(res.user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username', { required: true })} />
      <input {...register('email', { required: true })} />
      <input {...register('password', { minLength: 6, maxLength: 40 })} />
      <input {...register('image')} placeholder="Avatar URL" />
      <button type="submit">Save</button>
    </form>
  );
}
