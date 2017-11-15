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
            Header: 'Description',
            accessor: 'name'
        },
        {
            id: 'character',
            Header: 'Character',
            accessor: d => d, // Custom value accessors!
            Cell: props => (
                props.value.character ?
                    <ReduxLink to={"/logs/characters/" + props.value.character.id}>
                        <Button style={{margin:0, padding:0}}>{props.value.character.name}</Button>
                    </ReduxLink>
                : "Loading..."
            )
        },
        {
            Header: 'Checkpoints',
            accessor: 'checkpoint'
        },{
            Header: 'Treasure Points',
            accessor: 'treasurepoint'
        }
        ]
        return(
             log ?
                <div>
                    <Text h2>{log.name}</Text>
                    <Text p>Author: {log.author.name}</Text>
                    {/*Placeholders*/}
                    <Text p>Length (in hours): {log.length} </Text>
                    <Text p>Tier: {log.tier} </Text>
                    <Text p>Players: Mary, Sue, Bob, Jerry</Text>
                    {/*Back to normal */}
                    <Text h3>Extra Details</Text>
                    <ReduxLink to={"/logs/adventures/" + log.id + "/characters/new"}>
                        <Button raised>Add Custom Log</Button>
                    </ReduxLink>
                    { log.character_logs ?
                        <ReactTable
                            data={log.character_logs}
                            columns={columns}
                            minRows={5}
                            minWidth={0}
                            filterable
                            />
                    : null }
                </div>
                :null
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventureLogDetail)
