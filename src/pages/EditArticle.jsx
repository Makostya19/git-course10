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
      console.error(e);
    }
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div>
      <FormArticle initialValues={article} onSubmit={handleUpdate} />
    </div>
  );
}
