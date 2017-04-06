import React, { PureComponent } from 'react'
import map from 'lodash/map'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class Header extends PureComponent {
  render() {
    const { files } = this.props

    const tiles = map(files, ({ id, name, title, thumb_160, timestamp }) => {
      return <GridTile key={id} title={title} subtitle={timestamp}
                       actionIcon={<IconButton><StarBorder color="white" /></IconButton>} >
        <img src={thumb_160} alt={title}/>
      </GridTile>
    })

    return <GridList cellHeight={160} cols={4} >
      {tiles}
    </GridList>
  }
}

import { connect } from 'react-redux'

function mapStateToProps({ files }) {
  return { files }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
