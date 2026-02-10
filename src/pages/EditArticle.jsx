import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import FormArticle from '../components/FormArticle';
import api from '../services/api';

export default function EditArticle() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await api.getArticle(slug);
        setArticle(res.article);
      } catch (e) {
        console.error(e);
      }
    }
    if (user) {
      fetchArticle();
    }
  }, [slug, user]);

  if (!user) return <Navigate to="/sign-in" />;

  const handleUpdate = async (data) => {
    try {
      const res = await api.updateArticle(slug, data);
      navigate(`/articles/${res.article.slug}`);
    } catch (e) {
      if (e?.errors) {
        setError(Object.values(e.errors).flat()[0]);
      } else {
        setError('Error updating article');
      }
    }
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FormArticle initialValues={article} onSubmit={handleUpdate} />
    </div>
  );
}
