import React from 'react'
//Redux
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'redux/utils'

import Login from 'user/components/login/index'
import AccountMenu from 'user/components/tools/AccountMenu'
import ReduxLink from 'base/components/links/Redux'

import { AppBar, AppBarButton} from 'bjageman-react-toolkit'
import config from 'config.js'

class ToolBar extends React.Component {
    state = { open: false }
    onRequestClose() {
        this.setState({ open: false })
    }
    toggleDrawer = () => {
        this.setState({ open: !this.state.open })
    }

    render(){
        const brandName = config.APPNAME
        const user = this.props.user
        return(
            <div>
            <AppBar>
                <ReduxLink to={config.HOME_LINK}>
                    <AppBarButton> { brandName } </AppBarButton>
                </ReduxLink>
                { user.id ?
                    <div>
                    <ReduxLink to="/logs/">
                        <AppBarButton>Logs</AppBarButton>
                    </ReduxLink>
                    <AccountMenu  />
                    </div>
                : <Login /> }
            </AppBar>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
