import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Route, Switch } from 'react-router'

import Detail from './Detail'
import Edit from './Edit'

class CharacterLog extends React.Component {
    constructor(props){
        super(props)
        this.props.getCharacterLog({
            access_token: this.props.user.access_token,
            id: this.props.match.params.log_id
        })
    }

    render(){
        const match = this.props.match
        return(
            <Switch>
                <Route path={match.url + "/new"} component={Edit}/>
                <Route exact path={match.url + "/:char_id"} component={Detail}/>
                <Route path={match.url + "/:char_id/edit"} component={Detail}/>
            </Switch>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterLog)
