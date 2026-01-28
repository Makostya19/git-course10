const API_URL = 'https://realworld.habsida.net/api';

export async function getArticles(page = 1) {
  const limit = 10;
  const offset = (page - 1) * limit;

  const res = await fetch(
    `${API_URL}/articles?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error('Ошибка загрузки статей');
  }

  return res.json();
}

export async function getArticle(slug) {
  const res = await fetch(`${API_URL}/articles/${slug}`);

  if (!res.ok) {
    throw new Error('Ошибка загрузки статьи');
  }

  return res.json();
}
