import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'

class Header extends PureComponent {
  render() {
    const { token, updateToken, fetchFiles } = this.props

    return <div>
      <TextField floatingLabelText="Slack API token" fullWidth={true} value={token} onChange={updateToken} />
      <IconButton onTouchTap={fetchFiles}>
        <Refresh />
      </IconButton>
    </div>
  }
}

import { connect } from 'react-redux'
import { updateToken, fetchFiles } from './actions'

function mapStateToProps({ token }) {
  return { token }
}

function mapDispatchToProps(dispatch) {
  return {
    updateToken: (_e, token) => dispatch(updateToken(token)),
    fetchFiles: () => dispatch(fetchFiles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
