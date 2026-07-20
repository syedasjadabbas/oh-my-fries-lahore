import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  WhatsappLogo, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  List, 
  X, 
  Flame, 
  InstagramLogo, 
  FacebookLogo, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash,
  Check
} from "@phosphor-icons/react";


// --- Types & Data Interfaces ---
interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: "fries" | "burgers" | "wraps" | "mocktails" | "deals";
  image?: string;
  popular?: boolean;
}

interface CartItem {
  item: MenuItem;
  quantity: number;
}

// --- Menu Data ---
const menuItems: MenuItem[] = [
  // Loaded Fries
  {
    id: "fries-sig",
    name: "Signature Fries",
    description: "Thick hand-cut crispy golden fries loaded with signature cheese sauce, garlic mayo, and chopped green onions.",
    price: 790,
    category: "fries",
    image: "/images/signature_fries.png",
    popular: true
  },
  {
    id: "fries-smash",
    name: "Smash Beef Fries",
    description: "Crispy fries topped with chunks of juicy smashed Angus beef patty, melted cheddar, pickles, and house burger sauce.",
    price: 990,
    category: "fries",
    image: "/images/smash_beef_fries.png",
    popular: true
  },
  {
    id: "fries-sweetfire",
    name: "Sweet Fire Fries",
    description: "Crispy fries loaded with popcorn chicken chunks in sweet fire glaze, fresh red chili slices, and sesame seeds.",
    price: 890,
    category: "fries",
    image: "/images/sweet_fire_fries.png",
    popular: true
  },
  {
    id: "fries-classic",
    name: "Classic Fries",
    description: "Perfectly salted, crispy golden hand-cut fries served hot with our house dip.",
    price: 450,
    category: "fries",
    image: "/images/hero_food.png"
  },
  {
    id: "fries-masala",
    name: "Masala Fries",
    description: "Spicy and tangy signature masala dusted crispy fries.",
    price: 490,
    category: "fries"
  },
  {
    id: "fries-coleslaw",
    name: "Coleslaw Fries",
    description: "Loaded fries topped with creamy, sweet home-style coleslaw.",
    price: 590,
    category: "fries"
  },
  {
    id: "fries-jalapeno",
    name: "Jalapeno Kick",
    description: "Spicy fries loaded with fiery sliced jalapenos, cheese sauce, and chipotle drizzle.",
    price: 690,
    category: "fries"
  },
  {
    id: "fries-peri",
    name: "Peri Peri Fries",
    description: "Sizzling peri-peri spice dusted fries for a fiery kick.",
    price: 690,
    category: "fries"
  },
  {
    id: "fries-explosion",
    name: "Explosion Fries",
    description: "Loaded with cheese sauce, diced hot chicken, jalapenos, and spicy dynamite sauce.",
    price: 790,
    category: "fries"
  },

  // Burgers
  {
    id: "burger-chipotle",
    name: "Smoky Chipotle",
    description: "Smashed beef patty, melted cheddar, smoky chipotle sauce, and caramelized onions on a brioche bun.",
    price: 690,
    category: "burgers"
  },
  {
    id: "burger-hotness",
    name: "Hotness Burger",
    description: "Crispy golden fried chicken breast coated in a spicy hot glaze, cool coleslaw, and pickles.",
    price: 750,
    category: "burgers",
    image: "/images/hotness_burger.png",
    popular: true
  },
  {
    id: "burger-bigboy",
    name: "Big Boy Burger",
    description: "Double smashed beef patties, double cheese, lettuce, tomato, and signature house sauce.",
    price: 890,
    category: "burgers"
  },
  {
    id: "burger-messi",
    name: "Messi Fillet",
    description: "Premium crispy chicken breast fillet, melted cheese, lettuce, and homemade mayo.",
    price: 790,
    category: "burgers"
  },
  {
    id: "burger-cheesezilla",
    name: "Cheesezilla",
    description: "Double beef patties, overflowing layers of melted yellow cheddar cheese, and pickles.",
    price: 950,
    category: "burgers",
    image: "/images/cheesezilla_burger.png",
    popular: true
  },
  {
    id: "burger-shroomin",
    name: "Shroomin",
    description: "Smashed beef patty, Swiss cheese, and a rich, creamy wild mushroom sauce.",
    price: 850,
    category: "burgers"
  },

  // Wraps
  {
    id: "wrap-sig",
    name: "Signature Wrap",
    description: "Crispy chicken tenders, fresh lettuce, tomatoes, and melting cheese sauce in a warm toasted tortilla.",
    price: 620,
    category: "wraps",
    image: "/images/signature_wrap.png",
    popular: true
  },
  {
    id: "wrap-dynamite",
    name: "Dynamite Wrap",
    description: "Crispy chicken tenders tossed in fiery dynamite sauce, lettuce, and cheese wrapped in a tortilla.",
    price: 680,
    category: "wraps"
  },

  // Mocktails
  {
    id: "mocktail-blue",
    name: "Blue Electric",
    description: "Vibrant ocean-blue curacao mocktail with lemon slices, fresh mint, and crushed ice.",
    price: 350,
    category: "mocktails",
    image: "/images/blue_electric_mocktail.png"
  },
  {
    id: "mocktail-gold",
    name: "Gold Dust",
    description: "Sparkling passion fruit mocktail with sweet mango pulp and edible golden shimmer.",
    price: 380,
    category: "mocktails"
  },
  {
    id: "mocktail-strawberry",
    name: "Strawberry Blast",
    description: "Sweet strawberry puree blended with fresh lime juice, mint leaves, and club soda.",
    price: 380,
    category: "mocktails"
  },
  {
    id: "mocktail-mary",
    name: "Bloody Mary",
    description: "Classic spicy tomato mocktail served over ice with lime wedges.",
    price: 420,
    category: "mocktails"
  },
  {
    id: "mocktail-mint",
    name: "Mint Margarita",
    description: "Cool refreshing slush of fresh mint leaves, lime juice, white salt, and lemon-lime soda.",
    price: 320,
    category: "mocktails"
  },

  // Deals
  {
    id: "deal-7",
    name: "Deal 7 Combo",
    description: "1 Smash Beef Fries + 1 Smoky Chipotle Burger + 1 Mint Margarita.",
    price: 1850,
    category: "deals"
  },
  {
    id: "deal-10",
    name: "Deal 10 Combo",
    description: "2 Signature Fries + 2 Messi Fillet Burgers + 2 Blue Electric Mocktails.",
    price: 2990,
    category: "deals"
  },
  {
    id: "deal-12",
    name: "Deal 12 Combo",
    description: "1 Cheesezilla Burger + 1 Signature Wrap + 1 Loaded Fries + 1 Mocktail.",
    price: 2190,
    category: "deals"
  }
];

