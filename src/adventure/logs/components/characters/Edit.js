import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container, Text, TextInput, Button } from 'bjageman-react-toolkit'

class CharacterEdit extends React.Component {
    state = {
        name: "",
        race: "",
        class: "",
        background:"",
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () =>{
        this.props.saveCharacter({
            "access_token": this.props.user.access_token,
            "name": this.state.name,
            "race": this.state.race,
            "class": this.state.class,
            "background": this.state.background,
        })
    }

    render(){
        return(
            <Container center>
                <Text h4>New Character</Text>
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Name" name="name" value={this.state.name} />
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Race" name="race" value={this.state.race} />
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Class" name="class" value={this.state.class} />
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Background" name="background" value={this.state.background}/>
                <Button onClick={this.handleSubmit} raised>CREATE CHARACTER</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CharacterEdit)
