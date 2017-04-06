import each from 'lodash/each'

function sensibleFetch(url, method, params) {
  let body = undefined

  if (method === 'POST') {
    body = new FormData()
    each(params, (value, key) => {
      body.append(key, value)
    })
  }

  return fetch(url, { method, body }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw Error(res.status)
    }
  })
}

export function getJson(url) {
  return sensibleFetch(url, 'GET', {})
}

export function postJson(url, params) {
  return sensibleFetch(url, 'POST', params)
}
