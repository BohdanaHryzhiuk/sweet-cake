import React, { Component } from 'react';
import ContactUsForm from '../Components/ContactUsForm';

export default class About extends Component {
	render () {
		return (
			<div className="wrapper">
    			<div className="container-fluid about-page all-pages">
    			    <h2>Про нас</h2>
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <p><i>Свято!</i> Скільки приємних спогадів пов’язано з цим словом у кожного з нас. Ще малою дитиною ми з нетерпінням чекали свого 
                            Дня народження або Нового року. Нас чарує аромат домашньої їжі; приносить радість чудова компанія друзів та подарунки, 
                            поки, нарешті, не з’являється один з найважливіших елементів свята – торт! Навіть ставши дорослими, ми не 
                            можемо уявити собі святкування без торту, який незмінно стає головною зіркою святкового столу. </p>
                            <p>Ми розуміємо, наскільки важливим є для Вас святковий торт. І тому підходимо до роботи не тільки з професіоналізмом, але 
                            й з любов’ю.</p> 
                            <p>Не даремно кажуть, що будь-який десерт стане неперевершеним, якщо він приготовлений з позитивними та самими 
                            щирими емоціями. Ми перевірили це кредо на практиці і можем Вас запевнити, що таких смачних тортів, як у нас, Ви 
                            не зустрінете більше ніде. </p>
                            <p>Ми завжди готові допомогти підібрати Вам найкращу начинку та оформлення, а також втілити всі Ваші кондитерські фантазії! ;)</p>
                        </div>
                        <div className="col-12 col-md-5 about-map">
                            <iframe title="Ми на карті" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2654.37808388292!2d25.923630815064076!3d48.29557944812287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734089debc80d91%3A0x67a82246561362dc!2z0YPQuy4g0KPQvdC40LLQtdGA0YHQuNGC0LXRgtGB0LrQsNGPLCAzNywg0KfQtdGA0L3QvtCy0YbRiywg0KfQtdGA0L3QvtCy0LjRhtC60LDRjyDQvtCx0LvQsNGB0YLRjCwgNTgwMDA!5e0!3m2!1sru!2sua!4v1597932344434!5m2!1sru!2sua" 
                            width="100%" height="300" frameborder="0" style={{border: '0'}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div>
                    </div>
                    <div className="contact-about d-none d-sm-block"> <ContactUsForm /> </div>
		    	</div>
            </div>
		);
	}
}