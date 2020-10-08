import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Order from "./Order";
import "./Orders.css";
import { useStateValue } from "./StateProvider";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users") // Access users collection
        .doc(user?.uid) // Get user uid if the user is logged in
        .collection("orders") // Access orders of that user
        .orderBy("created", "desc") // Sort them by created date in descending order
        .onSnapshot((
          snapshot // Get the current data
        ) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id, // Get the id of the document and store it in id key
              data: doc.data(), // Get the data of the document and store it in data key
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
