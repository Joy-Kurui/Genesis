import React, { useState, useEffect } from 'react';
import CartList from './CartList';
import "/home/kurui/Development/code/Phase2/project-mintmade-practice/mintmade-app/src/App.css"

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setSavedCart] = useState([]);

  useEffect(() => {
    // Fetch products from the API endpoint
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

// Load cart data from local storage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    console.log(savedCart)
   // if (savedCart) {
      setSavedCart(savedCart);
   // }
  }, []);
 
   // Save cart data to local storage whenever it changes
  useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
   }, [cart]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };
  function handleSaveCart(newItem) {
    setSavedCart([...cart, newItem]);
  }

  return (
    <div className="app">
      <h1>React E-commerce App</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h2>Shopping Cart</h2>
      <CartList cartItems={cartItems} onRemove={removeFromCart} cart={cart} saveCart={handleSaveCart}/>
    </div>
  );
};

export default App;