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
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <img
            className="user-img"
            src={user?.image || 'https://api.realworld.io/images/smiley-cyrus.jpeg'}
            alt={user?.username}
          />
          <h1 className="user-name">{user?.username}</h1>
        </div>
      </div>

      <div className="container page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('username', { required: true })} placeholder="Username" />
          <input {...register('email', { required: true })} placeholder="Email" />
          <input
            type="password"
            {...register('password', { minLength: 6, maxLength: 40 })}
            placeholder="New password"
          />
          <input {...register('image')} placeholder="Avatar URL" />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
