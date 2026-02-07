const API_URL = 'https://realworld.habsida.net/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Token ${token}` } : {};
}

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

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: {
        email: data.email,
        username: data.username,
        password: data.password,
      },
    }),
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: {
        email: data.email,
        password: data.password,
      },
    }),
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/user`, {
    headers: { ...getAuthHeaders() },
  });

  if (!res.ok) throw new Error('Не авторизован');
  return res.json();
}

export async function updateUser(data) {
  const res = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ user: data }),
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function createArticle(data) {
  const res = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ article: data }),
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function updateArticle(slug, data) {
  const res = await fetch(`${API_URL}/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ article: data }),
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function deleteArticle(slug) {
  const res = await fetch(`${API_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error('Ошибка удаления статьи');
  }
}

export async function likeArticle(slug) {
  const res = await fetch(`${API_URL}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error('Ошибка лайка');
  return res.json();
}

export async function unlikeArticle(slug) {
  const res = await fetch(`${API_URL}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error('Ошибка анлайка');
  return res.json();
}

export default {
  getArticles,
  getArticle,
  register: registerUser,
  login: loginUser,
  getCurrentUser,
  updateUser,
  createArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
  unlikeArticle,
};
