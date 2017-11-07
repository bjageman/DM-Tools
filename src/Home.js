import React from 'react'

import { Text } from 'bjageman-react-toolkit'

class Home extends React.Component {
  render() {
    return (
    <div style={styles.landing}>
        <Text h1 style={styles.header}>DM Tools</Text>
        <div style={styles.textContainer}>
            <Text p>Various tools for managing your D&D Campaign</Text>
        </div>
    </div>
    )
  }
}

const styles = {
    landing: {
        width:"100%",
        height:200,
        padding: "10px",
        boxSizing: "border-box",
        backgroundColor: "grey",
        color: "white",
    },
    header: {
        textAlign: "center"
    },
    textContainer: {
        paddingTop: "10px",
        paddingLeft: "10%",
    }
}

export default Home
