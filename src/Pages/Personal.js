import React, { Component } from 'react';

export default class Personal extends Component {
    
    state = {
        data: [],
        dataPersonalCake: [],
    	checkboxText: "Персоналізований торт:",
    	price: 0,
    	text: "",
        image: "https://sladkopuziki.kiev.ua/wp-content/uploads/11-12.jpg",
        file: ""
    }

    /* Завантажити інформацію */
    componentDidMount() {
        fetch('data/dataPersonalCake.json')
        .then((response) => response.json())
        .then(cakeList => {
            this.setState({ dataPersonalCake: cakeList });
        });
    }

    /* Вивести на сторінку */
    renderfirst (cake, about) {
        const products = cake;
        console.log(products);
        if (products){
            if ((about === "cakeCoating") || (about === "cakeDecoration")) {
                return ( 
                    products.map((product, key) => (
                        <div><input type="checkbox" onClick={this.isChecked} id={product.id} className="input-radio" name={about} value={product.name} title={product.price}></input>
                        <label className="test" htmlFor={product.id}><div className="label-change hover-image">{product.name} — {product.price} грн <img src={product.imgURL} alt=""></img> </div></label></div>
                    ))
                )
            }else{
                return ( 
                    products.map((product, key) => (
                        <div><input type="checkbox" onClick={this.isChecked} id={product.id} className="input-radio" name={about} value={product.name} title={product.price}></input>
                        <label className="test" htmlFor={product.id}><div className="label-change">{product.name} — {product.price} грн</div></label></div>
                    ))
                )
            }
        }
    }
    
    /* Якщо компонент обрано */
    isChecked = e =>  {
        let value = e.target.value;
        let oldText = this.state.checkboxText;
        let newValue = '';

        let oldPrice = this.state.price;
        let myPrice = e.target.title;
        let newnew = e.target.name;
        let fil = {};

        if ((newnew === "cakeCoating") || (newnew === "cakeDecoration")){
            fil = this.state.dataPersonalCake.[newnew].filter( cake =>{
            return (cake.name.indexOf( value ) !== -1) });
            fil.map((product, key) => ( this.setState({ image: product.imgURL }) ));
        }

        if (oldText.includes(value)) {
        	newValue = oldText.replace(value,'');
        	myPrice = parseInt(oldPrice,10) - parseInt(myPrice,10);
        }else{
        	newValue = oldText + ' ' + value;
        	myPrice = parseInt(oldPrice,10) + parseInt(myPrice,10);
        }

        if (value !== oldText) {
            this.setState({ checkboxText: newValue });
            this.setState({ price: myPrice });
        }

        return console.log(fil);
    }

    /* Зміна додаткових полів */
    isChanged = e => { if (e.target.value !== this.state.text) { this.setState({ text: e.target.value }); } }
    isChangedFile = e => { if (e.target.value !== this.state.file) { this.setState({ text: e.target.file }); } }
    
    /* Додати в корзину */
    addProductToCart = () => {
        const oldCart = sessionStorage.getItem('cakeCart') ? sessionStorage.getItem('cakeCart') : "[]";
        const arrayCart =  JSON.parse(oldCart);  
        let newCake = this.state.checkboxText + ' ' + this.state.text;
        let cakeCart = {'id': '1010101', 'name': newCake, 'image': this.state.image, 'price': this.state.price, 
                        'weight': '2,5', 'qty': 1};

        arrayCart.push(cakeCart);
        sessionStorage.setItem('cakeCart', JSON.stringify(arrayCart));
    }

    render () {
        const uploadInf = this.state.dataPersonalCake;
        return (
            <div className="wrapper">
                <div className="container-fluid all-pages">
                    <h2>Створення персоналiзованного торта</h2>
                    
                    <div className="row"><div className="col-md-4 col-xs-12 cake-bis">
                        <h6>Коржі</h6>
                        <div className="personal-place">{this.renderfirst(uploadInf.cakeBase, "cakeBase")}</div>
                    </div>
                    <div className="col-md-4 col-xs-12 cake-bis">
                        <h6>Крем</h6>
                        <div className="personal-place">{this.renderfirst(uploadInf.cakeCream, "cakeCream")}</div>
                    </div>
                    <div className="col-md-4 col-xs-12 cake-bis">
                        <h6>Начинки</h6>
                        <div className="personal-place">{this.renderfirst(uploadInf.cakeFilling, "cakeFilling")}</div>
                    </div></div>
                    <div className="row"><div className="col-md-4 col-xs-12 cake-bis">
                        <h6>Покриття</h6>
                        <div className="personal-place">{this.renderfirst(uploadInf.cakeCoating, "cakeCoating")}</div>
                    </div>
                    <div className="col-md-4 col-xs-12 cake-bis">
                        <h6>Прикраси</h6>
                        <div className="personal-place">{this.renderfirst(uploadInf.cakeDecoration, "cakeDecoration")}</div>
                    </div>
                    <div className="col-md-4 col-xs-12 cake-bis">
                        <h6>Додаткові побажання</h6>
                        <div className="row"><div className="col-12"><textarea onChange={this.isChanged} placeholder="Ваші побажання" className="input-text-checkout input-text-personal impFile" name="Add"></textarea>
                        <input type="file" onChange={this.isChangedFile} className="input-file" name="File"></input></div></div>
                    </div></div>
                    <hr></hr>
                    <div className="personalPrice">
                    Ціна: {this.state.price} грн</div>
                    <div className="checkout-final"> 
                        <a href="/" className="btn button-main big-button" onClick={this.addProductToCart}>Додати у кошик</a>
                    </div>
                </div>
            </div>
        ); 
    }    
}