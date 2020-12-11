import React from 'react';

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CakeCard(props) {
    const [priceNumber, setPriceNumber] = React.useState(props.priceCake);
    const [qtyNumber, setQtyNumber] = React.useState(1);
    const [isOpen, setIsOpen] = React.useState(false);
    
    /* Відкрити та закрити модальне вікно */
    const showModal = () => { setIsOpen(true); };
    const hideModal = () => { setIsOpen(false); setPriceNumber(props.priceCake); setQtyNumber(1); };
    
    /* Змінити загальну вартість */
    const changePriceNumber = e => { setQtyNumber(e.target.value); setPriceNumber(e.target.value*props.priceCake); };
    
    /* Додати товар у кошик */
    const addProductToCart = () => {
        const oldCart = sessionStorage.getItem('cakeCart') ? sessionStorage.getItem('cakeCart') : "[]";
        const arrayCart =  JSON.parse(oldCart);  
        let cakeCart = {'id': props.idCake, 'name': props.nameCake, 'image': props.imgURL, 'price': props.priceCake, 
        'qty': qtyNumber};
        let exist = 1;

        arrayCart.map(cake => {
            if(cake.name === props.nameCake) {
                exist = 0;
                cake.qty = parseInt(cake.qty, 10)+parseInt(qtyNumber, 10);
                return cake.qty;
            }
            return exist;
        });
        
        if (exist === 1) { arrayCart.push(cakeCart); }
        
        sessionStorage.setItem('cakeCart', JSON.stringify(arrayCart));

        setIsOpen(false);
        setPriceNumber(props.priceCake);
        setQtyNumber(1);          
    }  

    return (
        <>
            <div className="cake-main">
                <div className="cake-solo">
                    <h1>{props.nameCake}</h1>
                    <img src={props.imgURL} alt=" " />
                    <div className="about-solo-cake"><div className="about-solo-cake-inside">{props.aboutCake}</div></div>
                    <div className="price-solo">{props.priceCake} грн</div>
                    <button className="btn button-main big-button" onClick={showModal}>Замовити</button>
                </div>
            </div>

            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Body>
                    <div className="cake-modal"> 
                        <div className="cake-modal-image">
                            <img src={props.imgURL} alt=" " />
                        </div>
                        <div className="cake-modal-info">
                            <button onClick={hideModal} className="button-modal-win close-modal-win"><FontAwesomeIcon icon={faTimes} /></button>
                            <h1>{props.nameCake}</h1>                    
                            <div className="price-modal">{props.priceCake} грн</div>
                            <hr></hr>
                            <div className="cake-qty">
                                <p>Кількість:</p> 
                                <input type="number" placeholder="1" className="qty qty-card-important" onChange={changePriceNumber} />
                            </div>
                            <div className="cake-subtotal">
                                <p>Загальна вартість:</p>
                                <div className="priceTotal priceTotalAddit">{priceNumber} грн</div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-primary" onClick={addProductToCart} >Додати у кошик</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CakeCard