import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Build from 'material-ui/svg-icons/action/build'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'

class Header extends PureComponent {
  state = {
    tokenModalOpen: false
  }

  componentDidMount() {
    this.setState({ tokenModalOpen: String(this.props.token).length < 1 })
  }

  openModal = () => {
    this.setState({ tokenModalOpen: true })
  }

  closeModal = () => {
    this.setState({ tokenModalOpen: false })
  }

  render() {
    const { token, updateToken, refresh } = this.props

    const dialogButton = <RaisedButton label="OK" primary={true} onTouchTap={this.closeModal} />

    return <div>
      <AppBar title='Slack file cleaner' onTitleTouchTap={this.openModal}
        iconElementLeft={<IconButton onTouchTap={this.openModal}><Build /></IconButton>}
        iconElementRight={<IconButton onTouchTap={refresh}><Refresh /></IconButton>} />
      <Dialog title="Enter API token" actions={dialogButton} modal={true} open={this.state.tokenModalOpen} >
        <TextField floatingLabelText="Slack API token" fullWidth={true} value={token} onChange={updateToken} />
      </Dialog>
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
