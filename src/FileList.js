import React, { PureComponent } from 'react'
import map from 'lodash/map'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import moment from 'moment'
import values from 'lodash/values'
import sortBy from 'lodash/sortBy'

const styles = {
  cell: {
    display: 'flex'
  },
  preview: {
    margin: '35px auto'
  }
}

const SORT_FUNCTIONS = {
  '-timestamp': ({ timestamp }) => -1 * timestamp,
  '+timestamp': ({ timestamp }) => timestamp,
  '-size': ({ size }) => -1 * size,
  '+size': ({ size }) => size
}

class Header extends PureComponent {
  render() {
    const { files, allUsers, sortBy: sort } = this.props
    const sorted = sortBy(values(files), SORT_FUNCTIONS[sort] || 'id')

    const tiles = map(sorted, ({ id, name, title, thumb_160, timestamp, user, pretty_type }) => {
      const { name: userName } = allUsers[user] || {}
      const date = moment.unix(timestamp)

      const subtitle = <span>
        <strong>{userName}</strong> @ {date.format('DD.MM.YYYY')}
      </span>

      const preview = thumb_160 ? <img src={thumb_160} alt={title} /> : <div style={styles.preview}>{pretty_type}</div>

      const action = <IconButton><Delete color="white" /></IconButton>

      return <GridTile key={id} title={name} subtitle={subtitle} actionIcon={action} style={styles.cell} >
        {preview}
      </GridTile>
    })

    return <GridList cellHeight={160} cols={4} >
      {tiles}
    </GridList>
  }
}

import { connect } from 'react-redux'

function mapStateToProps({ files, users, sortBy }) {
  return { files, allUsers: users, sortBy }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
