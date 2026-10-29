
import React, { useState } from "react";
import "./App.css";

const foodItems = [
  { id: 1, name: "Margherita Pizza", category: "Pizza", price: 199, emoji: "🍕", rating: 4.8 },
  { id: 2, name: "Veg Burger", category: "Burger", price: 129, emoji: "🍔", rating: 4.6 },
  { id: 3, name: "White Sauce Pasta", category: "Pasta", price: 179, emoji: "🍝", rating: 4.7 },
  { id: 4, name: "French Fries", category: "Snacks", price: 99, emoji: "🍟", rating: 4.5 },
  { id: 5, name: "Paneer Pizza", category: "Pizza", price: 249, emoji: "🍕", rating: 4.9 },
  { id: 6, name: "Cheese Burger", category: "Burger", price: 159, emoji: "🍔", rating: 4.8 },
  { id: 7, name: "Chocolate Shake", category: "Drinks", price: 119, emoji: "🥤", rating: 4.6 },
  { id: 8, name: "Chocolate Cake", category: "Desserts", price: 149, emoji: "🍰", rating: 4.9 },
];

const categories = ["All", "Pizza", "Burger", "Pasta", "Snacks", "Drinks", "Desserts"];

function FoodCard({ food, addToCart }) {
  return (
    <div className="food-card">
      <div className="food-emoji">{food.emoji}</div>
      <div className="food-info">
        <span className="food-category">{food.category}</span>
        <h3>{food.name}</h3>
        <p className="rating">⭐ {food.rating} <span>• Fresh & tasty</span></p>
        <div className="food-bottom">
          <strong>₹{food.price}</strong>
          <button className="add-btn" onClick={() => addToCart(food)}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [message, setMessage] = useState("");

  const addToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === food.id);

      if (existing) {
        return prev.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...food, quantity: 1 }];
    });
    setMessage(`${food.name} added to cart!`);
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const filteredFoods = foodItems.filter((food) => {
    const matchesCategory = category === "All" || food.category === category;
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = () => {
    if (cart.length === 0) {
      setMessage("Your cart is empty!");
      return;
    }

    setMessage(`Order placed successfully! Total: ₹${total}`);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#" onClick={() => setShowCart(false)}>
          <span>🍴</span> Crave<span className="logo-accent">Kart</span>
        </a>

        <div className="nav-actions">
          <button className="nav-link" onClick={() => setShowCart(false)}>
            Home
          </button>
          <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
            🛒 Cart <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-text">
            <span className="hero-tag">🍽️ GOOD FOOD, GOOD MOOD</span>
            <h1>Your cravings,<br />delivered with <span>love.</span></h1>
            <p>Discover delicious food from our menu and get ready for a tasty experience.</p>
            <button
              className="hero-btn"
              onClick={() => {
                setShowCart(false);
                document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Menu ↓
            </button>
          </div>
          <div className="hero-art">
            <div className="hero-circle">
              <span>🍕</span>
              <span className="floating-food burger">🍔</span>
              <span className="floating-food fries">🍟</span>
              <span className="floating-food drink">🥤</span>
            </div>
          </div>
        </section>

        {message && (
          <div className="toast" role="status">
            {message}
            <button onClick={() => setMessage("")}>✕</button>
          </div>
        )}

        {showCart ? (
          <section className="cart-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2>Your Shopping Cart 🛒</h2>
              </div>
              <button className="back-btn" onClick={() => setShowCart(false)}>
                ← Back to menu
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🛍️</span>
                <h3>Your cart is empty</h3>
                <p>Add your favourite dishes to get started.</p>
                <button className="hero-btn" onClick={() => setShowCart(false)}>
                  Browse Food
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <span className="cart-emoji">{item.emoji}</span>
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>₹{item.price} each</p>
                      </div>
                      <div className="quantity">
                        <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <strong>₹{item.price * item.quantity}</strong>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div>
                    <p>Subtotal</p>
                    <h2>₹{total}</h2>
                  </div>
                  <button className="checkout-btn" onClick={checkout}>
                    Place Order →
                  </button>
                </div>
              </>
            )}
          </section>
        ) : (
          <section className="menu-section" id="menu">
            <div className="section-heading">
              <div>
                <span className="eyebrow">MADE WITH LOVE</span>
                <h2>Explore Our Menu</h2>
                <p>Something delicious for every craving.</p>
              </div>
            </div>

            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search your favourite food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="categories">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "category active" : "category"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="food-grid">
              {filteredFoods.map((food) => (
                <FoodCard key={food.id} food={food} addToCart={addToCart} />
              ))}
            </div>

            {filteredFoods.length === 0 && (
              <div className="empty-cart">
                <span>🔎</span>
                <h3>No food found</h3>
                <p>Try another search or select a different category.</p>
              </div>
            )}
          </section>
        )}
      </main>

      <footer>
        <p>🍴 CraveKart — Made with ❤️ for food lovers</p>
        <span>Fresh food. Happy mood.</span>
      </footer>
    </div>
  );
}

export default App;
