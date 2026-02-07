import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
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

  const handleLike = async () => {
    if (!user) return;

    try {
      const res = article.favorited
        ? await api.unlikeArticle(article.slug)
        : await api.likeArticle(article.slug);

      setArticle(res.article);
    } catch (e) {
      console.error(e);
    }
  };

  if (!article) return <p>Loading...</p>;

  const isAuthor = user && user.username === article.author.username;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <div className="info">
              <span className="author">{article.author.username}</span>
              <span className="date">
                {new Date(article.createdAt).toDateString()}
              </span>
            </div>

            <button
              className="btn btn-outline-primary btn-sm"
              disabled={!user}
              onClick={handleLike}
            >
              {article.favorited ? '♥' : '♡'} {article.favoritesCount}
            </button>

            {isAuthor && (
              <span>
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
