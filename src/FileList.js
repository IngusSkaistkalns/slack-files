import React, { PureComponent } from 'react'
import map from 'lodash/map'
import { GridList } from 'material-ui/GridList'
import values from 'lodash/values'
import sortBy from 'lodash/sortBy'
import FileTile from './FileTile'

const SORT_FUNCTIONS = {
  '-timestamp': ({ timestamp }) => -1 * timestamp,
  '+timestamp': ({ timestamp }) => timestamp,
  '-size': ({ size }) => -1 * size,
  '+size': ({ size }) => size
}

class FileList extends PureComponent {
  render() {
    const { files, allUsers, sortBy: sort } = this.props
    const sorted = sortBy(values(files), SORT_FUNCTIONS[sort] || 'id')

    const tiles = map(sorted, (file) => {
      const { name: userName } = allUsers[file.user] || {}
      return <FileTile {...file} userName={userName} key={file.id}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(FileList)
