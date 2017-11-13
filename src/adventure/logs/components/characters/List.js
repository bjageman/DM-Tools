import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Text, Button, Table, TableRow } from 'bjageman-react-toolkit'

import ReduxLink from 'base/components/links/Redux'

class CharacterListing extends React.Component {
    constructor(props){
        super(props)
        this.props.getCharacterListing({
            access_token: this.props.user.access_token
        })
    }

    render(){
        const characters = this.props.logs.characters.listing
        const columns = [
        {
            id: 'name',
            Header: 'Name',
            accessor: d => d, // Custom value accessors!
            Cell: props => <ReduxLink to={"/logs/characters/" + props.value.id}><Button style={{margin:0, padding:0}}>{props.value.name}</Button></ReduxLink>
        },
        {
            Header: 'Race',
            accessor: 'race'
        },{
            Header: 'Class',
            accessor: 'class'
        },{
            Header: 'Background',
            accessor: 'background'
        },
        // {
        //     Header: 'Options',
        //     accessor: 'id',
        //     Cell: props => (
        //         <Button onClick={() => this.handleDelete(props.value)} style={{margin:0, padding:0}} >Delete</Button>
        //         )
        // }
        ]
        return(
            <div>
                <Text h2>Character Logs</Text>
                <ReduxLink to="/logs/characters/new">
                    <Button raised>New Character</Button>
                </ReduxLink>
                <ReactTable
                    data={characters}
                    columns={columns}
                    minRows={5}
                    minWidth={0}
                    />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterListing)
