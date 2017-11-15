import React from 'react'

//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import Select from 'react-select';
import { Container, Text, TextInput, Button } from 'bjageman-react-toolkit'


class AdventureLogEdit extends React.Component {
    state = {
        name: "",
        length: "",
        characters: [],
        tier: "",
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

    handleSubmit = () => {
        this.props.saveAdventureLog({
            "access_token": this.props.user.access_token,
            "name": this.state.name,
            "length": this.state.length,
            "tier": this.state.tier,
            "characters": this.state.characters,
        })
    }


    handleCharacterSelect = (value) => {
        console.log('Selected: ', value);
        this.setState({
            characters: value
        })
    }

    render(){
        let options = []
        this.props.logs.characters.listing.map((character, i) =>
            options.push({ value: character.id, label: character.name })
        )
        return(
            <Container center>
                <Text h2>New Adventure Log</Text>
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Name" name="name" value={this.state.name} />
                <div style={{width:"300px", margin: "auto"}}>
                    <Select
                      multi
                      placeholder="Add Characters"
                      name="characters"
                      value={this.state.characters}
                      options={options}
                      onChange={this.handleCharacterSelect}
                    />
                </div>
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Length (in hours)" name="length" value={this.state.length} />
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Tier" name="tier" value={this.state.tier} />
                <Button onClick={this.handleSubmit} raised>CREATE NEW LOG</Button>
                {/*Back to normal */}
            </Container>
        )
    }
}

const styles = {
    input: {
        width: "100%",
        maxWidth: "300px"
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventureLogEdit)
