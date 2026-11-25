import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChefHat,
  ChevronDown,
  Clock3,
  CupSoda,
  Heart,
  House,
  Leaf,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Truck,
  Utensils,
  X,
} from "lucide-react";
import "./App.css";

const PHONE = "9456333444";
const SECOND_PHONE = "7248888388";
const AREAS = [
  "Bhimtal",
  "Nakuchiyatal",
  "Sattal",
  "Mehragaon",
  "Tallital",
  "Bharatpur",
  "Sangurigaon",
  "Chafi",
];
const PLATE_50 = [
  { id: "plate", label: "Per plate", price: 50, unit: "plate" },
];

const DISHES = [
  {
    id: "dahi-jalebi",
    name: "Dahi Jalebi",
    hindi: "दही जलेबी",
    description:
      "सुनहरी, चाशनी में डूबी कुरकुरी जलेबी, ठंडी और मलाईदार दही के साथ — यही है मामा रेस्टोरेंट की खास पहचान।",
    tag: "MAMA’S SIGNATURE",
    note: "मीठा, खट्टा और भीमताल का खास स्वाद",
    art: "jalebi",
    icon: Sparkles,
    signature: true,
    options: PLATE_50,
  },
  {
    id: "rajma",
    name: "Rajma Chawal",
    hindi: "राजमा चावल",
    description:
      "धीमी आँच पर पके राजमा की गाढ़ी, घर जैसी मसालेदार ग्रेवी — स्वाद जो हमेशा अपना लगे।",
    tag: "THE HOMESTYLE CLASSIC",
    note: "फूले हुए गरम चावल के साथ",
    art: "rice",
    icon: Heart,
    options: [
      { id: "half", label: "Half plate", price: 50, unit: "half plate" },
      { id: "full", label: "Full plate", price: 100, unit: "full plate" },
    ],
  },
  {
    id: "kadhi",
    name: "Kadhi Chawal",
    hindi: "कढ़ी चावल",
    description:
      "दही से बनी हल्की खट्टी, मलाईदार कढ़ी जिसमें खुशबूदार भारतीय मसालों का तड़का।",
    tag: "A BOWL OF COMFORT",
    note: "फूले हुए गरम चावल के साथ",
    art: "kadhi",
    icon: Sparkles,
    options: [
      { id: "half", label: "Half plate", price: 50, unit: "half plate" },
      { id: "full", label: "Full plate", price: 100, unit: "full plate" },
    ],
  },
  {
    id: "chole",
    name: "Chole Chawal",
    hindi: "छोले चावल",
    description: "मसालेदार और भरपूर छोले, घर के बने भोजन जैसी गर्माहट और संतुष्टि के साथ।",
    tag: "BIG ON FLAVOUR",
    note: "फूले हुए गरम चावल के साथ",
    art: "chole",
    icon: Utensils,
    options: [
      { id: "half", label: "Half plate", price: 50, unit: "half plate" },
      { id: "full", label: "Full plate", price: 100, unit: "full plate" },
    ],
  },
  {
    id: "chola-samosa",
    name: "Chola Samosa",
    hindi: "छोला समोसा",
    description:
      "कुरकुरा समोसा, गरमा-गरम मसालेदार छोले के साथ — स्वादिष्ट और पेट भरने वाला नाश्ता।",
    tag: "STREET-STYLE FAVOURITE",
    note: "स्वादिष्ट और पेट भरने वाली प्लेट",
    art: "chola-samosa",
    icon: Utensils,
    options: PLATE_50,
  },
  {
    id: "plain-samosa",
    name: "Plain Samosa",
    hindi: "सादा समोसा",
    description: "सुनहरी और कुरकुरी परत के अंदर मसालेदार आलू और मटर की स्वादिष्ट भरावन।",
    tag: "CRISP & GOLDEN",
    note: "ताज़ा तला हुआ, गरमा-गरम",
    art: "samosa",
    icon: Heart,
    options: [{ id: "piece", label: "Per piece", price: 15, unit: "piece" }],
  },
  {
    id: "lassi",
    name: "Sweet Lassi",
    hindi: "मीठी लस्सी",
    description:
      "ठंडी, गाढ़ी और मलाईदार मीठी लस्सी — खाने के साथ ताज़गी भरा बेहतरीन स्वाद।",
    tag: "COOL & REFRESHING",
    note: "ठंडी और ताज़ा परोसी जाती है",
    art: "lassi",
    icon: CupSoda,
    options: [{ id: "serve", label: "Per serve", price: 50, unit: "serve" }],
  },
];

