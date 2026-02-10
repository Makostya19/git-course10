import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import FormArticle from '../components/FormArticle';
import api from '../services/api';
import { useState } from 'react';

export default function CreateArticle() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  if (!user) return <Navigate to="/sign-in" />;

  const handleCreate = async (data) => {
    try {
      const res = await api.createArticle(data);
      navigate(`/articles/${res.article.slug}`);
    } catch (e) {
      if (e?.errors) {
        setError(Object.values(e.errors).flat()[0]);
      } else {
        setError('Error creating article');
      }
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <FormArticle onSubmit={handleCreate} />
      </div>
    </div>
  );
}
