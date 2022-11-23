import React, { FC, ReactNode } from 'react'
import {Box} from "@mui/material"


interface ChildrenPros {
    children: ReactNode
}

const Layout:FC <ChildrenPros> = ({children}) => {

    return(
    <Box>
    
        
       { children } 
    </Box>
    )
}

export default Layout