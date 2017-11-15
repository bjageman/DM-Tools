import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Text, Button } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'

class AdventureLogListing extends React.Component {
    constructor(props){
        super(props)
        this.props.getAdventureLogListing({
            access_token: this.props.user.access_token
        })
    }

    render(){
        const adventures = this.props.logs.adventures.listing
        const columns = [
        {
            id: 'session',
            Header: 'Session',
            accessor: d => d, // Custom value accessors!
            Cell: props => <ReduxLink to={"/logs/adventures/" + props.value.id}><Button style={{margin:0, padding:0}}>{props.value.name}</Button></ReduxLink>
        },
        {
            Header: 'Length',
            accessor: 'checkpoint'
        },{
            Header: 'Players',
            accessor: 'treasurepoint'
        }
        ]
        return(
            <div>
                <Text h2>Adventure Logs</Text>
                <ReduxLink to="/logs/adventures/new">
                    <Button raised>New Adventure</Button>
                </ReduxLink>
                <ReactTable
                    data={adventures}
                    columns={columns}
                    minRows={5}
                    minWidth={0}
                    />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventureLogListing)
