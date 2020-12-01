import React, { Component } from 'react';

export default class Delivery extends Component {
	render () {
		return (
			<div className="wrapper">
			    <div className="container-fluid all-pages">
    			    <h2>Доставка та оплата</h2>
    			    <div>
    			        <b>Доставка:</b><br></br>
                        Доставляємо змовлення у зручний для Вас час по Чернівцях та Чернівецькій області.<br></br>
                        <br></br>
                        <ul>
                            <li>Доставка по Чернівцях — 150 грн;</li>
                            <li>Доставка по Чернівецькій області — 250 грн;</li>
                        </ul>
                        Або Ви можете забрати своє замовлення за адресою Чернівці, вулиця Вулиця, 5. В будь-який день, з 9:00 до 18:00.
                    </div> 
                    <br></br> 
                    <div> 
                        <b>Оплата:</b><br></br>
                        <div className="important-text">! Пам&apos;ятайте, у нас діє обов&apos;язкова передоплата у розмірі 50% від вартості торту.</div>
                        <br></br>
                        Оплату вашого замовлення Ви можете провести одним із наступних способів:
                        <ul>
                            <li>оплата готівкою;</li>
                            <li>перевод на карту Приват Банка.</li>
                        </ul>
                    </div>
                </div>
            </div>
		);
	}
}