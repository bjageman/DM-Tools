import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

class CharacterLogDetail extends React.Component {
    render(){
        const log = this.props.logs.adventures.detail
        const char_id = this.props.match.params.char_id
        let character_log = null
        if (char_id < log.character_logs.length){
            character_log = log.character_logs[char_id]
        }
        return(
            character_log ?
            <div>
                <p>CHAR LOG {log.id}</p>
                <p>{character_log.character.name}</p>
            </div>
            : null
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterLogDetail)
