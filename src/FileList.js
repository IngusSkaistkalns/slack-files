import React, { PureComponent } from 'react'
import map from 'lodash/map'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import moment from 'moment'

class Header extends PureComponent {
  render() {
    const { files, allUsers } = this.props

    const tiles = map(files, ({ id, name, title, thumb_160, timestamp, user }) => {
      const { name: userName } = allUsers[user] || {}
      const date = moment.unix(timestamp)

      const subtitle = <span>
        <strong>{userName}</strong> @ {date.format('DD.MM.YYYY')}
      </span>

      return <GridTile key={id} title={name} subtitle={subtitle} actionIcon={<IconButton><Delete color="white" /></IconButton>} >
        <img src={thumb_160} alt={title}/>
      </GridTile>
    })

    return <GridList cellHeight={160} cols={4} >
      {tiles}
    </GridList>
  }
}

import { connect } from 'react-redux'

function mapStateToProps({ files, users }) {
  return { files, allUsers: users }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
