import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/useAuth';
import { getArticle, getTags } from '../services/api';
import DefaultAvatar from './DefaultAvatar';

export default function ArticlePage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const isAuth = !!user;

  const [article, setArticle] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setArticle(null);
    setLoading(true);
    setError(null);
    setImgError(false);

    getArticle(slug)
      .then(data => setArticle(data.article))
      .catch(err => setError(err.message || 'Error loading article'))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    getTags()
      .then(setTags)
      .catch(() => {});
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!article) return <p>Article not found</p>;

  // 🔥 исправленная логика как в ArticlesPage
  const imageUrl =
    article.author &&
    article.author.image &&
    article.author.image !== ''
      ? article.author.image
      : null;

  return (
    <div className="article-page">

      <div
        className="banner"
        style={{ backgroundColor: '#3ea55f', padding: '2rem 0' }}
      >
        <div
          className="container"
          style={{ textAlign: 'center', color: '#fff' }}
        >
          <h1>{article.title}</h1>

          <div
            className="article-meta"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1rem'
            }}
          >
            {imageUrl && !imgError ? (
              <img
                src={imageUrl}
                alt={article.author.username}
                width={32}
                height={32}
                style={{ borderRadius: '50%' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <DefaultAvatar width={32} height={32} fill="#ffffff" />
            )}

            <div className="info">
              <span className="author">
                {article.author.username}
              </span>
              <span className="date">
                {new Date(article.createdAt).toDateString()}
              </span>
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

          {article.tagList?.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              {article.tagList.map(tag => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: '#ddd',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    marginRight: '0.5rem',
                    fontSize: '0.85rem'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {tags.length > 0 && (
        <div
          className="container"
          style={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px solid #eee',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            textAlign: 'left'
          }}
        >
          <h5
            style={{
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              color: '#555'
            }}
          >
            Popular Tags
          </h5>

          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}
          >
            {tags.map(tag => (
              <Link
                key={tag}
                to={`/?tag=${tag}`}
                style={{
                  backgroundColor: '#ddd',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#333'
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="container page" style={{ marginTop: '1rem' }}>
        <ReactMarkdown>
          {article.body}
        </ReactMarkdown>
      </div>

    </div>
  );
}
