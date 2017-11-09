import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container, Text, Table, TableRow, Button } from 'bjageman-react-toolkit'
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
        const id = this.props.match.params.log_id
        const log = this.props.logs.adventures.detail || null
        return(
            <Container>
                <Text h2>Adventure Log {id}</Text>
                { log ?
                <div>
                    <Text p>Session Name: {log.name}</Text>
                    <Text p>Author: {log.author.name}</Text>
                    <Text p>Gold: {log.gold}  XP: {log.xp}</Text>
                    <Text h3>Character Logs</Text>
                    <ReduxLink to={"/logs/adventures/" + id + "/characters/new"}>
                        <Button raised>New Character Log</Button>
                    </ReduxLink>
                    <Table headers={["Name", "XP", "Gold"]} >
                    { log.character_logs.map((character_log, i ) =>
                        <TableRow
                            key = {i}
                            rows = {[
                                <ReduxLink to={"/logs/adventures/" + id + "/characters/" + i }>{character_log.character.name}</ReduxLink>,
                                character_log.xp,
                                character_log.gold
                            ]} />
                    )}
                    </Table>
                </div>
                :null }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventureLogDetail)
