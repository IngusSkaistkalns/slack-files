import merge from 'lodash/merge'
import assign from 'lodash/assign'
import keyBy from 'lodash/keyBy'
import omit from 'lodash/omit'
import { TOKEN_UPDATED, FILES_LOADED, USERS_LOADED, SORT_BY_CHANGED, FILE_DELETED, FILES_RESET, USERS_RESET, FILTER_USER_CHANGED } from './actions'

const initialState = {
  token: '',
  sortBy: '-timestamp',
  filterUser: null,
  files: {},
  users: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch(type) {
    case TOKEN_UPDATED:
      return merge({}, state, { token: payload.token })
    case FILES_RESET:
      return assign({}, state, { files: {} })
    case FILES_LOADED:
      return merge({}, state, { files: merge({}, state.files, keyBy(payload.files, 'id')) })
    case USERS_RESET:
      return assign({}, state, { users: {} })
    case USERS_LOADED:
      return merge({}, state, { users: merge({}, state.users, keyBy(payload.users, 'id')) })
    case SORT_BY_CHANGED:
      return merge({}, state, { sortBy: payload.sortBy })
    case FILE_DELETED:
      return assign({}, state, { files: omit(state.files, [payload.id]) })
    case FILTER_USER_CHANGED:
      return merge({}, state, { filterUser: payload.id })
    default:
      return state
  }
}
