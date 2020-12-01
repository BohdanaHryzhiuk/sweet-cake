import React, { Component } from 'react';
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { faTimes, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ShoppingCart extends Component {
    state = {
        isOpen: false,
        newNumber: 1,
        priceNumberTotal: 0
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    totalPrice () {
    	let cakeCart = JSON.parse(sessionStorage.getItem('cakeCart'));
    	let copyCakeCart = cakeCart;
    	let totalNumber = 0;
        
        if (cakeCart !== null) { 
            copyCakeCart.map(cake => {
                if(cake.name !== null) { totalNumber = totalNumber+(cake.price*cake.qty); }
                return totalNumber;
            }); 
        }

        if (this.state.priceNumberTotal !== totalNumber){
            this.setState({ priceNumberTotal: totalNumber }); 
        }
    }

    upNumber = e =>  {
    	const target = e.target;
        let cakeCart=JSON.parse(sessionStorage.getItem('cakeCart'));
        let copyCakeCart = cakeCart;

        copyCakeCart.map(cake => {
            if(cake.name === target.name) {
                cake.qty = target.value;
                return cake.qty;
            }
        }); 
        
        sessionStorage.setItem('cakeCart', JSON.stringify(copyCakeCart));
        this.totalPrice();
        this.setState({ isOpen: false }); 
        this.setState({ isOpen: true });    
    }

    delItem (item) {
    	let cakeCart = JSON.parse(sessionStorage.getItem('cakeCart'));
        let copyCakeCart = cakeCart;

        copyCakeCart = copyCakeCart.filter(cake => cake.name !== item);
        sessionStorage.setItem('cakeCart', JSON.stringify(copyCakeCart));

        if (!copyCakeCart.length) {
        	sessionStorage.clear();
        }

        this.totalPrice();
        this.setState({ isOpen: false }); 
        this.setState({ isOpen: true });
    };

    renderItem () {
    	const products = JSON.parse(sessionStorage.getItem('cakeCart'));
        this.totalPrice();
        
        return ( 
            (products !== null) ? (  
        	products.map((product, key) => (
                <div><table><tbody><tr>
                    <td className="cartImage"><img src={product.image} alt=" " /></td>
                    <td className="cartName">{product.name}</td>
                    <td className="cartPrice">{product.price} ₴</td>
                    <td className="cartQty"><input type="number" name={product.name} placeholder={product.qty} className="qty" onChange={this.upNumber} /></td>
                    <td className="cartDel"><button className="button-modal-win button-modal-win-grey" onClick={() =>this.delItem(product.name)} ><FontAwesomeIcon icon={faTrash} /></button></td>                         
                </tr></tbody></table></div>))
            ):(
                <div className="emptyCart"> У корзині поки що нічого немає. </div>
            )
        );
    }

    render() {
        return (
            <>
                <button className="button-modal-win close-modal-win" onClick={this.openModal}><FontAwesomeIcon icon={faShoppingCart} /></button>
                
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Body>
                        <div className="cake-modal">
                            <table className="headerCartTable"><tbody><tr>
                                <td className="cartNameTop">Товар</td>
                                <td className="cartPriceTop">Ціна</td>
                                <td className="cartQtyTop">К-сть</td>             
                            </tr></tbody></table>
                            <button onClick={this.closeModal} className="button-modal-win close-modal-win button-up"><FontAwesomeIcon icon={faTimes} /></button>
                            <hr></hr>
                            <div className="cake-modal-cakes-list">
                                {this.renderItem()}
                            </div>
                            <hr></hr>
                            <div className="cake-subtotal">
                                <div className="priceTotal">{this.state.priceNumberTotal} грн</div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="/checkout" className="btn btn-primary">Оформити замовлення</a>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}