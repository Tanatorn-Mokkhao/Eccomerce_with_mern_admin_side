import React from 'react'
import Header from '../header/header';
import { NavLink } from 'react-router-dom';
import { Row, Col ,Container } from 'react-bootstrap';
function Layout(props) {
    return (
        <div>
            <Header />
            {props.sidebar ?
            
                <div className="grid">
                    <div className="sidebar-menu">
                        <div className="sidebar-link"><NavLink to="/" className="navlink">Home</NavLink></div>
                        <div className="sidebar-link"><NavLink to="/product" className="navlink">Products</NavLink></div>
                        <div className="sidebar-link"><NavLink to="/order" className="navlink">orders</NavLink></div>
                        <div className="sidebar-link"><NavLink to="/category" className="navlink">category</NavLink></div>
                    </div>

                    <div className="Container">
                        {props.children}
                    </div>
            
                </div>
                : props.children }
           

        </div>
    )
}


export default Layout