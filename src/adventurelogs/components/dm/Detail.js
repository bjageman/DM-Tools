import React from 'react'

class CharacterDetail extends React.Component {
    render(){
        const id = this.props.match.params.id
        return(
            <p>DM Log Detail {id}</p>
        )
    }
}

export default CharacterDetail
