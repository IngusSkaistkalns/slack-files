import { postJson } from './fetchJson'

const SLACK_API_ROOT = 'https://slack.com/api'

export const TOKEN_UPDATED = 'TOKEN_UPDATED'
export function updateToken(token) {
  return { type: TOKEN_UPDATED, payload: { token } }
}

export const FILES_FETCHING = 'FILES_FETCHING'
export const FILES_LOADED = 'FILES_LOADED'
export const FILES_ERROR = 'FILES_ERROR'
export function fetchFiles() {
  return (dispatch, getState) => {
    const { token } = getState()

    dispatch({ type: FILES_FETCHING })

    postJson(`${SLACK_API_ROOT}/files.list`, { token }).then(({ ok, files, error }) => {
      if(ok) {
        dispatch({ type: FILES_LOADED, payload: { files }})
      } else {
        dispatch({ type: FILES_ERROR, payload: { error } })
      }
    })
  }
}

export const USERS_FETCHING = 'USERS_FETCHING'
export const USERS_LOADED = 'USERS_LOADED'
export const USERS_ERROR = 'USERS_ERROR'
export function fetchUsers() {
  return (dispatch, getState) => {
    const { token } = getState()

    dispatch({ type: USERS_FETCHING })

    postJson(`${SLACK_API_ROOT}/users.list`, { token }).then(({ ok, members, error }) => {
      if (ok) {
        dispatch({ type: USERS_LOADED, payload: { users: members } })
      } else {
        dispatch({ type: USERS_ERROR, payload: { error } })
      }
    })
  }
}

export function refresh() {
  return (dispatch) => {
    dispatch(fetchFiles())
    dispatch(fetchUsers())
  }
}
