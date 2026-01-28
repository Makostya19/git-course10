import { Routes, Route, Navigate } from 'react-router-dom';
import ArticlesPage from './pages/ArticlesPage';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            Realworld Blog
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">New Post</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">eni9mu5</a>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
