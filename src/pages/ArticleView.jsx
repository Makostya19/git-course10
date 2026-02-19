import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import ReactMarkdown from 'react-markdown';
import api from '../services/api';
import ConfirmModal from '../components/ConfirmModal';
import DefaultAvatar from './DefaultAvatar';

export default function ArticleView() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await api.getArticle(slug);
        setArticle(res.article);
        setError(null);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchArticle();
  }, [slug]);

  const handleDelete = async () => {
    try {
      await api.deleteArticle(slug);
      navigate('/articles');
    } catch (e) {
      setError(e.message); // показать на странице
    }
  };

  const handleLike = async () => {
    if (!user) return;
    try {
      const res = article.favorited
        ? await api.unlikeArticle(article.slug)
        : await api.likeArticle(article.slug);
      setArticle(res.article);
      setError(null);
    } catch (e) {
      setError(e.message); // показать на странице
    }
  };

  if (!article) return <p>Loading...</p>;

  const isAuthor = user && user.username === article.author.username;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          {error && <p style={{ color: 'red' }}>{error}</p>} {/* ошибки */}

          <div className="article-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Аватар автора */}
            {article.author.image ? (
              <img
              src={article.author.image}
              alt={article.author.username}
              width="32"
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
              className="btn btn-outline-primary btn-sm"
              disabled={!user}
              onClick={handleLike}
              style={{ marginLeft: 'auto' }}
            >
              {article.favorited ? '♥' : '♡'} {article.favoritesCount}
            </button>

            {isAuthor && (
              <span style={{ display: 'flex', gap: '0.5rem' }}>
                <Link
                  to={`/articles/${slug}/edit`}
                  className="btn btn-outline-secondary btn-sm"
                >
                  ✎ Edit Article
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => setShowModal(true)}
                >
                  🗑 Delete Article
                </button>
              </span>
            )}
          </div>

          {/* Article tags */}
          {article.tagList && article.tagList.length > 0 && (
            <div className="tags" style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'flex-start' }}>
              {article.tagList.map(tag => (
                <span
                  key={tag}
                  className="tag"
                  style={{
                    backgroundColor: '#ddd',
                    color: '#555',
                    fontSize: '0.85rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.description}</p>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
