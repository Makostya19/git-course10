import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, likeArticle, unlikeArticle } from '../services/api';
import { useAuth } from '../context/useAuth';

export default function ArticlesPage() {
  const { user } = useAuth();
  const isAuth = !!user;

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles(page)
      .then((data) => {
        setArticles(data.articles);
        setCount(data.articlesCount);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const pages = Math.ceil(count / 10);

  const handleLike = async (article) => {
    if (!isAuth) return;

    try {
      const res = article.favorited
        ? await unlikeArticle(article.slug)
        : await likeArticle(article.slug);

      setArticles((prev) =>
        prev.map((a) =>
          a.slug === article.slug ? res.article : a
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">Realworld Blog</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">

            {loading && <p>Loading...</p>}

            {articles.map((article) => (
              <div className="article-preview" key={article.slug}>
                <div
                  className="article-meta"
                  style={{ display: 'flex', alignItems: 'center' }}   
                >
                  <div className="info">
                    <span className="author">{article.author.username}</span>
                    <span className="date">
                      {new Date(article.createdAt).toDateString()}
                    </span>
                  </div>

                  <div style={{ marginLeft: 'auto' }}>
                    <button
                      className="btn btn-outline-primary btn-sm pull-xs-right"
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