const SIGNATURE_DISH = DISHES.find((dish) => dish.signature);
const REGULAR_DISHES = DISHES.filter((dish) => !dish.signature);

function Brand({ footer = false }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#home"
      aria-label="Mama Restaurant home"
    >
      <span className="brand-name">
        MAMA
        <span className="brand-leaf">
          <Leaf size={17} strokeWidth={1.5} />
        </span>
      </span>
      <span className="brand-subtitle">
        <span /> RESTAURANT <span />
      </span>
    </a>
  );
}

function ScooterIcon({ size = 24, strokeWidth = 1.5 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="5" cy="18" r="3" />
      <circle cx="20" cy="18" r="3" />
      <circle cx="12" cy="3.5" r="1.7" />
      <path d="M3 14h7l4-5h4l2 6M4 11h6M10 7l-1 4h5l2 6M12 7l4 2M8 18h7M17 6h2l1 9" />
    </svg>
  );
}

function FoodArtwork({ type, large = false }) {
  if (type === "jalebi")
    return (
      <svg
        className={`food-art food-art-jalebi ${large ? "food-art-large" : ""}`}
        viewBox="0 0 320 250"
        role="img"
        aria-label="Decorative illustration of dahi jalebi"
      >
        <ellipse className="art-shadow" cx="160" cy="210" rx="112" ry="18" />
        <ellipse className="art-plate" cx="160" cy="142" rx="122" ry="78" />
        <ellipse
          className="art-plate-inner"
          cx="160"
          cy="137"
          rx="105"
          ry="61"
        />
        <path
          className="art-jalebi"
          d="M82 135c-28-35 24-64 52-32 25 29-24 61-47 30-18-25 20-48 36-25 16 24-17 39-28 21M131 142c-21-34 31-59 54-25 22 34-31 58-52 23-15-26 23-43 36-18 11 22-19 33-27 15M179 136c-17-35 37-54 55-17 17 35-37 52-53 16-11-26 28-38 37-13 8 22-21 29-27 9"
        />
        <ellipse className="art-dahi" cx="160" cy="127" rx="50" ry="32" />
        <path className="art-dahi-shine" d="M134 117c13-12 35-15 52-5" />
        <circle className="art-garnish" cx="145" cy="113" r="3" />
        <circle className="art-garnish" cx="174" cy="118" r="3" />
        <path className="art-garnish-line" d="m154 108 5-8m9 11 8-7" />
      </svg>
    );
  if (type === "samosa" || type === "chola-samosa")
    return (
      <svg
        className="food-art"
        viewBox="0 0 260 220"
        role="img"
        aria-label={`Decorative illustration of ${type === "chola-samosa" ? "chola samosa" : "samosa"}`}
      >
        <ellipse className="art-shadow" cx="130" cy="186" rx="88" ry="14" />
        {type === "chola-samosa" && (
          <>
            <ellipse className="art-bowl" cx="158" cy="141" rx="65" ry="42" />
            <circle className="art-chole" cx="139" cy="135" r="8" />
            <circle className="art-chole" cx="160" cy="126" r="8" />
            <circle className="art-chole" cx="177" cy="143" r="8" />
            <circle className="art-chole" cx="151" cy="151" r="8" />
          </>
        )}
        <path className="art-samosa" d="M50 166 96 70l48 96Z" />
        <path className="art-samosa-fold" d="m96 70 5 70-51 26m51-26 43 26" />
        {type === "chola-samosa" && (
          <path
            className="art-samosa art-samosa-second"
            d="m104 162 38-79 42 79Z"
          />
        )}
      </svg>
    );
  if (type === "lassi")
    return (
      <svg
        className="food-art"
        viewBox="0 0 260 220"
        role="img"
        aria-label="Decorative illustration of a glass of lassi"
      >
        <ellipse className="art-shadow" cx="130" cy="190" rx="58" ry="12" />
        <path className="art-glass" d="M78 51h104l-15 130H93Z" />
        <path className="art-lassi" d="M84 71h92l-12 102H96Z" />
        <ellipse className="art-foam" cx="130" cy="70" rx="46" ry="13" />
        <path className="art-straw" d="m153 70 23-47" />
        <path
          className="art-mint"
          d="M126 58c-15-17-27 0-4 8m5-8c13-19 29-3 5 8"
        />
      </svg>
    );
  return (
    <svg
      className="food-art"
      viewBox="0 0 260 220"
      role="img"
      aria-label="Decorative illustration of curry and rice"
    >
      <ellipse className="art-shadow" cx="130" cy="187" rx="92" ry="14" />
      <ellipse className="art-bowl" cx="130" cy="135" rx="88" ry="58" />
      <path
        className="art-rice"
        d="M50 136c6-45 37-63 78-55-8 17-15 44-12 90-38 3-62-8-66-35Z"
      />
      <path
        className={`art-curry art-curry-${type}`}
        d="M126 83c51-11 86 19 84 52-1 27-33 43-93 36-4-37 0-66 9-88Z"
      />
      <circle className="art-spice" cx="154" cy="120" r="8" />
      <circle className="art-spice" cx="177" cy="143" r="7" />
      <circle className="art-spice" cx="185" cy="112" r="6" />
      <path
        className="art-herb"
        d="M161 103c8-16 19-8 9 4 16-5 18 8 2 10-4 15-15 9-10-3-15 2-14-10-1-11Z"
      />
    </svg>
  );
}

