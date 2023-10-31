import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";

import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";
import { useAuth } from "../../hooks/Auth";

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  // background: ;
  color: black;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, type, onSuccessfulCheckout }) => {
  const auth = useAuth();
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [suc, setSuc] = useState('')

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };

    setProcessingTo(true);

    const cardElement = elements.getElement("card");

    try {

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      console.log("paymentMethodReq:" + JSON.stringify(paymentMethodReq))
      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const payment_method = paymentMethodReq.paymentMethod.id;

      let data = {
        value: ev.target.value.value,
        currency: ev.target.currency.value,
        payment_method: payment_method,
        last_four: paymentMethodReq.paymentMethod.card.last4,
        email: auth.email,
        type: type,
        billing_details: billingDetails,
      }

      let headers = {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }

      const { data: clientSecret } = await axios.post('https://text.thelikey.com/api/pays',
        data, {
        headers
      })

      const { error } = await stripe.confirmCardPayment(clientSecret.client_secret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      auth.updateDetails();
      setSuc('Payment successful')
      onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const iframeStyles = {
    base: {
      color: "#000000",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Row>
        <BillingDetailsFields price={price} />
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      {suc.length > 0 ? (
        <p style={{ color: 'green', textAlign: 'center' }}>{suc}</p>
      ) : null}
      <Row>
        {/* TIP always disable your submit button while processing payments */}
        <SubmitButton disabled={isProcessing || !stripe}>
          {isProcessing ? "Processing..." : `Pay $${price}`}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default CheckoutForm;
