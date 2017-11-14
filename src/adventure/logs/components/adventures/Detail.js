import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'
//React-table
import ReactTable from 'react-table'
import 'react-table/react-table.css'
//Custom
import { Text, Button } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'


class AdventureLogDetail extends React.Component {
    constructor(props){
        super(props)
        this.props.getAdventureLog({
            access_token: this.props.user.access_token,
            id: this.props.match.params.log_id
        })
    }

    render(){
        const log = this.props.logs.adventures.detail
        const columns = [
        {
            id: 'session',
            Header: 'Session',
            accessor: d => d, // Custom value accessors!
            Cell: props => <ReduxLink to={"/logs/characters/" + props.value.character.id}><Button style={{margin:0, padding:0}}>{props.value.character.name}</Button></ReduxLink>
        },
        {
            Header: 'XP',
            accessor: 'xp'
        },{
            Header: 'Gold',
            accessor: 'gold'
        }
        ]
        return(
             log ?
                <div>
                    <Text h2>{log.name}</Text>
                    <Text p>Author: {log.author.name}</Text>
                    <Text p>Gold: {log.gold}  XP: {log.xp}</Text>
                    <Text h3>Character Logs</Text>
                    <ReduxLink to={"/logs/adventures/" + log.id + "/characters/new"}>
                        <Button raised>New Character Log</Button>
                    </ReduxLink>
                    <ReactTable
                        data={log.character_logs}
                        columns={columns}
                        minRows={5}
                        minWidth={0}
                        />
                </div>
                :null
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventureLogDetail)
