const host = 'https://beerboardapi.herokuapp.com';
const headers = {
  'content-type': 'application/json'
};

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return response.text().then(text => {
    const error = JSON.parse(text);
    return Promise.reject({ ...error, status: response.status });
  });
}

export function get(path) {
  return fetch(`${host}/${path}`, {
    method: 'get'
  }).then(handleResponse);
}

export function post(path, data) {
  return fetch(`${host}/${path}`, {
    method: 'post',
    body: JSON.stringify(data),
    headers
  }).then(handleResponse);
}

export function put(path, data) {
  return fetch(`${host}/${path}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers
  }).then(handleResponse);
}

export function del(path, data) {
  return fetch(`${host}/${path}`, {
    method: 'delete',
    body: {}
  }).then(handleResponse);
}
