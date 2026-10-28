import { useEffect, useState } from 'react'
import './App.css'

const services = [
  { icon: '💍', title: 'Wedding Catering', text: 'Make your special day unforgettable with an exquisite feast.' },
  { icon: '🎂', title: 'Birthday Parties', text: 'Delicious menus for celebrations filled with happiness.' },
  { icon: '🏢', title: 'Corporate Events', text: 'Professional catering for meetings, launches and events.' },
  { icon: '🥂', title: 'Private Gatherings', text: 'Beautiful menus and warm hospitality for every occasion.' },
]

const packages = [
  { name: 'Classic', price: 300, text: 'Essential favourites for a lovely gathering.' },
  { name: 'Premium', price: 450, text: 'A delightful menu for memorable celebrations.' },
  { name: 'Royal', price: 650, text: 'An indulgent dining experience for special occasions.' },
]

const menuItems = [
  {
    id: 1,
    name: 'Paneer Tikka',
    category: 'Starters',
    type: 'Veg',
    price: 220,
    description: 'Smoky tandoori paneer with aromatic Indian spices.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    name: 'Veg Spring Rolls',
    category: 'Starters',
    type: 'Veg',
    price: 160,
    description: 'Crispy golden rolls filled with fresh vegetables.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    name: 'Chicken Tikka',
    category: 'Starters',
    type: 'Non-Veg',
    price: 280,
    description: 'Tender chicken marinated with traditional spices.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 4,
    name: 'Paneer Butter Masala',
    category: 'Main Course',
    type: 'Veg',
    price: 320,
    description: 'Soft paneer in a rich, creamy tomato gravy.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 5,
    name: 'Chicken Biryani',
    category: 'Main Course',
    type: 'Non-Veg',
    price: 350,
    description: 'Fragrant basmati rice layered with spiced chicken.',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 6,
    name: 'Veg Biryani',
    category: 'Main Course',
    type: 'Veg',
    price: 260,
    description: 'Aromatic basmati rice with vegetables and herbs.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 7,
    name: 'Chocolate Brownie',
    category: 'Desserts',
    type: 'Veg',
    price: 140,
    description: 'A rich chocolate treat for a sweet finish.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 8,
    name: 'Gulab Jamun',
    category: 'Desserts',
    type: 'Veg',
    price: 100,
    description: 'Soft milk dumplings soaked in fragrant sugar syrup.',
    image: 'https://images.unsplash.com/photo-1666190092159-3c9e9a1a4a8c?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 9,
    name: 'Fresh Lime Cooler',
    category: 'Beverages',
    type: 'Veg',
    price: 90,
    description: 'A refreshing citrus drink served chilled.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 10,
    name: 'Cold Coffee',
    category: 'Beverages',
    type: 'Veg',
    price: 130,
    description: 'Smooth chilled coffee with a creamy finish.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80',
  },
]

const menuCategories = [
  'All',
  'Starters',
  'Main Course',
  'Desserts',
  'Beverages',
]

