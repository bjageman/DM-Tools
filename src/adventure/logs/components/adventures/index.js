import React from 'react'
import { Route, Switch } from 'react-router'

import {Container} from 'bjageman-react-toolkit'

import Detail from './Detail'
import Edit from './Edit'
import List from './List'

class DMLogSheet extends React.Component {
    render(){
        const match = this.props.match
        return(
            <Container>
                <Switch>
                    <Route exact path={match.url} component={List}/>
                    <Route path={match.url + "/new"} component={Edit}/>
                    <Route path={match.url + "/:id"} component={Detail}/>
                </Switch>
            </Container>
        )
    }
}

export default DMLogSheet
