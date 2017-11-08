import React from 'react'

class CharacterDetail extends React.Component {
    render(){
        const character_id = this.props.match.params.id
        return(
            <p>Detail Character {character_id}</p>
        )
    }
}

export default CharacterDetail