function readSavedData(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [guests, setGuests] = useState(100)
  const [selected, setSelected] = useState('Premium')
  const [event, setEvent] = useState('Wedding')

  const [bookings, setBookings] = useState(() =>
    readSavedData('caterease-bookings', [])
  )

  const [menuCategory, setMenuCategory] = useState('All')
  const [menuType, setMenuType] = useState('All')

  const [selectedDishes, setSelectedDishes] = useState(() =>
    readSavedData('caterease-selected-dishes', [])
  )

  const [notice, setNotice] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('caterease-bookings', JSON.stringify(bookings))
    } catch {
      // Bookings will remain available for this session.
    }
  }, [bookings])

  useEffect(() => {
    try {
      localStorage.setItem(
        'caterease-selected-dishes',
        JSON.stringify(selectedDishes)
      )
    } catch {
      // The menu still works if browser storage is unavailable.
    }
  }, [selectedDishes])

  const filteredMenu = menuItems.filter(item => {
    const matchesCategory =
      menuCategory === 'All' || item.category === menuCategory

    const matchesType =
      menuType === 'All' || item.type === menuType

    return matchesCategory && matchesType
  })

  const menuTotal = selectedDishes.reduce(
    (sum, dish) => sum + dish.price * dish.quantity,
    0
  )

  const totalDishes = selectedDishes.reduce(
    (sum, dish) => sum + dish.quantity,
    0
  )

  const chosenPackage = packages.find(item => item.name === selected)
  const packageTotal = guests * (chosenPackage?.price ?? 0)
  const total = packageTotal + menuTotal

  function addDish(item) {
    setSelectedDishes(previous => {
      const existing = previous.find(dish => dish.id === item.id)

      if (existing) {
        return previous.map(dish =>
          dish.id === item.id
            ? { ...dish, quantity: dish.quantity + 1 }
            : dish
        )
      }

      return [...previous, { ...item, quantity: 1 }]
    })

    setNotice(`${item.name} added to your menu.`)
  }

  function changeDishQuantity(id, change) {
    setSelectedDishes(previous =>
      previous
        .map(dish =>
          dish.id === id
            ? { ...dish, quantity: dish.quantity + change }
            : dish
        )
        .filter(dish => dish.quantity > 0)
    )

    setNotice('')
  }

  function bookEvent(e) {
    e.preventDefault()

    const form = e.currentTarget
    const customerName = form.elements.customer.value.trim()
    const eventDate = form.elements.date.value

    const booking = {
      id: Date.now(),
      name: customerName,
      date: eventDate,
      event,
      guests,
      package: selected,
      dishes: selectedDishes.map(dish => ({ ...dish })),
      packageTotal,
      foodTotal: menuTotal,
      total,
    }

    setBookings(previous => [...previous, booking])
    setNotice(`Thank you, ${customerName}! Your booking request has been received.`)

    form.reset()
    setGuests(100)
    setSelected('Premium')
    setEvent('Wedding')
    setSelectedDishes([])

    document.querySelector('#booking')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function cancelBooking(id) {
    setBookings(previous =>
      previous.filter(booking => booking.id !== id)
    )
  }

  return (
    <>
      <nav className="navbar">
        <a className="logo" href="#home">
          Cater<span>Ease.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#packages">Packages</a>
          <a href="#menu">Our Menu</a>
          <a href="#booking">Book Now</a>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              EXCEPTIONAL FOOD · EXTRAORDINARY MOMENTS
            </p>

            <h1>
              Every Occasion,
              <br />
              Beautifully <em>Catered.</em>
            </h1>

            <p className="hero-text">
              Thoughtfully crafted menus, exquisite flavours and
              exceptional hospitality for your most meaningful moments.
            </p>

            <a className="primary-btn" href="#booking">
              Plan Your Event ↗
            </a>

            <div className="hero-note">
              Weddings · Celebrations · Corporate Events
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1100&q=85"
              alt="Elegant event dining setup"
            />
            <div className="image-label">MADE FOR YOUR MOMENTS</div>
          </div>
        </section>

        <section className="intro">
          <p className="eyebrow">THE ART OF HOSPITALITY</p>
          <h2>Good food brings people together.</h2>
          <p>
            From intimate family gatherings to grand celebrations,
            we bring your vision to the table.
          </p>
        </section>

        <section className="section" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT WE DO</p>
              <h2>Made for every occasion.</h2>
            </div>

            <p>
              Every event deserves a menu as special as the people attending it.
            </p>
          </div>

          <div className="service-grid">
            {services.map(service => (
              <article className="service-card" key={service.title}>
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>

                <a
                  href="#booking"
                  onClick={() => {
                    const serviceEvent = service.title.split(' ')[0]

                    setEvent(
                      serviceEvent === 'Wedding'
                        ? 'Wedding'
                        : serviceEvent === 'Birthday'
                          ? 'Birthday'
                          : serviceEvent === 'Corporate'
                            ? 'Corporate'
                            : 'Private'
                    )
                  }}
                >
                  Explore service ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="package-section" id="packages">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR SIGNATURE PACKAGES</p>
              <h2>Thoughtfully curated packages.</h2>
            </div>

            <p>
              Wonderful food, flexible choices and transparent estimates.
            </p>
          </div>

          <div className="package-grid">
            {packages.map(item => (
              <article
                className={`package-card ${selected === item.name ? 'featured' : ''}`}
                key={item.name}
              >
                {item.name === 'Premium' && (
                  <span className="popular">MOST POPULAR</span>
                )}

                <h3>{item.name}</h3>
                <p>{item.text}</p>

                <div className="price">
                  ₹{item.price.toLocaleString('en-IN')}
                  <small> / guest</small>
                </div>

                <ul>
                  <li>Freshly prepared dishes</li>
                  <li>Customizable menu options</li>
                  <li>Professional service team</li>
                </ul>

                <button
                  className="outline-btn"
                  type="button"
                  onClick={() => {
                    setSelected(item.name)
                    document.querySelector('#booking')?.scrollIntoView({
                      behavior: 'smooth',
                    })
                  }}
                >
                  Choose {item.name}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* OUR MENU */}
        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FRESHLY PREPARED WITH LOVE</p>
              <h2>Explore our delicious menu.</h2>
            </div>

            <p>
              Discover your favourites and build a menu for your special event.
            </p>
          </div>

          <div className="menu-toolbar">
            <div>
              <p className="filter-label">Choose a category</p>

              <div className="menu-categories">
                {menuCategories.map(category => (
                  <button
                    key={category}
                    type="button"
                    className={`filter-btn ${menuCategory === category ? 'active' : ''}`}
                    onClick={() => setMenuCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="filter-label">Food preference</p>

              <div className="diet-filters">
                {['All', 'Veg', 'Non-Veg'].map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`diet-btn ${menuType === type ? 'active' : ''}`}
                    onClick={() => setMenuType(type)}
                  >
                    {type === 'All'
                      ? 'All dishes'
                      : type === 'Veg'
                        ? '🟢 Vegetarian'
                        : '🔴 Non-Vegetarian'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="menu-grid">
            {filteredMenu.map(item => {
              const selectedDish = selectedDishes.find(
                dish => dish.id === item.id
              )

              return (
                <article className="menu-card" key={item.id}>
                  <div className="menu-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <span className="food-type">
                      {item.type === 'Veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                    </span>
                  </div>

                  <div className="menu-card-content">
                    <p className="menu-item-category">{item.category}</p>
                    <h3>{item.name}</h3>
                    <p className="menu-description">{item.description}</p>

                    <div className="menu-card-bottom">
                      <strong className="menu-price">
                        ₹{item.price}
                      </strong>

                      <button
                        type="button"
                        className="add-dish-btn"
                        onClick={() => addDish(item)}
                      >
                        {selectedDish ? 'Add More +' : 'Add to Menu +'}
                      </button>
                    </div>

                    {selectedDish && (
                      <p className="dish-added">
                        Added · Quantity: {selectedDish.quantity}
                      </p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {filteredMenu.length === 0 && (
            <p className="empty-menu">
              No dishes match your filters. Please choose another category.
            </p>
          )}

          <div className="selected-menu">
            <div className="selected-menu-heading">
              <div>
                <p className="eyebrow">YOUR PERSONALIZED SELECTION</p>
                <h3>Your selected menu</h3>
              </div>

              <span>{totalDishes} item(s)</span>
            </div>

            {selectedDishes.length === 0 ? (
              <p className="empty-menu">
                Your menu is empty. Add dishes from above to get started!
              </p>
            ) : (
              <div className="selected-dishes-list">
                {selectedDishes.map(dish => (
                  <div className="selected-dish" key={dish.id}>
                    <div className="dish-subtotal">
                      <strong>{dish.name}</strong>
                      <span>
                        ₹{dish.price} × {dish.quantity} = ₹
                        {(dish.price * dish.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        aria-label={`Remove one ${dish.name}`}
                        onClick={() => changeDishQuantity(dish.id, -1)}
                      >
                        −
                      </button>

                      <span>{dish.quantity}</span>

                      <button
                        type="button"
                        aria-label={`Add one ${dish.name}`}
                        onClick={() => changeDishQuantity(dish.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="menu-total-row">
              <div>
                <span>Selected dishes subtotal</span>
                <strong>₹{menuTotal.toLocaleString('en-IN')}</strong>
              </div>

              <a className="primary-btn" href="#booking">
                Continue to Booking ↗
              </a>
            </div>
          </div>
        </section>

        {/* BOOKING FORM */}
        <section className="booking-section" id="booking">
          <div className="booking-copy">
            <p className="eyebrow">LET'S MAKE IT SPECIAL</p>

            <h2>
              Your occasion.
              <br />
              <em>Our passion.</em>
            </h2>

            <p>
              Tell us a little about your event and start planning a
              beautiful dining experience.
            </p>

            <div className="estimate">
              <span>YOUR ESTIMATED TOTAL</span>
              <strong>₹{total.toLocaleString('en-IN')}</strong>
              <small>
                {guests} guests · {selected} package
              </small>

              <div className="estimate-divider" />

              <p>
                Package subtotal: ₹{packageTotal.toLocaleString('en-IN')}
              </p>
              <p>
                Selected dishes: ₹{menuTotal.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <form className="booking-form" onSubmit={bookEvent}>
            <h3>Plan your event</h3>

            {notice && (
              <p className="booking-notice" role="status">
                {notice}
              </p>
            )}

            <label>
              Your full name
              <input
                name="customer"
                type="text"
                required
                placeholder="Enter your name"
              />
            </label>

            <label>
              Event type
              <select
                value={event}
                onChange={e => setEvent(e.target.value)}
              >
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Corporate</option>
                <option>Private</option>
              </select>
            </label>

            <label>
              Event date
              <input
                name="date"
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </label>

            <label>
              Number of guests <strong>{guests}</strong>
              <input
                type="range"
                min="25"
                max="500"
                step="25"
                value={guests}
                onChange={e => setGuests(Number(e.target.value))}
              />
            </label>

            <label>
              Choose your package
              <select
                value={selected}
                onChange={e => setSelected(e.target.value)}
              >
                {packages.map(item => (
                  <option key={item.name} value={item.name}>
                    {item.name} — ₹{item.price} per guest
                  </option>
                ))}
              </select>
            </label>

            <div className="booking-menu-summary">
              <h4>Selected dishes</h4>

              {selectedDishes.length === 0 ? (
                <p>No dishes selected yet.</p>
              ) : (
                selectedDishes.map(dish => (
                  <div className="booking-dish-row" key={dish.id}>
                    <span>
                      {dish.name} × {dish.quantity}
                    </span>
                    <strong>
                      ₹{(dish.price * dish.quantity).toLocaleString('en-IN')}
                    </strong>
                  </div>
                ))
              )}

              <div className="booking-dish-row booking-food-total">
                <span>Food subtotal</span>
                <strong>₹{menuTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <button
              className="primary-btn submit-btn"
              type="submit"
            >
              Request a Booking ↗
            </button>

            <small className="form-note">
              College project demo: booking requests are saved in this
              browser only. No real booking is submitted.
            </small>
          </form>
        </section>

        {/* BOOKING HISTORY */}
        {bookings.length > 0 && (
          <section className="section bookings" id="my-bookings">
            <p className="eyebrow">YOUR EVENTS</p>
            <h2>Booking requests</h2>

            {bookings.map(booking => (
              <article className="booking-row" key={booking.id}>
                <div>
                  <h3>
                    {booking.name} · {booking.event}
                  </h3>

                  <p>
                    {booking.date} · {booking.guests} guests · {booking.package}
                  </p>

                  {booking.dishes?.length > 0 && (
                    <p>
                      Dishes:{' '}
                      {booking.dishes
                        .map(dish => `${dish.name} × ${dish.quantity}`)
                        .join(', ')}
                    </p>
                  )}

                  <p>
                    Package: ₹
                    {(booking.packageTotal ?? booking.total).toLocaleString('en-IN')}
                  </p>

                  {booking.foodTotal > 0 && (
                    <p>
                      Food subtotal: ₹
                      {booking.foodTotal.toLocaleString('en-IN')}
                    </p>
                  )}

                  <strong>
                    Total estimate: ₹
                    {booking.total.toLocaleString('en-IN')}
                  </strong>
                </div>

                <button
                  className="outline-btn"
                  type="button"
                  onClick={() => cancelBooking(booking.id)}
                >
                  Cancel
                </button>
              </article>
            ))}
          </section>
        )}
      </main>

      <footer className="footer">
        <a className="logo" href="#home">
          Cater<span>Ease.</span>
        </a>

        <p>Every occasion, beautifully catered.</p>
        <small>© 2026 CaterEase · College project demo</small>
      </footer>
    </>
  )
}

export default App