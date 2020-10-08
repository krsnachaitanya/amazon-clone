import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
              {console.log(value)}
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        /* Part of the homework */
        value={getBasketTotal(basket, console.log(basket))}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button
        onClick={(e) =>
          basket.length < 1
            ? alert("Add products to checkout")
            : history.push("/payment")
        }
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
