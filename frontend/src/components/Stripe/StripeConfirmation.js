import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import axios from "axios";
import { isSuccessful, getErrorMessage } from "../../utils/errorHandling";
import useSetLoading from "../../hooks/useSetLoading";

const StripeConfirmation = () => {
  const { search } = useLocation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  useSetLoading(isPending);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    axios
      .post(`/api/stripe/register/${code}`)
      .then(res => {
        if (isSuccessful(res)) {
          setSuccess(true);
          setIsPending(false);
        } else {
          setIsPending(false);
          setError(true);
        }
      })
      .catch(e => {
        setError(getErrorMessage(e));
        setIsPending(false);
      });
  }, []);

  if (success) {
    return <Redirect to="/plans" />;
  } else if (error) {
    return (
      <div className="stripe-error-container flex-center text-center">
        <p>
          Couldn't connect to Stripe. Please contact us at payment@chadify.me
        </p>
      </div>
    );
  }

  return null;
};

export default StripeConfirmation;
