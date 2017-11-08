import React from 'react'
import { Route, Switch } from 'react-router'

import {Container} from 'bjageman-react-toolkit'

import Toolbar from './Toolbar'
import DMLogSheet from './adventures/'
import CharacterLogSheet from './characters/'

const Home = () => (
    <Container>Adventure Logs Home</Container>
)

class AdventureLogs extends React.Component {
  render() {
    const match = this.props.match
    console.log(match)
    return (
    <div>
        <Toolbar />
        <Switch>
            <Route exact path={match.url} component={Home}/>
            <Route path={match.url + "/adventures"} component={DMLogSheet}/>
            <Route path={match.url + "/characters"} component={CharacterLogSheet}/>
        </Switch>
    </div>
    )
  }
}


export default AdventureLogs
