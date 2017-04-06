import { postJson } from './fetchJson'

const SLACK_API_ROOT = 'https://slack.com/api'

export const TOKEN_UPDATED = 'TOKEN_UPDATED'
export function updateToken(token) {
  return { type: TOKEN_UPDATED, payload: { token } }
}

export const FETCH_STARTED = 'FETCH_STARTED'
export const FETCH_COMPLETED = 'FETCH_COMPLETED'
export const FETCH_ERROR = 'FETCH_ERROR'
export function fetchFiles() {
  return (dispatch, getState) => {
    const { token } = getState()

    dispatch({ type: FETCH_STARTED })

    postJson(`${SLACK_API_ROOT}/files.list`, { token }).then(({ ok, files, error }) => {
      if(ok) {
        dispatch({ type: FETCH_COMPLETED, payload: { files }})
      } else {
        dispatch({ type: FETCH_ERROR, payload: { error } })
      }
    })
  }
}
