import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, likeArticle, unlikeArticle, getTags } from '../services/api';
import { useAuth } from '../context/useAuth';
import DefaultAvatar from './DefaultAvatar';

export default function ArticlesPage() {
  const { user } = useAuth();
  const isAuth = !!user;

  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getArticles(page)
      .then((data) => {
        setArticles(data.articles);
        setCount(data.articlesCount);
        setError(null);
      })
      .catch(err => setError(err.message || 'Ошибка загрузки статей'))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    getTags()
      .then(setTags)
      .catch(() => {});
  }, []);

  const pages = Math.ceil(count / 10);

  const handleLike = async (article) => {
    if (!isAuth) return;

    try {
      const res = article.favorited
        ? await unlikeArticle(article.slug)
        : await likeArticle(article.slug);

      setArticles(prev =>
        prev.map(a => a.slug === article.slug ? res.article : a)
      );
    } catch (e) {
      console.error(e);
      setError('Ошибка при лайке статьи');
    }
  };

  return (
    <div className="home-page">
      <div className="banner" style={{ backgroundColor: '#3ea55f' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem 0'
          }}
        >
          <h1 className="logo-font" style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>
            Realworld Blog
          </h1>
          <p style={{ margin: 0, color: '#FFFFFF' }}>
            A place to share your knowledge.
          </p>
        </div>
      </div>

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
        <h5 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>
          Popular Tags
        </h5>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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

      <div className="container page">
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="row">
          <div className="col-md-9">
            {loading && <p>Loading...</p>}

            {articles.map((article) => (
              <div
                className="article-preview"
                key={article.slug}
                style={{ marginBottom: '1.5rem' }}
              >
                <div
                  className="article-meta"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
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
                    <span className="date">
                      {new Date(article.createdAt).toDateString()}
                    </span>
                  </div>

                  <div style={{ marginLeft: 'auto' }}>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      disabled={!isAuth}
                      title={!isAuth ? 'Login to like articles' : ''}
                      onClick={() => handleLike(article)}
                    >
                      {article.favorited ? '♥' : '♡'} {article.favoritesCount}
                    </button>
                  </div>
                </div>

                <Link to={`/articles/${article.slug}`} className="preview-link">
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>
                </Link>

                {article.tagList && article.tagList.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      marginTop: '0.5rem'
                    }}
                  >
                    {article.tagList.map((tag) => (
                      <span
                        key={tag}
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
            ))}

            <ul className="pagination">
              {Array.from({ length: pages }).map((_, i) => (
                <li
                  key={i}
                  className={page === i + 1 ? 'page-item active' : 'page-item'}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}
