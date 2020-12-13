import React, { Component } from 'react';
import { Form, Button, Col } from "react-bootstrap";

export default class ContactUsForm extends Component {
    
    state = {
        name: "",
        phone: ""
    }

    /* При заповненні форм зміна state */
    isChangedName = e => { if (e.target.value !== this.state.name) { this.setState({ name: e.target.value }); } }
    isChangedPhone = e => { if (e.target.value !== this.state.phone) { this.setState({ phone: e.target.value }); } }
    
    /* Надіслати контакти */
    sendContacts = async () => {
        let dataToFile = { "name": this.state.name, "phone": this.state.phone, "date": new Date() };
       
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToFile)
        }
        
        const response = await fetch('/data/dataContactUs', config);
        console.log(response);
    }

	render () {
		return (
            <div className="home-form-place container-fluid">
                <h1>Виникли питання?</h1>
                <p>Напишіть нам і ми зв&apos;яжемось з вами найближчим часом.</p>
                <div className="home-form">
                    <Form>
                        <Form.Row className="align-items-center">
                            <Form.Group as={Col} controlId="formHomeName">
                                <Form.Control type="name" placeholder="Ваше і&apos;мя" onChange={this.isChangedName} required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formHomePhone">
                                <Form.Control type="phone" placeholder="Номер телефону" onChange={this.isChangedPhone} required />
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" onClick={this.sendContacts} >Надiслати</Button>
                    </Form>
                </div>
            </div>
		);
	}
}