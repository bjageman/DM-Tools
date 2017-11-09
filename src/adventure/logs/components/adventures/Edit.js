import React from 'react'

//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import { Container, Text, TextInput, Button } from 'bjageman-react-toolkit'

class AdventureLogEdit extends React.Component {
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
        this.props.saveAdventureLog({
            "access_token": this.props.user.access_token,
            "name": this.state.name,
        })
    }

    render(){
        return(
            <Container center>
                <Text h2>New Adventure Log</Text>
                <TextInput onChange={this.handleChange} style={styles.input} placeholder="Name" name="name" value={this.state.name} />
                <Button onClick={this.handleSubmit} raised>CREATE NEW LOG</Button>
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
