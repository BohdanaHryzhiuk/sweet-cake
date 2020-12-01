import React, { Component } from 'react';
import '../style.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import Cake from '../Pages/Cake';
import Personal from '../Pages/Personal';
import Delivery from '../Pages/Delivery';
import About from '../Pages/About';
import Admin from '../Pages/Admin';
import Checkout from '../Pages/Checkout';
import ShoppingCart from './ShoppingCart';

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Header extends Component {
    
    state = { isOpenMenu: false };

    openMenu = () => {
        if (this.state.isOpenMenu === false) { 
            this.setState({ isOpenMenu: true });
        }else{ 
            this.setState({ isOpenMenu: false }); 
        }
    }

    responsiveMenu () {
        let change = "";

        if (this.state.isOpenMenu === false) { 
            change = "nav-burger";
        }else{ 
            change = "nav-burger-open"; 
        }

        return ( 
            <div className="hamburger-menu">
                <a href="/cake" className={change}>Торти</a>
                <a href="/personal" className={change}>Персоналізація торта</a>
                <a href="/delivery" className={change}>Доставка та оплата</a>
                <a href="/about" className={change}>Про нас</a>  
            </div>
        );
    }

	render () {
		return (
            <>  <div className="header">
			    <div className="header-string"></div>
			    <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 col-md-1">
                            <div>
                                <a href="/"><img src="../logo-1.png" className="header-red-logo" alt=" "></img></a>
                            </div>
                        </div>
                        <div className="col-8 col-md-10 navigation">
                            <button className="button-modal-win button-hamburger" onClick={this.openMenu} ><FontAwesomeIcon icon={faBars} /></button>
                            {this.responsiveMenu()}                         
                        </div>
                        <div className="col-2 col-md-1 navigation"> <ShoppingCart /> </div>
                    </div>
                </div>
			</div>
            
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/cake" component={Cake} />
                    <Route exact path="/personal" component={Personal} />
                    <Route exact path="/delivery" component={Delivery} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route exact path="/admin" component={Admin} />
                </Switch>
            </Router>  </>
		);
	}
}