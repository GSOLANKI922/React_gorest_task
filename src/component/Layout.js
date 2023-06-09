import React from 'react'
import CommonHeader from './Header'
import CommonFooter from './Footer'

const Layout = ({children}) => {
    return (
        <>
            <CommonHeader />
            <div className='layout'>
                {children}
            </div>
            <CommonFooter />

        </>
    )
}

export default Layout