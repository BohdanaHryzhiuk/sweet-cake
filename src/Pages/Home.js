import React, { Component } from 'react';
import ContactUsForm from '../Components/ContactUsForm';

export default class Home extends Component {
	render () {
		return (
			<div className="wrapper">
                <div className="home-header">
                    <div className="container-fluid home-header-new">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <div className="home-header-text">
                                    <h1>Найсмачнiшi</h1> 
                                    <h2>торти на замовлення у Чернiвцях</h2>
                                    <h4>Тут кожен знайде солодощі собі до душі.</h4>
                                    <div className="home-header-button"><a href="/cake" className="btn button-main big-button">Замовити</a></div>
                                </div>
                            </div>
                            <div className="d-none d-md-block col-md-8">
                                <img src="/Header-cake.png" alt=" " className="home-image-header"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="why-we d-none d-md-block">
                    <h1>Чому саме ми?</h1>
                    <div className="container-fluid why-we-string">
                        <div className="row">
                            <div className="col-4">
                                <img src="/1.png" alt=" "/>
                                <h5>Готуємо швидко і смачно</h5>
                            </div>
                            <div className="col-4">
                                <img src="/2.png" alt=" " />
                                <h5>Використовуємо тільки якісні продукти</h5>
                            </div>
                            <div className="col-4">
                                <img src="/3.png" alt=" " />
                                <h5>Доставляємо навіть ввечері</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-us-home d-none d-md-block">
                    <div className="contact-home-inner"> <ContactUsForm /> </div>
                </div>
            </div>
		);
	}
}