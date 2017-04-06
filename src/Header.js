import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'

const styles = {
  root: {
    display: 'flex',
    flexFlow: 'row'
  },
  field: {
    flex: 1
  }
}

class Header extends PureComponent {
  render() {
    const { token, updateToken, refresh } = this.props

    return <div style={styles.root}>
      <TextField floatingLabelText="Slack API token" fullWidth={true} value={token} onChange={updateToken} style={styles.field} />
      <IconButton onTouchTap={refresh}><Refresh /></IconButton>
    </div>
  }
}

import { connect } from 'react-redux'
import { updateToken, refresh } from './actions'

function mapStateToProps({ token }) {
  return { token }
}

function mapDispatchToProps(dispatch) {
  return {
    updateToken: (_e, token) => dispatch(updateToken(token)),
    refresh: () => dispatch(refresh())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
