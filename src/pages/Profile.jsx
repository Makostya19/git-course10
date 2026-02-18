import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/useAuth';
import DefaultAvatar from "./DefaultAvatar";

export default function Profile() {
  const { user, login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      image: '',
      password: ''
    },
  });

  // ✅ всегда синхронизируем форму с user
  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        email: user.email || '',
        image: user.image || '',
        password: ''
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const cleanData = {
        username: data.username || '',
        email: data.email || '',
        image: data.image || ''
      };

      if (data.password) {
        cleanData.password = data.password;
      }

      const res = await api.updateUser(cleanData);

      login(res.user);
    } catch (e) {
      console.log("SERVER ERROR:", e);

      if (e?.errors) {
        Object.entries(e.errors).forEach(([field, messages]) => {
          setError(field, { message: messages[0] });
        });
      }
    }
  };

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          {user?.image ? (
            <img
              className="user-img"
              src={user.image}
              alt={user.username}
            />
          ) : (
            <DefaultAvatar width={64} height={64} />
          )}

          <h1 className="user-name">{user?.username}</h1>
        </div>
      </div>

      <div className="container page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('username', { required: 'Username is required' })}
            placeholder="Username"
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

          <input
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

          <input
            type="password"
            {...register('password')}
            placeholder="New password"
          />

          <input {...register('image')} placeholder="Avatar URL" />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
