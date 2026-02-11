import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { AuthContext } from '../context/AuthContext';
import { getArticle } from '../services/api';
import DefaultAvatar from './DefaultAvatar';

export default function ArticlePage() {
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const isAuth = !!user;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setArticle(null);
    setLoading(true);
    setError(null);

    getArticle(slug)
      .then(data => setArticle(data.article))
      .catch(err => setError(err.message || 'Error loading article'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {article.author.image ? (
              <img
                src={article.author.image}
                alt={article.author.username}
                width="32"
                height="32"
                style={{ borderRadius: '50%' }}
              />
            ) : (
              <DefaultAvatar width={32} height={32} />
            )}

            <div className="info">
              <span className="author">{article.author.username}</span>
              <span className="date">{new Date(article.createdAt).toDateString()}</span>
            </div>

            <button
              disabled={!isAuth}
              title={!isAuth ? 'Login to like articles' : ''}
              style={{
                marginLeft: 'auto',
                cursor: isAuth ? 'pointer' : 'not-allowed',
                opacity: isAuth ? 1 : 0.5
              }}
            >
              ❤️ {article.favoritesCount}
            </button>
          </div>

          {article.tagList && article.tagList.length > 0 && (
            <div className="tags">
              {article.tagList.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container page">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
}
