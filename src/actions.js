import { postJson } from './fetchJson'

const SLACK_API_ROOT = 'https://slack.com/api'

export const TOKEN_UPDATED = 'TOKEN_UPDATED'
export function updateToken(token) {
  return { type: TOKEN_UPDATED, payload: { token } }
}

export const SORT_BY_CHANGED = 'SORT_BY_CHANGED'
export function updateSortBy(sortBy) {
  return { type: SORT_BY_CHANGED, payload: { sortBy } }
}

export const FILES_FETCHING = 'FILES_FETCHING'
export const FILES_LOADED = 'FILES_LOADED'
export const FILES_ERROR = 'FILES_ERROR'
export function fetchFiles(currentPage = 1) {
  return (dispatch, getState) => {
    const { token } = getState()

    dispatch({ type: FILES_FETCHING })

    postJson(`${SLACK_API_ROOT}/files.list`, { token, page: currentPage }).then(({ ok, files, error, paging }) => {
      if(ok) {
        dispatch({ type: FILES_LOADED, payload: { files }})

        const { page, pages } = paging
        if (page < pages) {
          dispatch(fetchFiles(currentPage + 1))
        }
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

export const FILES_RESET = 'FILES_RESET'
export const USERS_RESET = 'USERS_RESET'
export function refresh() {
  return (dispatch) => {
    dispatch({ type: FILES_RESET })
    dispatch({ type: USERS_RESET })
    dispatch(fetchFiles())
    dispatch(fetchUsers())
  }
}

export const FILE_DELETED = 'FILE_DELETED'
export function deleteFile(id) {
  return (dispatch, getState) => {
    const { token } = getState()

    postJson(`${SLACK_API_ROOT}/files.delete`, { token, file: id }).then(({ ok }) => {
      if (ok) {
        dispatch({ type: FILE_DELETED, payload: { id } })
      }
    })
  }
}