function QualitySeal({ small = false }) {
  return (
    <div
      className={`quality-seal ${small ? "quality-seal-small" : ""}`}
      aria-label="Hygienic, tasty, healthy"
    >
      <div className="seal-inner">
        <span className="seal-stars">★ ★ ★</span>
        <span>HYGIENIC</span>
        <strong>TASTY</strong>
        <span>HEALTHY</span>
        <Leaf size={22} strokeWidth={1.5} />
      </div>
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActiveSection(entry.target.id),
        ),
      { rootMargin: "-20% 0px -50% 0px" },
    );
    ["menu", "promise", "delivery"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  const links = [
    { id: "menu", label: "Our menu" },
    { id: "promise", label: "The Mama promise" },
    { id: "delivery", label: "Delivery areas" },
  ];
  return (
    <>
      <div className="announcement">
        <span>
          <Truck size={15} /> A little love, delivered to your doorstep.
        </span>
        <span className="announcement-right">
          Free home delivery <span className="announcement-dot">✦</span> Bhimtal
          & beyond
        </span>
      </div>
      <header className="site-header">
        <div className="container nav-container">
          <Brand />
          <nav
            className={`navigation ${mobileOpen ? "navigation-open" : ""}`}
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <a
                key={link.id}
                className={activeSection === link.id ? "nav-active" : ""}
                href={`#${link.id}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="button button-maroon nav-call"
              href={`tel:+91${PHONE}`}
            >
              <Phone size={16} /> Call to order
            </a>
          </nav>
          <button
            className="mobile-menu-button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section
      className="hero hero-signature"
      id="home"
      aria-labelledby="hero-title"
    >
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> BHIMTAL’S ICONIC SWEET
          </div>
          <h1 id="hero-title">
            Meet our
            <br />
            <em>Dahi Jalebi.</em>
          </h1>
          <p className="hero-hindi" lang="hi">
            मामा की खास दही जलेबी
          </p>
          <p className="hero-description hindi-description" lang="hi">
            कुरकुरी सुनहरी जलेबी, ठंडी मलाईदार दही के साथ।
            <br className="desktop-break" /> मीठा, खट्टा और बिल्कुल मामा जैसा खास
            स्वाद।
          </p>
          <div className="signature-price">
            <span>OUR SIGNATURE PLATE</span>
            <strong>₹50</strong>
            <small>per plate</small>
          </div>
          <div className="hero-actions">
            <a className="button button-maroon" href="#signature-dish">
              Order the signature <ArrowRight size={18} />
            </a>
            <a className="hero-call" href={`tel:+91${PHONE}`}>
              <span className="round-icon">
                <Phone size={18} />
              </span>
              <span>
                Hungry? Give us a call<strong>94563 33444</strong>
              </span>
            </a>
          </div>
          <div className="founder-note">
            <span className="founder-avatar">
              <ChefHat size={22} />
            </span>
            <div>
              <span>A familiar taste. A family feeling.</span>
              <p>
                Welcome to <strong>Mama Restaurant.</strong>
              </p>
            </div>
            <span className="founder-signature">Mama</span>
          </div>
        </div>
        <div className="hero-art signature-hero-art">
          <div className="hero-art-orbit" aria-hidden="true" />
          <span className="hero-sparkle sparkle-one" aria-hidden="true">
            ✧
          </span>
          <span className="hero-sparkle sparkle-two" aria-hidden="true">
            ✧
          </span>
          <div className="signature-illustration">
            <span className="signature-ribbon">THE TASTE OF MAMA</span>
            <FoodArtwork type="jalebi" large />
            <div className="signature-art-copy">
              <strong>
                DAHI <span>×</span> JALEBI
              </strong>
              <small>an iconic Bhimtal pairing</small>
            </div>
          </div>
          <QualitySeal />
          <div className="delivery-float">
            <span className="delivery-float-icon">
              <ScooterIcon size={26} />
            </span>
            <div>
              <strong lang="hi">फ्री होम डिलीवरी</strong>
              <span>Good food. At your doorstep.</span>
            </div>
            <span className="delivery-float-check">
              <Check size={14} strokeWidth={3} />
            </span>
          </div>
          <div className="hero-image-note">
            <Leaf size={13} /> Made fresh. Served with love.
          </div>
        </div>
      </div>
      <a href="#menu" className="scroll-hint" aria-label="Scroll to our menu">
        <ArrowDown size={15} />
        <span>DISCOVER THE FULL MENU</span>
      </a>
    </section>
  );
}

function InfoBar() {
  return (
    <section className="info-bar" aria-label="Restaurant information">
      <div className="container info-grid">
        <div className="info-item">
          <span className="info-icon">
            <Clock3 size={24} strokeWidth={1.5} />
          </span>
          <div>
            <span className="info-label">YOUR LUNCH, SORTED</span>
            <strong>10:00 AM – 4:00 PM</strong>
            <span className="info-detail">Serving fresh, every lunchtime</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">
            <Truck size={27} strokeWidth={1.5} />
          </span>
          <div>
            <span className="info-label">FROM OUR KITCHEN TO YOUR HOME</span>
            <strong>Always free delivery</strong>
            <span className="info-detail">
              In Bhimtal & our nearby neighbourhoods
            </span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">
            <Phone size={24} strokeWidth={1.5} />
          </span>
          <div>
            <span className="info-label">LET’S GET YOUR ORDER STARTED</span>
            <strong>
              <a href={`tel:+91${PHONE}`}>94563 33444</a>
              <span className="phone-divider"> / </span>
              <a href={`tel:+91${SECOND_PHONE}`}>72488 88388</a>
            </strong>
            <span className="info-detail">A quick call is all it takes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceOptions({ dish, selected, onSelect }) {
  return (
    <div
      className={`portion-options ${dish.options.length === 1 ? "single-option" : ""}`}
      role="group"
      aria-label={`${dish.name} serving`}
    >
      {dish.options.map((option) => (
        <button
          key={option.id}
          className={selected === option.id ? "portion-selected" : ""}
          aria-pressed={selected === option.id}
          onClick={() => onSelect(option.id)}
        >
          <span>{option.label}</span>
          <strong>₹{option.price}</strong>
        </button>
      ))}
    </div>
  );
}

function DishCard({ dish, onOrder }) {
  const [serving, setServing] = useState(
    dish.options[dish.options.length - 1].id,
  );
  const TagIcon = dish.icon;
  return (
    <article className="dish-card">
      <div className={`dish-image dish-image-${dish.id}`}>
        <span className="dish-tag">
          <TagIcon size={12} /> {dish.tag}
        </span>
        <FoodArtwork type={dish.art} />
        <span className="veg-symbol" aria-label="Vegetarian">
          <span />
        </span>
      </div>
      <div className="dish-content">
        <div className="dish-title">
          <h3>{dish.name}</h3>
          <span lang="hi">{dish.hindi}</span>
        </div>
        <p className="dish-description hindi-description" lang="hi">
          {dish.description}
        </p>
        <div className="rice-note hindi-description" lang="hi">
          <Leaf size={13} /> {dish.note}
        </div>
        <PriceOptions dish={dish} selected={serving} onSelect={setServing} />
        <button
          className="button dish-order"
          onClick={() => onOrder(dish, serving)}
        >
          Order {dish.name} <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

function SignatureDish({ dish, onOrder }) {
  return (
    <article className="signature-dish" id="signature-dish">
      <div className="signature-dish-art">
        <span className="signature-number">01</span>
        <FoodArtwork type={dish.art} large />
        <span className="signature-photo-note">
          Your photo can be added here later
        </span>
      </div>
      <div className="signature-dish-copy">
        <div className="eyebrow">
          <Sparkles size={13} /> THE DISH THAT DEFINES US
        </div>
        <span className="signature-kicker">MAMA’S ICONIC SPECIAL</span>
        <h3>
          {dish.name} <span lang="hi">{dish.hindi}</span>
        </h3>
        <p className="hindi-description" lang="hi">
          {dish.description}
        </p>
        <div className="signature-tasting-notes">
          <span>CRISP</span>
          <i>✦</i>
          <span>CREAMY</span>
          <i>✦</i>
          <span>SWEET & TANGY</span>
        </div>
        <div className="signature-order-row">
          <div>
            <small>ONE SIGNATURE PLATE</small>
            <strong>₹50</strong>
          </div>
          <button
            className="button button-maroon"
            onClick={() => onOrder(dish, "plate")}
          >
            Order Dahi Jalebi <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

function MenuSection({ onOrder }) {
  return (
    <section
      className="menu-section section-space"
      id="menu"
      aria-labelledby="menu-title"
    >
      <div className="container">
        <div className="section-heading menu-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> ONE ICON. PLENTY OF COMFORT.
            </div>
            <h2 id="menu-title">
              Start with our signature.
              <br />
              <em>Stay for your favourites.</em>
            </h2>
            <p>
              Sweet, savoury and homestyle — there is something for every
              craving.
            </p>
          </div>
          <span className="vegetarian-badge">
            <span className="veg-symbol">
              <span />
            </span>{" "}
            100% vegetarian
          </span>
        </div>
        <SignatureDish dish={SIGNATURE_DISH} onOrder={onOrder} />
        <div className="menu-subheading">
          <span>MORE FROM MAMA’S KITCHEN</span>
          <i />
          <small>Meals, snacks & sips</small>
        </div>
        <div className="dish-grid">
          {REGULAR_DISHES.map((dish) => (
            <DishCard key={dish.id} dish={dish} onOrder={onOrder} />
          ))}
        </div>
        <div className="menu-footnote">
          <Heart size={14} />
          <span>
            Honest prices. Familiar flavours.{" "}
            <strong>Something delicious from just ₹15.</strong>
          </span>
        </div>
      </div>
    </section>
  );
}

function PromiseSection() {
  const promises = [
    {
      icon: ShieldCheck,
      title: "Clean kitchen. Peace of mind.",
      text: "Prepared with care, because good food begins with good hygiene.",
    },
    {
      icon: Heart,
      title: "That familiar, homestyle taste.",
      text: "Comforting Indian recipes and the simple joy of a satisfying meal.",
    },
    {
      icon: Leaf,
      title: "Wholesome by nature.",
      text: "Hearty vegetarian meals that leave you happy, full, and ready for your day.",
    },
  ];
  return (
    <section
      className="promise-section"
      id="promise"
      aria-labelledby="promise-title"
    >
      <div className="container promise-layout">
        <div className="promise-intro">
          <div className="eyebrow">
            <span className="eyebrow-line" /> THE MAMA PROMISE
          </div>
          <h2 id="promise-title">
            A meal you can
            <br />
            <em>feel good about.</em>
          </h2>
          <p>
            Food is our way of taking care of you.
            <br />
            And we take that to heart.
          </p>
          <div className="promise-signoff">
            <QualitySeal small />
            <span>
              Hygienic. Tasty. Healthy.
              <br />
              <strong>That’s the Mama way.</strong>
            </span>
          </div>
        </div>
        <div className="promise-list">
          {promises.map((item) => (
            <div className="promise-item" key={item.title}>
              <span className="promise-icon">
                <item.icon size={26} strokeWidth={1.4} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliverySection() {
  return (
    <section
      className="delivery-section section-space"
      id="delivery"
      aria-labelledby="delivery-title"
    >
      <div className="container delivery-layout">
        <div className="delivery-illustration" aria-hidden="true">
          <div className="delivery-route">
            <span className="route-pin">
              <MapPin size={24} />
            </span>
            <span className="route-house">
              <House size={53} strokeWidth={1.2} />
            </span>
            <span className="route-truck">
              <ScooterIcon size={80} strokeWidth={1.25} />
            </span>
            <span className="route-heart">
              <Heart size={17} fill="currentColor" />
            </span>
            <span className="route-sparkle">✧</span>
          </div>
          <div className="delivery-illustration-label">
            FROM OUR KITCHEN <Heart size={12} /> TO YOUR HOME
          </div>
        </div>
        <div className="delivery-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> YOUR NEIGHBOURHOOD, OUR FAMILY
          </div>
          <h2 id="delivery-title">
            You stay comfy.
            <br />
            <em>We’ll bring lunch.</em>
          </h2>
          <p>
            Get delivery at your doorstep — with no delivery charge.
            <br className="desktop-break" /> Proudly serving Bhimtal and the
            places you call home.
          </p>
          <ul className="delivery-areas" aria-label="Free delivery locations">
            {AREAS.map((area) => (
              <li key={area}>
                <MapPin size={14} />
                {area}
              </li>
            ))}
          </ul>
          <a className="delivery-call" href={`tel:+91${PHONE}`}>
            Not sure if we deliver to you? Give Mama a call{" "}
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="eyebrow">GOOD FOOD IS JUST A CALL AWAY</div>
            <h2>
              Let Mama take care <em>of lunch.</em>
            </h2>
            <p>Freshly made. Happily delivered. Every day, 10 AM – 4 PM.</p>
          </div>
          <a className="button button-gold" href={`tel:+91${PHONE}`}>
            <Phone size={18} /> Call to order <ArrowRight size={17} />
          </a>
        </div>
        <div className="footer-middle">
          <div className="footer-brand-block">
            <Brand footer />
            <span lang="hi">मामा रेस्टोरेंट · घर जैसा स्वाद</span>
          </div>
          <div className="footer-contact">
            <span>Say hello to Mama</span>
            <a href={`tel:+91${PHONE}`}>+91 94563 33444</a>
            <a href={`tel:+91${SECOND_PHONE}`}>+91 72488 88388</a>
          </div>
          <div className="footer-lunch">
            <Clock3 size={18} />
            <div>
              <span>Lunch hours</span>
              <strong>10:00 AM – 4:00 PM</strong>
            </div>
          </div>
          <div className="footer-delivery">
            <Truck size={21} />
            <div>
              <span lang="hi">फ्री होम डिलीवरी</span>
              <strong>Bhimtal & nearby areas</strong>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Mama Restaurant. Made with love in
            Bhimtal.
          </span>
          <span>
            <Heart size={12} /> Famous for Dahi Jalebi.
          </span>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

function OrderDialog({ order, onClose }) {
  const [serving, setServing] = useState(order.serving);
  const [quantity, setQuantity] = useState(1);
  const [area, setArea] = useState("");
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const selectedOption =
    order.dish.options.find((option) => option.id === serving) ||
    order.dish.options[0];
  const total = selectedOption.price * quantity;
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(event) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = [
        ...dialogRef.current.querySelectorAll(
          "button:not([disabled]), a[href], select",
        ),
      ];
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="order-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
        aria-describedby="order-help"
        ref={dialogRef}
      >
        <button
          className="dialog-close"
          ref={closeRef}
          onClick={onClose}
          aria-label="Close order"
        >
          <X size={21} />
        </button>
        <div className="eyebrow">
          <ChefHat size={15} /> A LITTLE TASTE OF HOME
        </div>
        <div className="dialog-dish">
          <div className="dialog-art">
            <FoodArtwork type={order.dish.art} />
          </div>
          <div>
            <h2 id="order-title">{order.dish.name}</h2>
            <p lang="hi">{order.dish.hindi}</p>
            <span>
              <Leaf size={12} /> Vegetarian · Freshly served
            </span>
          </div>
        </div>
        {order.dish.options.length > 1 && (
          <div className="order-field">
            <span id="portion-label">Pick your portion</span>
            <PriceOptions
              dish={order.dish}
              selected={serving}
              onSelect={setServing}
            />
          </div>
        )}
        <div className="quantity-row">
          <span>How many {selectedOption.unit}s?</span>
          <div className="quantity-control">
            <button
              aria-label={`Remove one ${selectedOption.unit}`}
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              <Minus size={16} />
            </button>
            <output aria-live="polite">{quantity}</output>
            <button
              aria-label={`Add one ${selectedOption.unit}`}
              disabled={quantity === 20}
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="order-field">
          <label htmlFor="delivery-area">
            Your delivery area{" "}
            <span className="optional-label">(optional)</span>
          </label>
          <div className="select-wrapper">
            <MapPin size={16} />
            <select
              id="delivery-area"
              value={area}
              onChange={(event) => setArea(event.target.value)}
            >
              <option value="">Choose your neighbourhood</option>
              {AREAS.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
            <ChevronDown size={16} />
          </div>
        </div>
        <div className="order-total">
          <div>
            <span>
              {quantity} × {selectedOption.unit}
            </span>
            <small>
              {area
                ? `Free delivery to ${area}`
                : "Free delivery in our listed areas"}
            </small>
          </div>
          <strong aria-live="polite">₹{total}</strong>
        </div>
        <p className="order-help" id="order-help">
          Ready to order? Call Mama and share your selection
          {area ? ` and your address in ${area}` : " and delivery address"}.
        </p>
        <a
          className="button button-maroon dialog-call"
          href={`tel:+91${PHONE}`}
        >
          <Phone size={17} /> Call to place order <ArrowRight size={17} />
        </a>
        <a className="dialog-secondary-call" href={`tel:+91${SECOND_PHONE}`}>
          Or call 72488 88388
        </a>
        <div className="dialog-timing">
          <Clock3 size={13} /> Orders: 10:00 AM – 4:00 PM
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [order, setOrder] = useState(null);
  const closeOrderRef = useRef(() => setOrder(null));
  return (
    <>
      <a className="skip-link" href="#menu">
        Skip to menu
      </a>
      <Header />
      <main>
        <Hero />
        <InfoBar />
        <MenuSection onOrder={(dish, serving) => setOrder({ dish, serving })} />
        <PromiseSection />
        <DeliverySection />
      </main>
      <Footer />
      {order && (
        <OrderDialog
          key={order.dish.id}
          order={order}
          onClose={closeOrderRef.current}
        />
      )}
    </>
  );
}
