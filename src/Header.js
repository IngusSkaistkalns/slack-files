import React, { PureComponent } from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Build from 'material-ui/svg-icons/action/build'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
import map from 'lodash/map'

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
    const { token, updateToken, refresh, sortBy, updateSortBy, users, filterByUser, filterUser } = this.props

    const dialogButton = <RaisedButton label="OK" primary={true} onTouchTap={this.closeModal} />

    return <div>
      <AppBar title='Slack file cleaner' onTitleTouchTap={this.openModal}
        iconElementLeft={<IconButton onTouchTap={this.openModal}><Build /></IconButton>}
        iconElementRight={<IconButton onTouchTap={refresh}><Refresh /></IconButton>} />
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <RaisedButton label="Newest" primary={sortBy === '-timestamp'} onTouchTap={updateSortBy.bind(this, '-timestamp')} />
          <RaisedButton label="Oldest" primary={sortBy === '+timestamp'} onTouchTap={updateSortBy.bind(this, '+timestamp')} />
          <RaisedButton label="Biggest" primary={sortBy === '-size'} onTouchTap={updateSortBy.bind(this, '-size')} />
          <RaisedButton label="Smallest" primary={sortBy === '+size'} onTouchTap={updateSortBy.bind(this, '+size')} />
        </ToolbarGroup>
        <ToolbarGroup>
          <SelectField floatingLabelText="Filter by user" value={filterUser} onChange={filterByUser} >
            <MenuItem value={null} primaryText="" />
            {map(users, (user) => <MenuItem value={user.id} primaryText={user.name} key={user.id} />) }
          </SelectField>
        </ToolbarGroup>
      </Toolbar>
      <Dialog title="Enter API token" actions={dialogButton} modal={true} open={this.state.tokenModalOpen} >
        <TextField floatingLabelText="Slack API token" fullWidth={true} value={token} onChange={updateToken} />
      </Dialog>
    </div>
  }
}

import { connect } from 'react-redux'
import { updateToken, refresh, updateSortBy, updateFilterUser } from './actions'

function mapStateToProps({ token, sortBy, users, filterUser }) {
  return { token, sortBy, users, filterUser }
}

function mapDispatchToProps(dispatch) {
  return {
    updateToken: (_e, token) => dispatch(updateToken(token)),
    refresh: () => dispatch(refresh()),
    updateSortBy: (sortBy) => dispatch(updateSortBy(sortBy)),
    filterByUser: (_event, _idx, id) => dispatch(updateFilterUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
