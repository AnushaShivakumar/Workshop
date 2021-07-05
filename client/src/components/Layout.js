import React from 'react';
import Navbar from './Navbar';
import Alert from './Alert';

const Layout = (props) => (
    <div>
        <Navbar />
        <Alert />
        {props.children}
    </div>
);

export default Layout;