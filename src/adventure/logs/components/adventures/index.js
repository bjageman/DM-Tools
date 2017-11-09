import React from 'react'
import { Route, Switch } from 'react-router'

import {Container} from 'bjageman-react-toolkit'

import Detail from './Detail'
import Edit from './Edit'
import List from './List'
import CharacterLog from './characters/'
// import CharacterDetail from './characters/Detail'
// import CharacterEdit from './characters/Edit'

class AdventureLog extends React.Component {
    render(){
        const match = this.props.match
        return(
            <Container>
                <Switch>
                    <Route exact path={match.url} component={List}/>
                    <Route path={match.url + "/new"} component={Edit}/>
                    <Route exact path={match.url + "/:log_id"} component={Detail}/>
                    <Route path={match.url + "/:log_id/characters"} component={CharacterLog} />
                </Switch>
            </Container>
        )
    }
}

//<Route path={match.url + "/:log_id/characters/new"} component={CharacterEdit}/>
//<Route path={match.url + "/:log_id/characters/:char_id"} component={CharacterDetail}/>

export default AdventureLog
