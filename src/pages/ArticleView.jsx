import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import api from '../services/api';
import ConfirmModal from '../components/ConfirmModal'; 

export default function ArticleView() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await api.getArticle(slug);
        setArticle(res.article);
      } catch (e) {
        console.error(e);
      }
    }
    fetchArticle();
  }, [slug]);

  const handleDelete = async () => {
    try {
      await api.deleteArticle(slug);
      navigate('/articles');
    } catch (e) {
      console.error(e);
    }
  };

  if (!article) return <p>Loading...</p>;

  const isAuthor = user && user.username === article.author.username;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <ReactMarkdown>{article.body}</ReactMarkdown>

      {isAuthor && (
        <div>
          <Link to={`/articles/${slug}/edit`}>Edit</Link>
          <button onClick={() => setShowModal(true)}>Delete</button>
        </div>
      )}

      {/* ✅ CONFIRMATION MODAL */}
      <ConfirmModal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
