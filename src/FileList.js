import React, { PureComponent } from 'react'
import map from 'lodash/map'
import { GridList } from 'material-ui/GridList'
import values from 'lodash/values'
import sortBy from 'lodash/sortBy'
import take from 'lodash/take'
import filter from 'lodash/filter'
import FileTile from './FileTile'
import RaisedButton from 'material-ui/RaisedButton'

const SORT_FUNCTIONS = {
  '-timestamp': ({ timestamp }) => -1 * timestamp,
  '+timestamp': ({ timestamp }) => timestamp,
  '-size': ({ size }) => -1 * size,
  '+size': ({ size }) => size
}

class FileList extends PureComponent {
  state = {
    limit: 50
  }

  loadMore = () => {
    this.setState({ limit: this.state.limit + 50 })
  }

  render() {
    const { files, allUsers, sortBy: sort, filterUser } = this.props
    const { limit } = this.state

    const filtered = filter(values(files), ({ user }) => !filterUser || user === filterUser)

    const sorted = sortBy(filtered, SORT_FUNCTIONS[sort] || 'id')

    const tiles = map(take(sorted, limit), (file) => {
      const { name: userName } = allUsers[file.user] || {}
      return <FileTile {...file} userName={userName} key={file.id}/>
    })

    let moreButton = null
    if (sorted.length > limit) {
      moreButton = <RaisedButton label="Load more" fullWidth={true} onTouchTap={this.loadMore} />
    }

    return <div>
      <GridList cellHeight={160} cols={4} >{tiles}</GridList>
      {moreButton}
    </div>
  }
}

import { connect } from 'react-redux'

function mapStateToProps({ files, users, sortBy, filterUser }) {
  return { files, allUsers: users, sortBy, filterUser }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FileList)
