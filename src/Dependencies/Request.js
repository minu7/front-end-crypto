// @flow

const getHeader = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const getFile = {
  method: 'GET',
  headers: {},
};

const postHeader = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const putHeader = {
  method: 'PUT',
  headers: {},
};

const deleteHeader = {
  method: 'DELETE',
  headers: {},
};

type REST = 'POST' | 'PUT' | 'GET' | 'DELETE' | 'FILE';

type DetailRequest = {
  url: string,
  query?: Object,
  body?: Object,
  method: REST,
  token: string,
  headers: any,
};

export default async (detail: DetailRequest): Promise<Object> => {
  let options = {};
  const formData = new FormData();

  if (detail.body) {
    Object.keys(detail.body).forEach((key) => {
      if (detail.body) {
        formData.append(key, detail.body[key]);
      }
    });
  }

  switch (detail.method) {
    case 'POST':
      options = postHeader;
      options = { ...options, body: JSON.stringify(detail.body) };
      break;
    case 'PUT':
      options = putHeader;
      options = { ...options, body: JSON.stringify(detail.body) };
      break;
    case 'DELETE':
      options = deleteHeader;
      options = { ...options, body: JSON.stringify(detail.body) };
      break;
    case 'FILE':
      options = getFile;
      options = { ...options, body: JSON.stringify(detail.body) };
      break;
    default:
      options = getHeader;
      options = { ...options };
      break;
  }

  if (detail.token) {
    options = { ...options, headers: { ...options.headers, Authorization: `Bearer ${detail.token}` } };
  }

  let { url } = detail;
  if (detail.query) {
    url = Object.keys(detail.query).reduce((accumulator, current, index): string => {
      let newAccumultator = accumulator;
      if (!newAccumultator || !detail.query) {
        return '';
      }

      if (index !== 0) {
        newAccumultator += '&';
      }

      newAccumultator += `${current}=${detail.query[current]}`;
      return newAccumultator;
    }, `${url}?`);
  }

  const result = await fetch(url, options);

  if (result.status >= 200 && result.status < 300) {
    return result.json();
  }

  throw new Error(`status: ${result.status}`);
};
