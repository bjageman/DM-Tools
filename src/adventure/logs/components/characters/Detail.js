import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import ReactTable from 'react-table'
import {Button, Text} from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'

class CharacterDetail extends React.Component {
    constructor(props){
        super(props)
        this.props.getCharacter({
            access_token: this.props.user.access_token,
            id: this.props.match.params.id
        })
    }

    handleDelete = (id) => {
        this.props.deleteCharacter({
            access_token: this.props.user.access_token,
            id: id,
        })
    }

    render(){
        const character = this.props.logs.characters.detail
        const logs = character.logs
        const columns = [
        {
            id: 'session',
            Header: 'Session',
            accessor: d => d.session, // Custom value accessors!
            Cell: props => <ReduxLink to={"/logs/adventures/" + props.value.id}><Button style={{margin:0, padding:0}}>{props.value.name}</Button></ReduxLink>
        },
        {
            Header: 'Checkpoints',
            accessor: 'checkpoint'
        },{
            Header: 'Treasure Point',
            accessor: 'treasurepoint'
        }
        ]
        return(
            character ?
                <div>
                    <Text h1>{character.name}</Text>
                    <Button raised onClick={() => this.handleDelete(character.id)} style={{backgroundColor: "red", margin:0, padding:0}}>Delete</Button>
                    <Text p>
                        Class: {character.class} <br/>
                        Race: {character.race} <br/>
                        Background: {character.background} <br/>
                        Level: {character.level}({character.checkpoints})<br />
                        Treasure Points: {character.treasurepoints}<br />
                    </Text>
                    <Text h3>Logs</Text>
                    <ReactTable
                        data={logs}
                        columns={columns}
                        minRows={5}
                        minWidth={0}
                        />
                </div>
            : null
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail)
