import React, { Component } from 'react';
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Admin extends Component {
    
    state = {
        isOpen: false,
        modalwindow: '',
        adminaccount: {"aemail": '', "apassword": ''},
        adminacess: 0,
        addConsist: {"cake": '', "biscuit": '', "cream": '', "fruit": '', "decor": ''},
        addCake: {"name": '', "fullname": '', "weight": '', "price": '', "photo": '', "status": ''},
        addBiscuit: {"name": '', "ingridients": ''},
        addCream: {"name": '', "ingridients": ''},
        addFruit: {"name": '', "ingridients": ''},
        addDecor: {"name": '', "ingridients": ''}
    }

    openModal = e => {  let modalname = e.target.name; this.setState({ isOpen: true }); this.setState({ modalwindow: modalname }); }
    closeModal = () => { this.setState({ isOpen: false }); this.setState({ modalwindow: '' }); }

    isChanged = e => { 
        let change = e.target.name;
        let changeSecond = e.target.title;
        let changeSt = this.state.[change];

        changeSt.[changeSecond] = e.target.value;

        if (e.target.value !== this.state.[change].[changeSecond]) { 
            this.setState({ [change]: changeSt }); 
        } 

        console.log(this.state.[change].[changeSecond]);
    }

    giveAcess = async e =>  {
        e.preventDefault();
        let dataAcess = { "email": this.state.adminaccount.aemail, "password": this.state.adminaccount.apassword };
        
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataAcess)
        }
        
        const response = await fetch('/data/dataUser', config);
        console.log(response.json());

        this.setState({ adminacess: 1 });
    }

    
     sendData = async e =>  {
        e.preventDefault();
        let nameD = this.state.modalwindow;
        let dataSend = this.state.[nameD];
        
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        }
        
        const response = await fetch('http://localhost:3000/data/dataAdd', config);
        console.log(response.json());
    }

    renderInsideModal () {
        let newInp = this.state.modalwindow;
        
        if (newInp === 'addConsist'){ 
            return(
                <div>
                    <input placeholder='Торт' className="input-text-checkout" onChange={this.isChanged} name="addConsist" title="cake" required></input>
                    <input placeholder='Корж' className="input-text-checkout" onChange={this.isChanged} name="addConsist" title="biscuit" required></input>
                    <input placeholder='Крем' className="input-text-checkout" onChange={this.isChanged} name="addConsist" title="cream" required></input>
                    <input placeholder='Поливка' className="input-text-checkout" onChange={this.isChanged} name="addConsist" title="fruit" required></input>
                    <input placeholder='Декор' className="input-text-checkout" onChange={this.isChanged} name="addConsist" title="decor"required></input>
                </div>
            )  
        }else if (newInp === 'addCake'){ 
            return(
                <div>
                    <input placeholder='Скорочена назва' className="input-text-checkout" onChange={this.isChanged} name="addCake" title="name" required></input>
                    <input placeholder='Повна назва' className="input-text-checkout" onChange={this.isChanged} name="addCake" title="fullname" required></input>
                    <input placeholder='Вага' className="input-text-checkout" onChange={this.isChanged} name="addCake" title="weight" required></input>
                    <input placeholder='Ціна' className="input-text-checkout" onChange={this.isChanged} name="addCake" title="price" required></input>
                    <input placeholder='Фото' className="input-text-checkout" onChange={this.isChanged} name="addCake" title="photo" required></input>
                    <input placeholder='Статус' className="input-text-checkout" onChange={this.isChanged} name="addCake" title="status" required></input>
                </div>
            )
        }else{ 
            return(
                <div>
                    <input placeholder='Назва' className="input-text-checkout" onChange={this.isChanged} name={newInp} title="name" required></input>
                    <input placeholder='Інгрідієнти' className="input-text-checkout" onChange={this.isChanged} name={newInp} title="ingridients" required></input>
                </div>
            )  
        }
    }

    adminInner () {
        return ((this.state.adminacess === 1) ? (  
            <div> 
                <h2>Панель Адмiнiстратора</h2>
                <br></br>

                <div className="row">
                    <div className="col-12 col-md-4"><button className="b-admin btn-primary" onClick={this.openModal} name='addConsist'>Склад торта</button></div>
                    <div className="col-12 col-md-4"><button className="b-admin btn-primary" onClick={this.openModal} name='addCake'>Торти</button></div>
                    <div className="col-12 col-md-4"><button className="b-admin btn-primary" onClick={this.openModal} name='addBiscuit'>Коржi</button></div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4"><button className="b-admin btn-primary" onClick={this.openModal} name='addCream'>Креми</button></div>
                    <div className="col-12 col-md-4"><button className="b-admin btn-primary" onClick={this.openModal} name='addFruit'>Поливки</button></div>
                    <div className="col-12 col-md-4"><button className="b-admin btn-primary" onClick={this.openModal} name='addDecor'>Декор</button></div>
                </div>
                
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Body>
                        <form onSubmit={this.sendData}>
                            <div className="cake-modal"> {this.renderInsideModal()} </div>
                            <button className="btn button-main big-button">Додати</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        ):(
            <div className="checkout-final">
                <br></br>
                <h6>Для доступу до Адмін-панелі введіть e-mail та пароль</h6> 
                <br></br>
                <form onSubmit={this.giveAcess}>
                    <div className="row">
                        <div className="col-12"><input type="e-mail" placeholder="Email*" className="input-text-checkout admin-acess" onChange={this.isChanged} name="adminaccount" title="aemail" required></input></div>
                        <div className="col-12"><input type="password" placeholder="Пароль*" className="input-text-checkout admin-acess" onChange={this.isChanged} name="adminaccount" title="apassword" required></input></div>
                    </div>
                    <button className="btn button-main big-button">Увiйти</button>
                </form>
            </div>
        ));
    }

	render () {
		return (
			<div className="wrapper">
			    <div className="container-fluid all-pages">
    		        {this.adminInner()}
                </div>
            </div>
		);
	}
}