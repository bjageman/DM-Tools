import React from 'react'
import { Route, Switch } from 'react-router'

import {Container, AppBar, AppBarButton} from 'bjageman-react-toolkit'

const Home = () => (
    <Container>Adventure Logs</Container>
)

class AdventureLogs extends React.Component {
  render() {
    const match = this.props.match
    return (
    <div>
        <AppBar style={{backgroundColor:"grey"}}>
            <AppBarButton>
            DM Logs
            </AppBarButton>
        </AppBar>
        <Switch>
            <Route exact path={match.url} component={Home}/>
        </Switch>
    </div>
    )
  }
}


export default AdventureLogs
