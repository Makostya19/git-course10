import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useAuth } from '../context/useAuth';
import DefaultAvatar from './DefaultAvatar';

export default function Profile() {
  const { user, login } = useAuth();
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      image: user?.image || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.updateUser(data);
      login(res.user);
    } catch (e) {
      if (e?.errors) {
        Object.entries(e.errors).forEach(([field, messages]) => {
          setError(field, { message: messages[0] });
        });
      } else {
        console.error('Update user error:', e);
      }
    }
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          {user?.image ? (
            <img className="user-img" src={user.image} alt={user.username} />
          ) : (
            <DefaultAvatar width={64} height={64} />
          )}
          <h1 className="user-name">{user?.username}</h1>
        </div>
      </div>
      <div className="container page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('username', { required: 'Username is required' })} placeholder="Username" />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
          <input {...register('email', { required: 'Email is required' })} placeholder="Email" />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
          <input type="password" {...register('password', { minLength: { value: 6, message: 'Password must be at least 6 chars' }, maxLength: { value: 40, message: 'Password max 40 chars' } })} placeholder="New password" />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
          <input {...register('image')} placeholder="Avatar URL" />
          {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
