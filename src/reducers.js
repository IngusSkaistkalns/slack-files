import merge from 'lodash/merge'
import keyBy from 'lodash/keyBy'
import { TOKEN_UPDATED, FETCH_COMPLETED } from './actions'

const initialState = {
  token: '',
  files: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch(type) {
    case TOKEN_UPDATED:
      return merge({}, state, { token: payload.token })
    case FETCH_COMPLETED:
      return merge({}, state, { files: merge({}, state.files, keyBy(payload.files, 'id')) })
    default:
      return state
  }
}
