import { useEffect, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Methi Thepla",
    category: "THEPLA",
    description:
      "A Gujarati favourite with aromatic fenugreek and traditional spices.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
    tag: "HOUSE FAVOURITE",
  },
  {
    id: 2,
    name: "Palak Thepla",
    category: "THEPLA",
    description:
      "A comforting green thepla inspired by homemade Gujarati cooking.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85",
    tag: "FRESH & FLAVOURFUL",
  },
  {
    id: 3,
    name: "Masala Khakhra",
    category: "KHAKHRA",
    description:
      "A crispy, spiced snack for your chai breaks and evening cravings.",
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=800&q=85",
    tag: "TEA-TIME CLASSIC",
  },
  {
    id: 4,
    name: "Gujarati Tiffin",
    category: "TIFFIN",
    description:
      "A homestyle meal concept with roti, sabzi and comforting flavours.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85",
    tag: "EVERYDAY COMFORT",
  },
];

const categories = ["ALL", "THEPLA", "KHAKHRA", "TIFFIN"];

function App() {
  const [category, setCategory] = useState("ALL");
  const [order, setOrder] = useState([]);
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [category]);

  const visibleProducts =
    category === "ALL"
      ? products
      : products.filter((product) => product.category === category);

  function addToOrder(product) {
    setOrder((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setOrder((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const itemCount = order.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="site-shell">
      <div className="demo-banner">
        WEBSITE PREVIEW · SAMPLE IMAGES · DETAILS TO BE CONFIRMED
      </div>

      <header className="navbar">
        <a className="brand" href="#home" aria-label="Aashapura Rasoi home">
          <span className="brand-mark">AR</span>
          <span>
            <strong>Aashapura Rasoi</strong>
            <small>HOMEMADE GUJARATI FOOD</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#menu">Our Menu</a>
          <a href="#tiffin">Tiffin Service</a>
          <a href="#story">Our Story</a>
        </nav>

        <button className="nav-order" onClick={() => setShowOrder(true)}>
          Your selection {itemCount > 0 && `(${itemCount})`}
        </button>
      </header>

      <main>
        <section className="hero" id="home" data-reveal>
          <div className="hero-copy">
            <span className="eyebrow">A LITTLE TASTE OF GUJARAT</span>
            <h1>
              Homemade goodness.
              <br />
              <em>Made with love.</em>
            </h1>
            <p>
              From comforting theplas to crispy khakhra and homestyle tiffin
              meals, discover the flavours of a Gujarati kitchen.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#menu">
                Explore our menu <span>↗</span>
              </a>
              <a className="button button-secondary" href="#tiffin">
                Discover tiffin
              </a>
            </div>
            <div className="hero-note">
              <span className="note-dot" />A preview of the Aashapura Rasoi
              experience
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90"
              alt="Sample food photography for the website concept"
            />
            <div className="image-caption">
              <span>THE COMFORT OF HOME</span>
              <strong>Good food, good feelings.</strong>
            </div>
            <div className="hero-stamp">
              <span>MADE</span>
              <strong>with</strong>
              <span>LOVE ♡</span>
            </div>
          </div>
        </section>

        <section className="promise-strip" data-reveal>
          <div>
            <span>01</span> Gujarati-inspired flavours
          </div>
          <div>
            <span>02</span> Snacks & tiffin favourites
          </div>
          <div>
            <span>03</span> Order enquiries made simple
          </div>
        </section>

        <section className="menu-section section-pad" id="menu" data-reveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">FROM OUR KITCHEN</span>
              <h2>
                A little something <em>for every craving.</em>
              </h2>
            </div>
            <p>
              Explore the menu concept. Final products, photographs, pack sizes
              and prices will be confirmed with the business owner.
            </p>
          </div>

          <div className="category-tabs" aria-label="Filter menu">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category active" : "category"}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item === "ALL" ? "Everything" : item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article
                className="product-card"
                key={product.id}
                data-reveal
                style={{ "--card-index": index }}
              >
                <div className="product-photo">
                  <img src={product.image} alt="" loading="lazy" />
                  <span className="product-tag">{product.tag}</span>
                  <span className="photo-disclaimer">Sample image</span>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-bottom">
                    <span className="price-note">Price to be confirmed</span>
                    <button
                      className={
                        order.some((item) => item.id === product.id)
                          ? "add-button added"
                          : "add-button"
                      }
                      onClick={() => addToOrder(product)}
                    >
                      {order.some((item) => item.id === product.id)
                        ? "Add another +"
                        : "Add to selection +"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="menu-disclaimer">
            Product descriptions and imagery are illustrative demo content, not
            a verified catalogue.
          </p>
        </section>

        <section className="tiffin-section" id="tiffin" data-reveal>
          <div className="tiffin-photo">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"
              alt="Illustrative homestyle meal photography"
              loading="lazy"
            />
          </div>
          <div className="tiffin-copy">
            <span className="eyebrow">YOUR HOMESTYLE MEAL MOMENT</span>
            <h2>
              A little taste of home, <em>wherever you are.</em>
            </h2>
            <p>
              Looking for a comforting Gujarati meal? Explore the tiffin service
              and enquire about meal options, availability and delivery
              arrangements.
            </p>
            <button
              className="button button-light"
              onClick={() => {
                setCategory("TIFFIN");
                document.getElementById("menu").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Explore tiffin options <span>↗</span>
            </button>
            <small>Plans, prices and service areas to be confirmed.</small>
          </div>
        </section>

        <section className="story-section section-pad" id="story" data-reveal>
          <span className="eyebrow">THE IDEA BEHIND THE FLAVOUR</span>
          <h2>
            Simple food. Familiar flavours. <em>A feeling of home.</em>
          </h2>
          <p>
            Aashapura Rasoi brings together the idea of Gujarati favourites and
            homestyle meals. This section can tell the founders' real story once
            they approve the wording.
          </p>
          <span className="story-signoff">
            Aashapura Rasoi · Mira Road East, Mumbai
          </span>
        </section>

        <section className="order-steps" data-reveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">MADE SIMPLE</span>
              <h2>
                Your favourites, <em>just a few steps away.</em>
              </h2>
            </div>
          </div>
          <div className="steps-grid">
            <div>
              <span>01</span>
              <h3>Explore</h3>
              <p>Browse the products and tiffin options.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Make a selection</h3>
              <p>Add the items you'd like to enquire about.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Confirm with us</h3>
              <p>
                Ordering details will be connected after the owner confirms the
                business number.
              </p>
            </div>
          </div>
          <button
            className="button button-primary"
            onClick={() => setShowOrder(true)}
          >
            Review your selection <span>↗</span>
          </button>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">AR</span>
          <span>
            <strong>Aashapura Rasoi</strong>
            <small>HOMEMADE GUJARATI FOOD</small>
          </span>
        </a>
        <p>Gujarati-inspired favourites, presented with warmth.</p>
        <span className="footer-location">
          Mira Road East · Mumbai, Maharashtra
        </span>
        <div className="footer-bottom">
          <span>© 2026 Aashapura Rasoi · Website concept preview</span>
          <span>Made with care ♡</span>
        </div>
      </footer>

      {showOrder && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowOrder(false);
          }}
        >
          <section
            className="order-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
          >
            <div className="modal-heading">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2 id="order-title">Your favourites.</h2>
              </div>
              <button
                className="close-button"
                onClick={() => setShowOrder(false)}
                aria-label="Close selection"
              >
                ×
              </button>
            </div>

            {order.length === 0 ? (
              <div className="empty-order">
                <span>♡</span>
                <h3>Your selection is empty</h3>
                <p>
                  Browse the menu and add something you'd like to enquire about.
                </p>
                <button
                  className="button button-primary"
                  onClick={() => {
                    setShowOrder(false);
                    document.getElementById("menu").scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Explore the menu
                </button>
              </div>
            ) : (
              <>
                <div className="order-items">
                  {order.map((item) => (
                    <div className="order-line" key={item.id}>
                      <div className="order-line-copy">
                        <strong>{item.name}</strong>
                        <span>{item.category} · Price to be confirmed</span>
                      </div>
                      <div className="quantity-control">
                        <button
                          onClick={() => changeQuantity(item.id, -1)}
                          aria-label={`Remove one ${item.name}`}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => changeQuantity(item.id, 1)}
                          aria-label={`Add one ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="demo-notice">
                  <strong>Demo preview only</strong>
                  <p>
                    This selection does not place an order. WhatsApp ordering
                    will be enabled after the business confirms its number and
                    menu details.
                  </p>
                </div>
                <button
                  className="button button-primary full-button"
                  onClick={() => {
                    setShowOrder(false);
                    alert(
                      "Demo only — no order has been sent. WhatsApp details will be added after owner approval.",
                    );
                  }}
                >
                  Preview enquiry flow
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