export default function App() {
  // --- States ---
  const [activeCategory, setActiveCategory] = useState<MenuItem["category"]>("fries");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [orderSent, setOrderSent] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // --- Scroll animations logic ---
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;
        // Visible when within viewport
        const isVisible = elemTop < window.innerHeight - 50 && elemBottom >= 0;
        if (isVisible) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call to check visibility
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Testimonials Data ---
  const reviews = [
    {
      name: "Zainab Malik",
      rating: 5,
      comment: "OH MY FRIES has hands down the best loaded fries in Lahore! The smash beef fries are out of this world. Highly recommend!",
      date: "2 days ago"
    },
    {
      name: "Ahmed Raza",
      rating: 5,
      comment: "Absolutely obsessed with the Cheesezilla burger and peri peri fries combo. Quality is consistent, and portions are HUGE.",
      date: "1 week ago"
    },
    {
      name: "Hamza Sheikh",
      rating: 5,
      comment: "The Dynamite Wrap has a serious kick, and the mocktails are super refreshing. Premium taste and packaging.",
      date: "3 days ago"
    }
  ];

  // --- Cart Helpers ---
  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prevCart.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prevCart, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, amount: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + amount;
            return { ...ci, quantity: newQty };
          }
          return ci;
        })
        .filter((ci) => ci.quantity > 0);
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, ci) => total + ci.item.price * ci.quantity, 0);
  const cartItemCount = cart.reduce((count, ci) => count + ci.quantity, 0);

  // --- WhatsApp Order Link Compiler ---
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let orderText = `*OH MY FRIES - WhatsApp Order*\n`;
    orderText += `----------------------------\n`;
    if (customerName) orderText += `*Customer:* ${customerName}\n`;
    if (customerAddress) orderText += `*Delivery Address:* ${customerAddress}\n`;
    if (customerNotes) orderText += `*Special Instructions:* ${customerNotes}\n`;
    orderText += `----------------------------\n`;
    orderText += `*Order Details:*\n`;
    
    cart.forEach((ci) => {
      orderText += `- ${ci.quantity} x ${ci.item.name} (Rs. ${ci.item.price} each)\n`;
    });
    
    orderText += `----------------------------\n`;
    orderText += `*Total Bill: Rs. ${cartTotal}*\n`;
    orderText += `----------------------------\n`;
    orderText += `Please confirm my order and let me know the delivery time. Thank you!`;

    const encodedText = encodeURIComponent(orderText);
    const phoneNumber = "923227892334";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    window.open(whatsappUrl, "_blank");
    setOrderSent(true);
    setTimeout(() => {
      clearCart();
      setOrderSent(false);
      setIsCartOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-white font-sans selection:bg-brand-red selection:text-white relative">
      
      {/* --- FLOATING ACTIONS --- */}
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923227892334?text=Hi%20Oh%20My%20Fries!%20I'd%20like%20to%20place%20an%20order."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] hover:bg-[#20ba56] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center gap-2"
        aria-label="Contact on WhatsApp"
      >
        <WhatsappLogo size={28} weight="fill" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap text-sm font-semibold">
          Order Online
        </span>
        {/* Radar Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 -z-10"></span>
      </a>

      {/* Floating Cart Trigger */}
      {cartItemCount > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-brand-yellow hover:bg-yellow-500 text-brand-black p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          aria-label="Open Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag size={28} weight="bold" />
            <span className="absolute -top-3 -right-3 bg-brand-red text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-brand-yellow">
              {cartItemCount}
            </span>
          </div>
        </motion.button>
      )}

      {/* --- CART DRAWER OVERLAY --- */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-brand-gray border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              {/* Cart Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={24} className="text-brand-yellow" weight="bold" />
                  <h3 className="font-display font-bold text-xl uppercase tracking-wider text-brand-white">Your Order</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                      <ShoppingBag size={32} />
                    </div>
                    <p className="text-gray-400 text-lg font-medium">Your basket is empty</p>
                    <p className="text-gray-500 text-sm max-w-xs">Browse our signature loaded fries and mouthwatering burgers to add items.</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        const menuSec = document.getElementById("menu");
                        menuSec?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-6 py-3 bg-brand-red hover:bg-red-600 text-white font-bold rounded-lg transition-all duration-300 text-sm uppercase tracking-wider"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map(({ item, quantity }) => (
                        <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-black/40 border border-white/5 items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-brand-white truncate">{item.name}</h4>
                            <p className="text-brand-yellow font-semibold text-sm">Rs. {item.price}</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-brand-white transition-all active:scale-95"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-bold text-brand-white w-4 text-center">{quantity}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-brand-white transition-all active:scale-95"
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 rounded-lg bg-brand-red/10 hover:bg-brand-red/20 text-brand-red flex items-center justify-center transition-all active:scale-95 ml-2"
                              aria-label="Remove item"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Customer Details Form */}
                    <div className="border-t border-white/10 pt-6 space-y-4">
                      <h4 className="font-display font-bold text-sm uppercase tracking-wider text-brand-white">Order Details (WhatsApp Delivery)</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Your Name</label>
                          <input
                            type="text"
                            placeholder="Enter your name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Delivery Address (Lahore)</label>
                          <input
                            type="text"
                            placeholder="e.g. House 12, Block B2, Township"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-1">Special Instructions</label>
                          <textarea
                            placeholder="Add spices, sauces, or delivery notes..."
                            value={customerNotes}
                            onChange={(e) => setCustomerNotes(e.target.value)}
                            rows={2}
                            className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-yellow transition-colors resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
                  <div className="flex items-center justify-between text-lg font-bold text-brand-white">
                    <span>Subtotal</span>
                    <span className="text-brand-yellow">Rs. {cartTotal}</span>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={orderSent}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-sm transition-all duration-300 active:scale-98 ${
                      orderSent 
                        ? "bg-[#25D366] text-white" 
                        : "bg-brand-red hover:bg-red-600 text-white shadow-premium"
                    }`}
                  >
                    {orderSent ? (
                      <>
                        <Check size={18} weight="bold" />
                        Redirecting to WhatsApp...
                      </>
                    ) : (
                      <>
                        <WhatsappLogo size={20} weight="fill" />
                        Send Order to WhatsApp
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- STICKY HEADER & NAVBAR --- */}
      <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display font-black text-2xl md:text-3xl tracking-tighter uppercase text-brand-white transition-all duration-300">
              OH MY <span className="text-brand-yellow group-hover:text-brand-red">FRIES</span>
              <span className="text-brand-red font-black">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
            <a href="#" className="hover:text-brand-yellow transition-colors">Home</a>
            <a href="#signature" className="hover:text-brand-yellow transition-colors">Signature</a>
            <a href="#menu" className="hover:text-brand-yellow transition-colors">Menu</a>
            <a href="#best-sellers" className="hover:text-brand-yellow transition-colors">Best Sellers</a>
            <a href="#story" className="hover:text-brand-yellow transition-colors">Our Story</a>
            <a href="#deals" className="hover:text-brand-yellow transition-colors text-brand-red flex items-center gap-1">
              <Flame size={16} weight="fill" /> Deals
            </a>
            <a href="#location" className="hover:text-brand-yellow transition-colors">Location</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => {
                const menuSec = document.getElementById("menu");
                menuSec?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 bg-transparent border border-white/20 hover:border-brand-yellow text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
            >
              View Menu
            </button>
            <a
              href="https://wa.me/923227892334?text=Hi%20Oh%20My%20Fries!%20I%20want%20to%20order%20from%20Township%20Lahore."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-brand-red hover:bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-premium transition-all duration-300 active:scale-95"
            >
              <WhatsappLogo size={16} weight="fill" />
              Order Now
            </a>
          </div>

          {/* Mobile Actions (Cart & Toggle) */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* Small Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-brand-yellow transition-colors"
              aria-label="View basket"
            >
              <ShoppingBag size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-brand-black">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Menu Toggle */}
            <button 
              onClick={() => setIsMenuMobileOpen(!isMenuMobileOpen)}
              className="p-2 text-white hover:text-brand-yellow transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {isMenuMobileOpen ? <X size={26} /> : <List size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuMobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-brand-gray/95 border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-5 text-sm font-bold uppercase tracking-wider">
                <a 
                  href="#" 
                  onClick={() => setIsMenuMobileOpen(false)}
                  className="hover:text-brand-yellow py-2 border-b border-white/5"
                >
                  Home
                </a>
                <a 
                  href="#signature" 
                  onClick={() => setIsMenuMobileOpen(false)}
                  className="hover:text-brand-yellow py-2 border-b border-white/5"
                >
                  Signature
                </a>
                <a 
                  href="#menu" 
                  onClick={() => setIsMenuMobileOpen(false)}
                  className="hover:text-brand-yellow py-2 border-b border-white/5"
                >
                  Menu
                </a>
                <a 
                  href="#best-sellers" 
                  onClick={() => setIsMenuMobileOpen(false)}
                  className="hover:text-brand-yellow py-2 border-b border-white/5"
                >
                  Best Sellers
                </a>
                <a 
                  href="#story" 
                  onClick={() => setIsMenuMobileOpen(false)}
                  className="hover:text-brand-yellow py-2 border-b border-white/5"
                >
                  Our Story
                </a>
                <a 
                  href="#deals" 
                  onClick={() => setIsMenuMobileOpen(false)}
                  className="hover:text-brand-yellow py-2 border-b border-white/5 text-brand-red flex items-center gap-1"
                >
                  <Flame size={16} weight="fill" /> Deals
                </a>
                <a 
                  href="#location" 
                  onClick={() => setIsMenuMobileOpen(false)}
                  className="hover:text-brand-yellow py-2"
                >
                  Location
                </a>
                
                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                  <a
                    href="https://wa.me/923227892334?text=Hi%20Oh%20My%20Fries!%20I%20want%20to%20order%20from%20Township%20Lahore."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25D366] text-center font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2"
                  >
                    <WhatsappLogo size={18} weight="fill" />
                    Order on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setIsMenuMobileOpen(false);
                      const menuSec = document.getElementById("menu");
                      menuSec?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 bg-brand-gray border border-white/20 text-center font-bold text-xs uppercase tracking-widest rounded-lg text-white"
                  >
                    View Restaurant Menu
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlays */}
        <div className="absolute inset-0 bg-black">
          <img
            src="/images/hero_food.png"
            alt="Delicious gourmet loaded fries"
            className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_8s_infinite_alternate]"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-transparent to-brand-black/50" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-8 pt-32 pb-20 text-center z-10 flex flex-col items-center">
          
          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 bg-brand-red/90 border border-brand-red text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
          >
            <Flame size={14} weight="fill" />
            Lahore's First Loaded Fries Brand
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-6xl md:text-8xl tracking-tight leading-none uppercase mb-6"
          >
            OH MY <span className="text-brand-yellow font-black">FRIES</span>
            <span className="text-brand-red font-black">.</span>
          </motion.h1>

          {/* Subheadline / Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl leading-relaxed mb-10"
          >
            The Home of Lahore's Favorite Loaded Fries. Crispy golden fries, juicy smash burgers, signature wraps and unforgettable mocktails served fresh daily.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16"
          >
            <a
              href="https://wa.me/923227892334?text=Hi%20Oh%20My%20Fries!%20I'd%20like%20to%20order%20some%20loaded%20fries."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand-red hover:bg-red-600 text-white font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 shadow-premium transition-all duration-300 active:scale-95 group"
            >
              <WhatsappLogo size={20} weight="fill" className="group-hover:rotate-12 transition-transform" />
              Order on WhatsApp
            </a>
            <button
              onClick={() => {
                const menuSec = document.getElementById("menu");
                menuSec?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-transparent border-2 border-white/20 hover:border-brand-yellow text-white font-black uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95"
            >
              View Menu
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl p-6 rounded-2xl bg-brand-gray/60 border border-white/10 backdrop-blur-md"
          >
            <div className="text-center border-r border-white/10 last:border-0">
              <p className="text-brand-yellow text-2xl font-black md:text-3xl">4.4★</p>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">Google Rating</p>
            </div>
            <div className="text-center border-r border-white/10 md:border-r last:border-0">
              <p className="text-brand-white text-2xl font-black md:text-3xl">60+</p>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">Real Reviews</p>
            </div>
            <div className="text-center border-r border-white/10 last:border-0">
              <p className="text-brand-white text-2xl font-black md:text-3xl">Daily</p>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">4 PM - Late Night</p>
            </div>
            <div className="text-center last:border-0">
              <p className="text-brand-red text-2xl font-black md:text-3xl">Lahore</p>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">Township Sector B</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- SIGNATURE ITEMS --- */}
      <section id="signature" className="py-24 px-4 md:px-8 bg-brand-gray/30 border-t border-b border-white/5 relative overflow-hidden">
        {/* Abstract Red Mesh Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
              Loaded. Crispy. <span className="text-brand-yellow">Irresistible.</span>
            </h2>
            <p className="text-gray-400 font-medium">
              Made with fresh hand-cut Pakistani potatoes, signature imported cheddar cheese sauces, and fire-grilled meats.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuItems.filter((i) => i.popular && i.category === "fries").map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 group"
              >
                {/* Card Image */}
                <div className="h-64 overflow-hidden relative bg-black/40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-brand-yellow text-brand-black font-black text-sm px-3.5 py-1.5 rounded-lg shadow-md">
                    Rs. {item.price}
                  </div>
                  {/* Subtle red bottom shadow inside image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight text-white">{item.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-3.5 bg-white/5 hover:bg-brand-red hover:text-white text-brand-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-white/10"
                  >
                    Add to Order
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-24 px-4 md:px-8 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 scroll-reveal">
            <div>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
                Explore Our <span className="text-brand-red">Full Menu</span>
              </h2>
              <p className="text-gray-400 max-w-md font-medium">
                Sizzling hot fast food crafted with absolute culinary premium ingredients. Add items to checkout directly via WhatsApp.
              </p>
            </div>
            {/* Active Items Counter */}
            {cartItemCount > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="mt-6 md:mt-0 flex items-center gap-2 bg-brand-gray border border-brand-yellow/30 text-brand-yellow font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-lg hover:bg-brand-yellow hover:text-brand-black transition-all active:scale-95"
              >
                <ShoppingBag size={18} weight="bold" />
                View Order ({cartItemCount})
              </button>
            )}
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none border-b border-white/10 mb-10">
            {(["fries", "burgers", "wraps", "mocktails", "deals"] as MenuItem["category"][]).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 relative whitespace-nowrap active:scale-95 ${
                    isActive 
                      ? "text-brand-black bg-brand-yellow" 
                      : "text-gray-400 hover:text-white bg-brand-gray/50 hover:bg-brand-gray border border-white/5"
                  }`}
                >
                  {cat === "fries" && "Loaded Fries"}
                  {cat === "burgers" && "Gourmet Burgers"}
                  {cat === "wraps" && "Signature Wraps"}
                  {cat === "mocktails" && "Chilled Mocktails"}
                  {cat === "deals" && "Special Deals 🎁"}
                </button>
              );
            })}
          </div>

          {/* Menu Items Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {menuItems.filter((i) => i.category === activeCategory).map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-brand-red/30 transition-all group relative overflow-hidden"
                >
                  {/* Subtle red indicator for popular items */}
                  {item.popular && (
                    <div className="absolute top-0 right-0 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl flex items-center gap-1">
                      <Star size={10} weight="fill" /> Best Seller
                    </div>
                  )}

                  <div className="space-y-3">
                    {/* Item Image (if available) */}
                    {item.image && (
                      <div className="h-44 w-full rounded-xl overflow-hidden mb-3 relative bg-black">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display font-extrabold text-lg uppercase tracking-wider text-brand-white leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-bold text-brand-yellow whitespace-nowrap text-sm bg-white/5 px-2.5 py-1 rounded-md">
                        Rs. {item.price}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-gray-400 text-xs leading-relaxed max-w-[45ch]">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-3 bg-white/5 hover:bg-brand-red hover:text-white text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-white/10 active:scale-95"
                  >
                    <Plus size={14} weight="bold" /> Add to Order
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* --- BEST SELLERS --- */}
      <section id="best-sellers" className="py-24 px-4 md:px-8 bg-brand-gray/20 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
              Our <span className="text-brand-yellow">Best Sellers</span>
            </h2>
            <p className="text-gray-400 font-medium">
              These are the legendary items that built our obsession in Lahore. Taste the crowd favorites!
            </p>
          </div>

          {/* Showcase Cards (Asymmetric Visual Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Signature Fries (Colspan 7 - Large Hero Card) */}
            <div className="md:col-span-7 rounded-3xl overflow-hidden glass-card shadow-2xl flex flex-col justify-between group h-[480px] relative scroll-reveal">
              <div className="absolute inset-0 bg-black">
                <img
                  src="/images/signature_fries.png"
                  alt="Signature Loaded Fries"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
              </div>

              <div className="absolute top-6 right-6 bg-brand-red text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg">
                🔥 Hot Seller
              </div>

              <div className="relative p-8 mt-auto space-y-4">
                <div className="flex items-end justify-between">
                  <h3 className="font-display font-black text-3xl uppercase tracking-tighter text-white">Signature Fries</h3>
                  <span className="font-display font-bold text-2xl text-brand-yellow">Rs. 790</span>
                </div>
                <p className="text-gray-300 text-sm max-w-md leading-relaxed">
                  The original dish that started it all. Hand-cut loaded potatoes drizzled in rich hot cheese, topped with garlic-herb dressing and farm fresh onions.
                </p>
                <button
                  onClick={() => {
                    const item = menuItems.find((i) => i.id === "fries-sig");
                    if (item) addToCart(item);
                  }}
                  className="px-6 py-3 bg-brand-yellow hover:bg-brand-red hover:text-white text-brand-black font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95"
                >
                  Order Signature Fries
                </button>
              </div>
            </div>

            {/* Smash Beef Fries (Colspan 5) */}
            <div className="md:col-span-5 rounded-3xl overflow-hidden glass-card shadow-2xl flex flex-col justify-between group h-[480px] relative scroll-reveal">
              <div className="absolute inset-0 bg-black">
                <img
                  src="/images/smash_beef_fries.png"
                  alt="Smash Beef Loaded Fries"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
              </div>

              <div className="relative p-8 mt-auto space-y-4">
                <div className="flex items-end justify-between">
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">Smash Beef Fries</h3>
                  <span className="font-display font-bold text-xl text-brand-yellow">Rs. 990</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ultimate food fusion. Crispy signature fries loaded with smashed angus beef patty bits, melted cheddar cheese, sliced pickles, and secret house sauce.
                </p>
                <button
                  onClick={() => {
                    const item = menuItems.find((i) => i.id === "fries-smash");
                    if (item) addToCart(item);
                  }}
                  className="px-6 py-3 bg-white/10 hover:bg-brand-red text-white hover:text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Cheesezilla Burger (Colspan 4) */}
            <div className="md:col-span-4 rounded-3xl overflow-hidden glass-card shadow-2xl flex flex-col justify-between group h-[400px] relative scroll-reveal">
              <div className="absolute inset-0 bg-black">
                <img
                  src="/images/cheesezilla_burger.png"
                  alt="Cheesezilla Burger"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
              </div>

              <div className="relative p-6 mt-auto space-y-3">
                <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">Cheesezilla Burger</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Double beef patty burger with layers of melting yellow cheddar spilling out of a toasted brioche bun.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-yellow">Rs. 950</span>
                  <button
                    onClick={() => {
                      const item = menuItems.find((i) => i.id === "burger-cheesezilla");
                      if (item) addToCart(item);
                    }}
                    className="p-2.5 bg-brand-red hover:bg-brand-yellow hover:text-brand-black text-white rounded-lg transition-all"
                    aria-label="Add Cheesezilla"
                  >
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hotness Burger (Colspan 4) */}
            <div className="md:col-span-4 rounded-3xl overflow-hidden glass-card shadow-2xl flex flex-col justify-between group h-[400px] relative scroll-reveal">
              <div className="absolute inset-0 bg-black">
                <img
                  src="/images/hotness_burger.png"
                  alt="Hotness Burger"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
              </div>

              <div className="relative p-6 mt-auto space-y-3">
                <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">Hotness Burger</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Crunchy fried chicken breast coated in hot glaze, topped with creamy house-made coleslaw.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-yellow">Rs. 750</span>
                  <button
                    onClick={() => {
                      const item = menuItems.find((i) => i.id === "burger-hotness");
                      if (item) addToCart(item);
                    }}
                    className="p-2.5 bg-brand-red hover:bg-brand-yellow hover:text-brand-black text-white rounded-lg transition-all"
                    aria-label="Add Hotness Burger"
                  >
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </div>

            {/* Signature Wrap (Colspan 4) */}
            <div className="md:col-span-4 rounded-3xl overflow-hidden glass-card shadow-2xl flex flex-col justify-between group h-[400px] relative scroll-reveal">
              <div className="absolute inset-0 bg-black">
                <img
                  src="/images/signature_wrap.png"
                  alt="Signature Wrap"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
              </div>

              <div className="relative p-6 mt-auto space-y-3">
                <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">Signature Wrap</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Crispy chicken tenders, shredded lettuce, tomatoes, and molten cheddar cheese in a toasted tortilla.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-yellow">Rs. 620</span>
                  <button
                    onClick={() => {
                      const item = menuItems.find((i) => i.id === "wrap-sig");
                      if (item) addToCart(item);
                    }}
                    className="p-2.5 bg-brand-red hover:bg-brand-yellow hover:text-brand-black text-white rounded-lg transition-all"
                    aria-label="Add Signature Wrap"
                  >
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- OUR STORY --- */}
      <section id="story" className="py-24 px-4 md:px-8 bg-brand-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text (Colspan 6) */}
            <div className="lg:col-span-6 space-y-6 scroll-reveal">
              <span className="text-xs font-black uppercase tracking-widest text-brand-red">
                Our Heritage
              </span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight text-white">
                From Cravings <br/>
                <span className="text-brand-yellow">To Obsession.</span>
              </h2>
              <div className="h-1.5 w-16 bg-brand-red rounded-full"></div>
              <p className="text-gray-300 leading-relaxed text-lg">
                OH MY FRIES started in Township, Lahore with one single goal: serve loaded fries and fast-food favorites packed with intense flavors, premium quality, and generous portions.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm">
                We believe fast food shouldn't mean cutting corners. That's why we source the best local potatoes, import real cheddar cheeses, make our own unique sauces daily, and hand-prepare every order fresh to order. Today, we continue to cook food that keeps Lahore coming back for more.
              </p>

              {/* Stats Block */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div>
                  <h4 className="font-display font-black text-3xl text-brand-red">100%</h4>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">Fresh Potatoes</p>
                </div>
                <div>
                  <h4 className="font-display font-black text-3xl text-brand-yellow">15+</h4>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">Signature Sauces</p>
                </div>
                <div>
                  <h4 className="font-display font-black text-3xl text-white">10k+</h4>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">Happy Foodies</p>
                </div>
              </div>
            </div>

            {/* Story Image / Neon Storefront (Colspan 6) */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 h-[480px] scroll-reveal">
              <img
                src="/images/storefront_neon.png"
                alt="OH MY FRIES Neon Storefront in Lahore"
                className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 bg-brand-black/80 backdrop-blur-md border border-white/10 px-5 py-4 rounded-xl">
                <p className="font-bold text-brand-white text-sm">Abu Bakar Road, Township</p>
                <p className="text-gray-400 text-xs mt-0.5">Come visit Lahore's favorite spot</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MASONRY GALLERY --- */}
      <section className="py-24 px-4 md:px-8 bg-brand-gray/10 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
              The <span className="text-brand-red">Visuals</span>
            </h2>
            <p className="text-gray-400 font-medium">
              Glance at the daily fresh kitchen preparations, high-end seating, and our iconic neon setup.
            </p>
          </div>

          {/* Masonry-Style Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Block 1: Storefront */}
            <div className="relative rounded-2xl overflow-hidden h-72 border border-white/5 group scroll-reveal md:col-span-2">
              <img
                src="/images/storefront_neon.png"
                alt="Storefront"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/45 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-bold uppercase tracking-wider text-white">Modern Storefront</span>
              </div>
            </div>

            {/* Block 2: Neon Fries Sign */}
            <div className="relative rounded-2xl overflow-hidden h-72 border border-white/5 bg-brand-gray flex flex-col items-center justify-center p-6 text-center group scroll-reveal">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-yellow/10 rounded-full blur-xl pointer-events-none" />
              <Flame size={48} className="text-brand-yellow animate-bounce" weight="fill" />
              <h4 className="font-display font-black text-lg uppercase mt-4 text-white">Neon Fries Sign</h4>
              <p className="text-gray-400 text-xs mt-2">Glowing high-contrast vibes inside the shop.</p>
            </div>

            {/* Block 3: Kitchen preparation */}
            <div className="relative rounded-2xl overflow-hidden h-72 border border-white/5 group scroll-reveal">
              <img
                src="/images/hero_food.png"
                alt="Kitchen preparation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/45 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-bold uppercase tracking-wider text-white">Kitchen Prep</span>
              </div>
            </div>

            {/* Block 4: Loaded Fries */}
            <div className="relative rounded-2xl overflow-hidden h-72 border border-white/5 group scroll-reveal">
              <img
                src="/images/signature_fries.png"
                alt="Loaded Fries"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/45 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-bold uppercase tracking-wider text-white">Loaded Fries</span>
              </div>
            </div>

            {/* Block 5: Burgers */}
            <div className="relative rounded-2xl overflow-hidden h-72 border border-white/5 group scroll-reveal md:col-span-2">
              <img
                src="/images/cheesezilla_burger.png"
                alt="Burgers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/45 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-bold uppercase tracking-wider text-white">Premium Double Smash Burgers</span>
              </div>
            </div>

            {/* Block 6: Wraps */}
            <div className="relative rounded-2xl overflow-hidden h-72 border border-white/5 group scroll-reveal">
              <img
                src="/images/signature_wrap.png"
                alt="Wraps"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/45 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-bold uppercase tracking-wider text-white">Signature Tortilla Wraps</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SPECIAL DEALS --- */}
      <section id="deals" className="py-24 px-4 md:px-8 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
              Unbeatable <span className="text-brand-yellow">Combo Deals</span>
            </h2>
            <p className="text-gray-400 font-medium">
              Save big on our specially curated menus. Fresh flavors combined for a premium feast.
            </p>
          </div>

          {/* Deals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuItems.filter((i) => i.category === "deals").map((deal) => (
              <div 
                key={deal.id}
                className="glass-card rounded-2xl p-8 border border-white/5 hover:border-brand-yellow/30 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden group transition-all duration-300"
              >
                {/* Visual Accent */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-red/10 rounded-full blur-xl group-hover:bg-brand-red/20 transition-all" />

                <div className="space-y-4">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-red bg-brand-red/10 px-3 py-1 rounded-md">
                    Promo Combo
                  </span>
                  
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">{deal.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{deal.description}</p>
                  
                  <div className="pt-4 border-t border-white/5">
                    <span className="text-gray-400 text-xs uppercase tracking-wider">Combo Price</span>
                    <p className="text-brand-yellow font-display font-black text-3xl mt-1">Rs. {deal.price}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={() => addToCart(deal)}
                    className="w-full py-3.5 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-300 active:scale-95"
                  >
                    Add Deal to Order
                  </button>
                  <a
                    href={`https://wa.me/923227892334?text=Hi%20Oh%20My%20Fries!%20I'd%20like%20to%20order%20the%20${encodeURIComponent(deal.name)}%20for%20Rs.%20${deal.price}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Order This Deal Now
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- REVIEWS --- */}
      <section className="py-24 px-4 md:px-8 bg-brand-gray/10 border-t border-b border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative">
          
          {/* Background Red Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none -z-10" />

          {/* Section Header */}
          <div className="mb-12 scroll-reveal">
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
              What They <span className="text-brand-red">Say About Us</span>
            </h2>
            <div className="flex items-center justify-center gap-1 text-brand-yellow">
              <Star size={18} weight="fill" />
              <Star size={18} weight="fill" />
              <Star size={18} weight="fill" />
              <Star size={18} weight="fill" />
              <Star size={18} weight="fill" />
            </div>
          </div>

          {/* Testimonial Cards Layout */}
          <div className="relative min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 space-y-6"
              >
                <p className="text-gray-300 text-lg md:text-xl font-medium italic leading-relaxed">
                  " {reviews[activeReviewIndex].comment} "
                </p>
                <div>
                  <h4 className="font-display font-bold text-white text-base">{reviews[activeReviewIndex].name}</h4>
                  <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mt-1 inline-block">
                    Verified Customer · {reviews[activeReviewIndex].date}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveReviewIndex(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  activeReviewIndex === index ? "bg-brand-red w-8" : "bg-white/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* --- LOCATION SECTION --- */}
      <section id="location" className="py-24 px-4 md:px-8 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Map Frame (Colspan 7) */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 min-h-[350px] md:min-h-[450px] relative shadow-2xl scroll-reveal">
              <iframe
                title="OH MY FRIES Township Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.4975764049877!2d74.30138981145618!3d31.455486774140065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901a1c97a55ad%3A0xe5a36371cb14b0df!2sAbu%20Bakar%20Rd%2C%20Township%20Block%201%20Sector%20B-2%20Township%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Info details (Colspan 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-brand-gray/40 border border-white/10 rounded-3xl p-8 md:p-10 space-y-8 scroll-reveal">
              
              <div className="space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-brand-red">
                  Find Us
                </span>
                <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-white">
                  Visit the home of <br/>
                  <span className="text-brand-yellow">Lahore's Best Fries</span>
                </h2>
                
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-start gap-4">
                    <MapPin size={22} className="text-brand-red mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wider">Address</h4>
                      <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                        OH MY FRIES<br/>
                        256-2-B11 Abu Bakar Road,<br/>
                        Township Block 1 Sector B-2, Lahore
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone size={22} className="text-brand-yellow mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wider">Phone</h4>
                      <p className="text-gray-400 text-sm mt-1">
                        0322 7892334
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock size={22} className="text-brand-white mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wider">Opening Hours</h4>
                      <p className="text-gray-400 text-sm mt-1">
                        Open Daily: 4:00 PM till Late Night
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/5">
                <a
                  href="tel:03227892334"
                  className="py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Phone size={16} />
                  Call Now
                </a>
                <a
                  href="https://maps.google.com/?q=OH+MY+FRIES+Abu+Bakar+Road+Township+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 bg-brand-red hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-premium active:scale-95"
                >
                  <MapPin size={16} />
                  Get Directions
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-brand-gray border-t border-white/10 pt-16 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
            
            {/* Col 1: Brand Info */}
            <div className="md:col-span-5 space-y-4">
              <span className="font-display font-black text-2xl tracking-tighter uppercase text-brand-white">
                OH MY <span className="text-brand-yellow">FRIES</span><span className="text-brand-red">.</span>
              </span>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Serving premium crispy hand-cut loaded fries, smash beef burgers, and fire-grilled chicken wraps across Lahore.
              </p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-red hover:text-white flex items-center justify-center text-gray-400 transition-colors"
                  aria-label="Instagram Page"
                >
                  <InstagramLogo size={20} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-red hover:text-white flex items-center justify-center text-gray-400 transition-colors"
                  aria-label="Facebook Page"
                >
                  <FacebookLogo size={20} />
                </a>
                <a
                  href="https://wa.me/923227892334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white flex items-center justify-center text-gray-400 transition-colors"
                  aria-label="WhatsApp Contact"
                >
                  <WhatsappLogo size={20} />
                </a>
              </div>
            </div>

            {/* Col 2: Menu Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-white">
                Quick Menu
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
                <li><a href="#signature" className="hover:text-brand-yellow transition-colors">Signature Fries</a></li>
                <li><a href="#menu" className="hover:text-brand-yellow transition-colors">Burgers & Wraps</a></li>
                <li><a href="#deals" className="hover:text-brand-yellow transition-colors">Combo Deals</a></li>
                <li><a href="#menu" className="hover:text-brand-yellow transition-colors">Fresh Mocktails</a></li>
              </ul>
            </div>

            {/* Col 3: Contact Info */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-white">
                Contact Us
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-red shrink-0" />
                  <span>Township Abu Bakar Road, Lahore</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-brand-yellow shrink-0" />
                  <span>0322 7892334</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={16} className="text-white shrink-0" />
                  <span>Open Daily: 4:00 PM - Late</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 font-medium">
              &copy; {new Date().getFullYear()} OH MY FRIES Lahore. All Rights Reserved.
            </p>
            {/* Tagline */}
            <span className="font-display font-black text-sm uppercase tracking-widest text-brand-red/90 italic">
              Loaded. Crispy. Irresistible.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
