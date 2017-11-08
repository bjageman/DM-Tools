import React from 'react'

import {AppBar, AppBarButton} from 'bjageman-react-toolkit'

import ReduxLink from 'base/components/links/Redux'

const LogSheetToolbar = () => {
    return(
        <AppBar style={{backgroundColor:"grey"}}>
            <ReduxLink to='/logs/dm'>
                <AppBarButton>
                    DM Logs
                </AppBarButton>
            </ReduxLink>
            <ReduxLink to='/logs/characters'>
                <AppBarButton>
                    Character Logs
                </AppBarButton>
            </ReduxLink>
        </AppBar>
    )
}

export default LogSheetToolbar
