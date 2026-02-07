import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getArticle } from '../services/api';
import ReactMarkdown from 'react-markdown';
import { AuthContext } from '../context/AuthContext';

export default function ArticlePage() {
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const isAuth = !!user;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticle(slug)
      .then(data => setArticle(data.article))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <button
            disabled={!isAuth}
            title={!isAuth ? 'Login to like articles' : ''}
            style={{ cursor: isAuth ? 'pointer' : 'not-allowed', opacity: isAuth ? 1 : 0.5 }}
          >
            ❤️ {article.favoritesCount}
          </button>
        </div>
      </div>
      <div className="container page">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
}