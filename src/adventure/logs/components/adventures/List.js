import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Text, Button, Table, TableRow } from 'bjageman-react-toolkit'
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
        return(
            <div>
                <Text h2>Adventure Logs</Text>
                <ReduxLink to="/logs/adventures/new">
                    <Button raised>New Character</Button>
                </ReduxLink>
                    <Table headers={["Name", "Author", "XP", "Gold", "Characters", "Created"]}>
                        { adventures.map((adventure, i) =>
                            <TableRow rows={[
                                    <ReduxLink to={"/logs/adventures/" +adventure.id }>{adventure.name}</ReduxLink>, 
                                    adventure.author.name,
                                    adventure.xp,
                                    adventure.gold,
                                    adventure.character_logs.length,
                                    adventure.created]} />
                        )}
                    </Table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventureLogListing)
