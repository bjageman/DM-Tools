import React from 'react'

//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container, Text, TextInput, Button } from 'bjageman-react-toolkit'
import ReduxLink from 'base/components/links/Redux'

class AdventureLogEdit extends React.Component {
    state = {
        character_id: this.props.logs.characters.listing[0] ? this.props.logs.characters.listing[0].id : 0,
        checkpoint: "",
        treasurepoint: "",
        name: "",
    }
    constructor(props){
        super(props)
        this.props.getCharacterListing({
            access_token: this.props.user.access_token
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () =>{
        this.props.saveCharacterLog({
            "access_token": this.props.user.access_token,
            "log_id": this.props.logs.adventures.detail.id,
            "character_id": this.state.character_id,
            "checkpoint": this.state.checkpoint || 0,
            "treasurepoint": this.state.treasurepoint || 0,
            "name": this.state.name,
        })
    }

    render(){
        return(
            this.props.logs.characters.listing[0] ?
            <Container center>
                <Text h2>New Custom Log</Text>
                {this.state.character_id}
                <select style={{fontSize:"16px"}} name="character_id" value={this.state.character_id} onChange={this.handleChange}>
                    {this.props.logs.characters.listing.map((character, i) =>
                        <option key={i} value={character.id}>{character.id}) {character.name}</option>
                    )}
                </select>
                {"  "}<ReduxLink to="/logs/characters/new"><Button style={{margin:0, padding: 0}}>create a character</Button></ReduxLink>
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Description" name="name" value={this.state.name} />
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Checkpoint" name="checkpoint" value={this.state.checkpoint} />
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Treasure Point" name="treasurepoint" value={this.state.treasurepoint} />
                <Button onClick={this.handleSubmit} raised>CREATE NEW CHARACTER LOG</Button>
            </Container>
            : <Text p>You'll need to <ReduxLink to="/logs/characters/new"><Button style={{margin:0, padding: 0}}>create a character</Button></ReduxLink> in order to create a character log</Text>
        )
    }
}
//<TextInput onChange={this.handleChange} style={styles.input} placeholder="Character" name="character_id" value={this.state.character_id} />
const styles = {
    input: {
        width: "100%",
        maxWidth: "300px"
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventureLogEdit)
