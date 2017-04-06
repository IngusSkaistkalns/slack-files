import React, { PureComponent } from 'react'
import { GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  cell: {
    display: 'flex',
    justifyContent: 'center'
  },
  preview: {
    margin: '35px auto'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center'
  }
}

class FileTile extends PureComponent {
  state = {
    mode: 'display'
  }

  confirmMode = () => {
    this.setState({ mode: 'edit' })
  }

  displayMode = () => {
    this.setState({ mode: 'display' })
  }

  render() {
    const { id, name, title, thumb_160, timestamp, pretty_type, userName, deleteFile, size, permalink } = this.props

    const date = moment.unix(timestamp)

    const sizeMb = (size / 1024 / 1024).toFixed(1)
    const typeText = `${pretty_type}, ${sizeMb}MB`

    const preview = thumb_160 ? <img src={thumb_160} alt={typeText} /> : <div style={styles.preview}>{typeText}</div>

    let action
    let subtitle
    if(this.state.mode === 'display') {
      subtitle = <span>
        <strong>{userName}</strong> @ {date.format('DD.MM.YYYY')}
      </span>
      action = <IconButton onTouchTap={this.confirmMode}><Delete color="white" /></IconButton>
    } else {
      subtitle = <div style={styles.buttons}>
        <RaisedButton label="Delete" secondary={true} onTouchTap={deleteFile.bind(this, id)} />
        <RaisedButton label="Cancel" onTouchTap={this.displayMode} />
      </div>
      action = null
    }

    return <GridTile title={name} subtitle={subtitle} actionIcon={action} style={styles.cell} >
      <a href={permalink} target='_blank' title={typeText}>{preview}</a>
    </GridTile>
  }
}

import { connect } from 'react-redux'
import { deleteFile } from './actions'

function mapStateToProps() { return {} }
function mapDispatchToProps(dispatch) {
  return {
    deleteFile: (id) => dispatch(deleteFile(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileTile)
