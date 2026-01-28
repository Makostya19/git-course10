import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticle } from '../services/api';
import ReactMarkdown from 'react-markdown';

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticle(slug).then(data => setArticle(data.article));
  }, [slug]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
        </div>
      </div>

      <div className="container page">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ArticlePage;
