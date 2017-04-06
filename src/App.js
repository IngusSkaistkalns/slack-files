import React, { PureComponent } from 'react'
import Header from './Header'
import FileList from './FileList'

class App extends PureComponent {
  render() {
    return <div>
      <Header />
      <FileList />
    </div>
  }
}

export default App
