import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import FormArticle from '../components/FormArticle';
import api from '../services/api';

export default function CreateArticle() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/sign-in" />;

  const handleCreate = async (data) => {
    try {
      const res = await api.createArticle(data);
      navigate(`/articles/${res.article.slug}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <FormArticle onSubmit={handleCreate} />
      </div>
    </div>
  );
}
