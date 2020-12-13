import React, { Component } from 'react';

export default class Personal extends Component {
    
    state = {
        data: [],
        dataPersonalCake: [],
    	checkboxText: "Персоналізований торт:",
    	price: 0,
        priceweight: 0,
    	text: "",
        image: "https://sladkopuziki.kiev.ua/wp-content/uploads/11-12.jpg",
        weight: "2,5",
        cake: [],
        cakeCream: [],
        cakeBase: [],
        cakeDecoration: [],
        cakeFilling: [],
        cakeCoating: []
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
        
        let newNewnew = this.state.[newnew];
        let newInfo = {};

        if ((newnew === "cakeCoating") || (newnew === "cakeDecoration")) {
            fil = this.state.dataPersonalCake.[newnew].filter( cake =>{
                return (cake.name.indexOf( value ) !== -1) });
            fil.map((product, key) => ( this.setState({ image: product.imgURL }) ));
        }

        if (oldText.includes(value)) {
        	newValue = oldText.replace(value,'');

            newNewnew = newNewnew.filter(element => element.name !== value);
            this.setState({ [newnew]: newNewnew });
            
            console.log(newNewnew);

        	myPrice = parseInt(oldPrice,10) - parseInt(myPrice,10);
        }else{
        	newValue = oldText + ' ' + value;

            let addToArr = this.state.dataPersonalCake.[newnew].filter( cake =>{
                return (cake.name.indexOf( value ) !== -1) });
            addToArr.map((product, key) => ( newInfo = {'id': product.id, 'name': product.name, 'price': product.price }));

            newNewnew.push(newInfo);
            this.setState({ [newnew]: newNewnew });

            myPrice = parseInt(oldPrice,10) + parseInt(myPrice,10);
        }

        if (value !== oldText) {
            this.setState({ checkboxText: newValue });
            this.setState({ price: myPrice });
        }
    }

    /* Зміна додаткових полів */
    isChanged = e => { if (e.target.value !== this.state.text) { this.setState({ text: e.target.value }); } }
    
    isCheckedWeight = e =>  { 
        if (e.target.value !== this.state.weight) { 
            this.setState({ weight: e.target.value }); 
        } 
    }

    /* Додати в корзину */
    addProductToCart = () => {
        const oldCart = sessionStorage.getItem('cakeCart') ? sessionStorage.getItem('cakeCart') : "[]";
        const oldPersonalCart = sessionStorage.getItem('cakePersonalCart') ? sessionStorage.getItem('cakePersonalCart') : "[]";

        const arrayCart =  JSON.parse(oldCart);
        const arrayPersonalCart =  JSON.parse(oldPersonalCart);    
        
        let newCake = this.state.checkboxText + ' ' + this.state.text;
        let cakeCart = {'name': newCake, 'image': this.state.image, 'price': this.state.price, 'about': "Персоналізований торт.", 
                        'weight': this.state.weight, 'qty': 1, 'status': "персональний", "dateOfCreating": new Date()};
        
        let personalCakeCart = {"cake": { 'nameCake': newCake, 'imgURL': this.state.image, 'aboutCake': "Персоналізований торт.",
                                'weightCake': this.state.weight, 'priceCake': this.state.price, 'status': "персональний", 
                                'dateOfCreating': new Date() },
                                "cakeCream": this.state.cakeCream, "cakeBase": this.state.cakeBase, "cakeDecoration": this.state.cakeDecoration,
                                "cakeFilling": this.state.cakeFilling, "cakeCoating": this.state.cakeCoating };

        arrayCart.push(cakeCart);
        arrayPersonalCart.push(personalCakeCart);

        sessionStorage.setItem('cakeCart', JSON.stringify(arrayCart));
        sessionStorage.setItem('cakePersonalCart', JSON.stringify(arrayPersonalCart));
    }

    weightChangesPrice () {
        let prWg = this.state.price;

        if (this.state.weight === "1,5") {
            prWg = Math.floor(parseInt(prWg,10)/2);
        }else if(this.state.weight === "3,5") {
            prWg = parseInt(prWg,10) + Math.floor(parseInt(prWg,10)/2);  
        }

        if (this.state.priceweight !== prWg) { this.setState({ priceweight: prWg });  }
        return ( <div> Ціна: {this.state.priceweight} грн </div> );
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
                        <h6>Вага торта</h6>
                        <div className="row">
                            <div className="col-4">
                                <input type="radio" id="weight1" className="input-radio" onClick={this.isCheckedWeight} name="weightMethod" value="1,5"></input>
                                <label className="test" htmlFor="weight1">1,5 кг</label>
                            </div>
                            <div className="col-4">
                                <input type="radio" id="weight2" className="input-radio" onClick={this.isCheckedWeight} name="weightMethod" value="2,5"></input>
                                <label className="test" htmlFor="weight2">2,5 кг</label>
                            </div>
                            <div className="col-4">
                                <input type="radio" id="weight3" className="input-radio" onClick={this.isCheckedWeight} name="weightMethod" value="3,5"></input>
                                <label className="test" htmlFor="weight3">3,5 кг</label>
                            </div>
                        </div>

                        <h6>Додаткові побажання</h6>
                        <div className="row">
                            <div className="col-12">
                            <textarea onChange={this.isChanged} placeholder="Ваші побажання" className="input-text-checkout input-text-personal impFile" name="Add"></textarea>
                            </div>
                        </div>

                    </div></div>

                    <hr></hr>

                    <div className="personalPrice"> {this.weightChangesPrice()} </div>

                    <div className="checkout-final"> 
                        <a href="/" className="btn button-main big-button" onClick={this.addProductToCart}>Додати у кошик</a>
                    </div>
                </div>
            </div>
        ); 
    }    
}