import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        console.log(token,'token***');
        let response = await fetch("https://us-central1-auctee-1c671.cloudfunctions.net/stripePayment", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(token)
        });

        if (response.ok) console.log("Purchase Complete!", response)
        response.json()
        .then((res)=>{
            console.log(JSON.parse(res.body),'resss')
        })
    }


    render() {
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);