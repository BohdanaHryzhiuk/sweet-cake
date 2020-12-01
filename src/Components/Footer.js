import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Footer extends Component {
	render () {
		return (
            <div className="footer d-none d-md-block">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2">
                            <img src="/Logo-red.png" alt=" " />
                        </div>
                        <div className="col-7 navigation-footer">
                            <a href="/cake">Торти</a>
                            <a href="/personal">Персоналізація торта</a>
                            <a href="/delivery">Доставка та оплата</a>
                            <a href="/about">Про нас</a>                            
                        </div>
                        <div className="col-3 contacts-footer">
                            <p>sweetcake&#64;gmail.com</p>
                            <p>&#43;380 000000000</p>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}