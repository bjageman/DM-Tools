import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

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
        return(
            <div>
                <Text h2>Character Logs</Text>
                <ReduxLink to="/logs/characters/new">
                    <Button raised>New Character</Button>
                </ReduxLink>
                    <Table headers={["Name", "Race", "Class", "Background", "Level"]}>
                        { characters.map((character, i) =>
                            <TableRow rows={[character.name, character.race, character.class, character.background, 0]} />
                        )}
                    </Table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterListing)
