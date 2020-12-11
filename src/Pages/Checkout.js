import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Checkout extends Component {
    
    state = {
        priceTotalCheckout: 0,
        namecheck: "",
        surnameCheck: "",
        number: "",
        address: "",
        addition: "",
        email: "",
        paymentMethod: "",
        deliveryMethod: 0,
        completed: 0
    };
    
    /* Вивести товар з кошика */
    renderCheckoutList () {
    	const products = JSON.parse(sessionStorage.getItem('cakeCart'));
        this.totalPrice();

        return ( 
            (products !== null) ? (  
        	products.map((product, key) => (
                <table className="checkoutList"><tbody><tr>
                    <td className="checkoutListName">{product.name}</td>
                    <td className="checkoutListQty">{product.qty}</td>                    
                    <td className="checkoutListPrice">{product.price} ₴</td>
                </tr></tbody></table>
            ))
            ):(
                <div className="emptyCart"> У кошику поки що нічого немає. </div>
            )
        );
    }
    
    /* При заповненні полів */
    isChanged = e => { 
    	let change = e.target.name;
    	
        if (e.target.value !== this.state.[change]) { 
    		this.setState({ [change]: e.target.value }); 
    	} 
    }
    
    /* Вибір оплати та доставки */
    isCheckedDelivery = e =>  { if (e.target.value !== this.state.deliveryMethod) { this.setState({ deliveryMethod: e.target.value }); } }
    isCheckedPay = e =>  { if (e.target.value !== this.state.paymentMethod) { this.setState({ paymentMethod: e.target.value }); } }
    
    /* Загальна вартість */
    totalPrice () {
        let cakeCart = JSON.parse(sessionStorage.getItem('cakeCart'));
        let copyCakeCart = cakeCart;
        let totalNumber = 0;
        
        if (cakeCart !== null) { 
            copyCakeCart.map(cake => {
                if(cake.name !== null) {
                    totalNumber = totalNumber+(cake.price*cake.qty);
                } 
                return totalNumber;
            }); 
        }

        if (this.state.priceTotalCheckout !== totalNumber){
            this.setState({ priceTotalCheckout: totalNumber }); 
        }
    }

    /* Відіслати замовлення */
    sendCheckout = async e =>  {
        e.preventDefault();
        let timer = null;

        let orderNew = sessionStorage.getItem('cakeCart');
        let fullname = '';
        fullname = this.state.namecheck + ' ' + this.state.surnameCheck;

        let dataToFile = { "order": orderNew, 
                           "nameSurname": fullname , 
                           "numberPhone": this.state.number, 
                           "email": this.state.email,
                           "address": this.state.address, 
                           "comment": this.state.addition, 
                           "payment": this.state.paymentMethod, 
                           "delivery": this.state.deliveryMethod, 
                           "total": this.state.priceTotalCheckout, 
                           "date": new Date() };
       
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToFile)
        }
        
        const response = await fetch('http://localhost:3000/data/dataCheckout', config);
        console.log(response.json());

        timer = setTimeout(() => this.setState({ completed: 1 }), 10000);
    }
    
    /* Склад замовлення */
    checkoutInner () {
        if (this.state.completed === 1) { sessionStorage.clear(); }

        return ((this.state.completed === 0) ? (  
            <><h2>Оформлення замовлення</h2>
            
            <h6>Ваше замовлення</h6>
            <table className="checkoutListTop"><tbody><tr>
                <td className="checkoutListName">Товар</td>
                <td className="checkoutListQty">К-сть</td>                    
                <td className="checkoutListPrice">Ціна</td>
            </tr></tbody></table>

            {this.renderCheckoutList()}
                    
            <table className="checkoutListBottom"><tbody><tr>
                <td className="allPrice">Сума замовлення</td>
                <td className="allPriceNumber">{this.state.priceTotalCheckout} грн</td>
            </tr></tbody></table>
                    
            <form onSubmit={this.sendCheckout}>
                <div className="row">
                    <div className="col-sm-6 col-xs-12 client-contacts">
                        <h6>Ваші контакти</h6>
                    
                        <div className="row"> 
                            <div className="col-sm-6 col-xs-12"><input placeholder="Ім&#39;я*" onChange={this.isChanged} className="input-text-checkout" name="namecheck" required></input></div>
                            <div className="col-sm-6 col-xs-12"><input placeholder="Прізвище*" onChange={this.isChanged} className="input-text-checkout" name="surnameCheck" required></input></div>
                        </div>
                        <div className="row"> 
                            <div className="col-sm-6 col-xs-12"><input placeholder="Телефон*" onChange={this.isChanged} className="input-text-checkout" name="number" required></input></div>
                            <div className="col-sm-6 col-xs-12"><input placeholder="E-mail*" onChange={this.isChanged} className="input-text-checkout" name="email" required></input></div>
                        </div>
                        <div className="row"><div className="col-12"><input placeholder="Адреса доставки*" onChange={this.isChanged} className="input-text-checkout" name="address" required></input></div></div>
                        <div className="row"><div className="col-12"><input placeholder="Коментар" onChange={this.isChanged} className="input-text-checkout" name="addition"></input></div></div>
                    </div>
                    <div className="col-sm-6 col-xs-12 checkout-additions">
                        <h6>Спосіб оплати</h6>
                    
                        <div><input type="radio" id="paymentMethod1" className="input-radio" onClick={this.isCheckedPay} name="paymentMethod" value="Готівкою"></input>
                        <label className="test" htmlFor="paymentMethod1">Оплата готівкою</label></div>
                        <div><input type="radio" id="paymentMethod2" className="input-radio" onClick={this.isCheckedPay} name="paymentMethod" value="На карту"></input>
                        <label className="test" htmlFor="paymentMethod2">Переказ на карту Приват Банка</label></div>
                    
                        <h6>Спосіб доставки</h6>
                    
                        <div><input type="radio" id="deliveryMethod1" className="input-radio" onClick={this.isCheckedDelivery} name="deliveryMethod" value="0"></input>
                        <label className="test" htmlFor="deliveryMethod1">Самовивіз - 0 грн</label></div>
                        <div><input type="radio" id="deliveryMethod2" className="input-radio" onClick={this.isCheckedDelivery} name="deliveryMethod" value="150"></input>
                        <label className="test" htmlFor="deliveryMethod2">Доставка по Чернівцям - 150 грн</label></div>
                        <div><input type="radio" id="deliveryMethod3" className="input-radio" onClick={this.isCheckedDelivery} name="deliveryMethod" value="250"></input>
                        <label className="test" htmlFor="deliveryMethod3">Доставка по Чернівецькій області - 250 грн</label></div>
                    </div>
                </div>
                <div className="checkout-final"> 
                    <button className="btn button-main big-button">Замовити</button>
                    <p>Після оформлення замовлення ми зв&#39;яжемось з Вами в найближчий час.</p>
                </div>
            </form></>
        ):(
            <div className="checkout-final"> 
                <a href="/" className="btn button-main big-button">Спасибi за замовлення!</a>
                <p>Ми зв&#39;яжемось з Вами в найближчий час.</p>
            </div>
        ));
    }

    render () {
        return (
            <div className="wrapper">
                <div className="container-fluid all-pages">
                    {this.checkoutInner()}
                </div>
            </div>
        ); 
    }
}