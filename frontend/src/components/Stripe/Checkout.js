import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { isSuccessful, getErrorMessage } from "../../utils/errorHandling";
import useSetLoading from "../../hooks/useSetLoading";

import { MainTile } from "../shared/Layout";

const stripe = window.Stripe("pk_test_wPnRpZ9w4Zl9pWkt2Wrh9KuH00tDuuNg0W");

const Checkout = () => {
  const { plan_id: planId } = useParams();
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);

  useSetLoading(!error && !sessionId);

  useEffect(() => {
    function createPaymentIntent() {
      axios
        .post(`/api/stripe/payment/${planId}`)
        .then(res => {
          const isSucc = isSuccessful(res);
          if (isSucc) {
            setSessionId(res.data.sessionId);
          }
        })
        .catch(err => setError(getErrorMessage(err)));
    }
    createPaymentIntent();
  }, [planId]);

  let view = null;
  if (sessionId) {
    stripe
      .redirectToCheckout({
        sessionId
      })
      .then(res => {
        if (res.error) {
          setError([{ message: res.error.message }]);
        }
      });
  }

  if (error) {
    view = <p className="text-center black">{error[0].message}</p>;
  }

  return (
    <MainTile>
      <div className="pt-50">{view}</div>
    </MainTile>
  );
};

export default Checkout;
