import merge from 'lodash/merge'
import keyBy from 'lodash/keyBy'
import { TOKEN_UPDATED, FILES_LOADED, USERS_LOADED, SORT_BY_CHANGED } from './actions'

const initialState = {
  token: '',
  sortBy: '-timestamp',
  files: {},
  users: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch(type) {
    case TOKEN_UPDATED:
      return merge({}, state, { token: payload.token })
    case FILES_LOADED:
      return merge({}, state, { files: merge({}, state.files, keyBy(payload.files, 'id')) })
    case USERS_LOADED:
      return merge({}, state, { users: merge({}, state.users, keyBy(payload.users, 'id')) })
    case SORT_BY_CHANGED:
      return merge({}, state, { sortBy: payload.sortBy })
    default:
      return state
  }
}
