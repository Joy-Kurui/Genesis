import React from 'react';
import CartItem from './CartItem';

const CartList = ({ cartItems, onRemove, saveCart,cart }) => {

//  fetch("http://localhost:3000/cart", {
//     method: "POST",
//     headers: {
//    "Content-Type": "application/json",
//     },
//     body: JSON.stringify(cart),
//     })
//  .then((r) => r.json())

//  .then((newItem) => saveCart(newItem));


  return (
    <div className="cart-list">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default CartList;