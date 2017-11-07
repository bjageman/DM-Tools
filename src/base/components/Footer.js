import React from 'react'

import config from 'config.js'

class Footer extends React.Component {
    render(){
        return(
            <div style={styles.footer}>
                {config.APPNAME} {config.COPYRIGHTDATE}
            </div>
        )
    }
}

const styles = {
    footer: {
      right: 0,
      bottom: 0,
      left: 0,
      padding: "1rem",
      backgroundColor: "#efefef",
      textAlign: "center",
  }
}

export default Footer
