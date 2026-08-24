import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Phone,
  Clock,
  Flame,
  Menu,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- TIPOS ---
type Product = {
  id: number;
  name: string;
  description: string;
  price?: number;
  tag?: string;
  category: string;
};

type CartItem = Product & {
  quantity: number;
};

// --- DADOS DO CARDÁPIO ---
const menuCategories: { name: string; products: Product[] }[] = [
  {
    name: "Combo Promocional!!!",
    products: [
      {
        id: 1,
        name: "COMBO BACON CASAL",
        description:
          "2 hambúrgueres bacon, batata cheddar bacon e 2 latas de refrigerante.",
        price: 70,
        category: "Combo Promocional!!!",
        tag: "PROMOÇÃO",
      },
      {
        id: 2,
        name: "COMBO KIDS",
        description:
          "Burguer de carne e queijo, batata, refrigerante 200ml, doce e figurinha.",
        price: 32,
        category: "Combo Promocional!!!",
      },
      {
        id: 3,
        name: "CHOPP DUPLO",
        description: "Chopp em dose dupla.",
        price: 15,
        category: "Combo Promocional!!!",
      },
      {
        id: 4,
        name: "COMBO FAMÍLIA XIS",
        description:
          "4 xis de carne ou frango, batata 390g com bacon e cheddar e Fruki 2L.",
        price: 140,
        category: "Combo Promocional!!!",
      },
      {
        id: 5,
        name: "COMBO FAMÍLIA BURGUER",
        description:
          "4 hambúrgueres clássicos, batata bacon cheddar e 2 refrigerantes 600ml.",
        price: 130,
        category: "Combo Promocional!!!",
      },
      {
        id: 6,
        name: "BURGUER DUPLO BACON",
        description:
          "Duplo bacon com cheddar, geleia de pimenta e fritas 130g.",
        price: 44,
        category: "Combo Promocional!!!",
      },
    ],
  },
  {
    name: "Hambúrgueres Artesanais",
    products: [
      {
        id: 7,
        name: "BURGUER RITOS",
        description:
          "Pão brioche, carne 150g, cheddar, Doritos, maionese verde, molho do chef, tomate e alface. Acompanha fritas 130g.",
        price: 33,
        category: "Hambúrgueres Artesanais",
      },
      {
        id: 8,
        name: "BURGUER CLÁSSICO",
        description:
          "Pão brioche, carne 150g, mussarela, maionese verde, molho do chef, alface e tomate. Acompanha fritas 130g.",
        price: 29,
        category: "Hambúrgueres Artesanais",
      },
      {
        id: 9,
        name: "BURGUER BACON",
        description:
          "Carne 150g, cheddar, bacon, geleia de pimenta, maionese verde e fritas 130g.",
        price: 35,
        category: "Hambúrgueres Artesanais",
      },
      {
        id: 10,
        name: "BURGUER DUPLO",
        description:
          "Pão brioche, 2 carnes 150g, cheddar, maionese verde, molho do chef e fritas 130g.",
        price: 37,
        category: "Hambúrgueres Artesanais",
        tag: "O MAIS PEDIDO",
      },
      {
        id: 11,
        name: "BURGUER CHEDDAR",
        description:
          "Carne 150g, cheddar, maionese verde, molho cheddar, alface e tomate. Acompanha fritas 130g.",
        price: 32,
        category: "Hambúrgueres Artesanais",
      },
      {
        id: 12,
        name: "BURGUER ONION",
        description:
          "Carne 150g, mussarela, anel de cebola, maionese verde, barbecue, tomate e alface.",
        price: 32,
        category: "Hambúrgueres Artesanais",
      },
      {
        id: 13,
        name: "BURGUER CHICKEN",
        description:
          "Pão brioche, frango crocante, mussarela, maionese verde, mostarda e mel, alface e tomate.",
        price: 32,
        category: "Hambúrgueres Artesanais",
      },
      {
        id: 14,
        name: "DUPLO BACON",
        description:
          "2 carnes 150g, bacon, geleia de pimenta, cheddar, maionese verde e fritas 130g.",
        price: 45,
        category: "Hambúrgueres Artesanais",
      },
    ],
  },
  {
    name: "Xis",
    products: [
      {
        id: 15,
        name: "XIS CARNE",
        description:
          "Pão salgado, bife 230g, queijo, ovo, maionese verde, milho, ervilha, alface e tomate.",
        price: 30,
        category: "Xis",
      },
      {
        id: 16,
        name: "XIS FRANGO",
        description:
          "Pão salgado, frango 180g, queijo, ovo, maionese verde, milho, ervilha, alface e tomate.",
        price: 29,
        category: "Xis",
      },
      {
        id: 17,
        name: "XIS CORAÇÃO",
        description:
          "Pão salgado, coração 180g, queijo, ovo, maionese verde, milho, ervilha, alface e tomate.",
        price: 33,
        category: "Xis",
      },
      {
        id: 18,
        name: "XIS BACON",
        description:
          "Pão salgado, bife, bacon, queijo, ovo, maionese verde, milho, ervilha, alface e tomate.",
        price: 37,
        category: "Xis",
      },
      {
        id: 19,
        name: "XIS CALABRESA",
        description:
          "Pão salgado, calabresa, queijo, ovo, maionese verde, milho, ervilha, alface e tomate.",
        price: 28,
        category: "Xis",
      },
      {
        id: 20,
        name: "XIS BAGUNÇA",
        description:
          "Calabresa, bacon, coração, frango, queijo, ovo, maionese verde, milho, ervilha, alface e tomate.",
        price: 37,
        category: "Xis",
      },
    ],
  },
  {
    name: "Kachurrasco",
    products: [
      {
        id: 21,
        name: "KACHURRASCO DE CARNE",
        description:
          "Pão salgado, espetinho, queijo, maionese verde, batata palha, milho, ervilha, alface e tomate.",
        category: "Kachurrasco",
      },
      {
        id: 22,
        name: "KACHURRASCO DE FRANGO",
        description:
          "Pão salgado, espetinho de frango, queijo, maionese verde, batata palha e salada.",
        category: "Kachurrasco",
      },
      {
        id: 23,
        name: "KACHURRASCO MISTO",
        description:
          "Pão salgado, espetinho misto, queijo, maionese verde, batata palha e salada.",
        category: "Kachurrasco",
      },
      {
        id: 24,
        name: "KACHURRASCO DE CORAÇÃO",
        description:
          "Pão salgado, espetinho de coração, queijo, maionese verde, batata palha e salada.",
        category: "Kachurrasco",
      },
    ],
  },
  {
    name: "Barcas e Porções",
    products: [
      {
        id: 25,
        name: "BARCA 1 - SERVE 2 PESSOAS",
        description: "390g de fritas, 4 espetinhos e 2 pães de alho.",
        price: 80,
        category: "Barcas e Porções",
      },
      {
        id: 26,
        name: "BARCA 2 - SERVE 2 PESSOAS",
        description:
          "390g de fritas, 4 espetinhos, 500g de polenta e 10 anéis de cebola.",
        price: 100,
        category: "Barcas e Porções",
      },
      {
        id: 27,
        name: "BARCA 3 - SERVE 4 PESSOAS",
        description:
          "500g de fritas, 5 espetinhos, polenta, anéis de cebola, pepino e ovo de codorna.",
        price: 130,
        category: "Barcas e Porções",
      },
      {
        id: 28,
        name: "PORÇÃO DE FRITAS",
        description: "Porção de batata frita.",
        price: 16,
        category: "Barcas e Porções",
      },
      {
        id: 29,
        name: "PORÇÃO DE POLENTA 500G",
        description: "500g de polenta crocante.",
        price: 16,
        category: "Barcas e Porções",
      },
      {
        id: 30,
        name: "PORÇÃO DE ANÉIS DE CEBOLA",
        description: "10 unidades.",
        price: 16,
        category: "Barcas e Porções",
      },
      {
        id: 31,
        name: "PORÇÃO DE BATATA PEQUENA",
        description: "Porção individual, igual à que acompanha o hambúrguer.",
        price: 5,
        category: "Barcas e Porções",
      },
      {
        id: 32,
        name: "COXINHA FRITA",
        description: "500g de coxinha da asa frita.",
        price: 25,
        category: "Barcas e Porções",
      },
      {
        id: 33,
        name: "TULIPA FRITA",
        description: "500g de tulipinha frita.",
        price: 25,
        category: "Barcas e Porções",
      },
    ],
  },
  {
    name: "Espetinhos",
    products: [
      {
        id: 34,
        name: "ESPETINHO DE CARNE",
        description: "Acompanha maionese verde, farinha, pimenta e alho.",
        price: 14,
        category: "Espetinhos",
      },
      {
        id: 35,
        name: "ESPETINHO DE FRANGO",
        description: "Acompanha maionese verde, farinha, pimenta e alho.",
        price: 14,
        category: "Espetinhos",
      },
      {
        id: 36,
        name: "ESPETINHO DE CORAÇÃO",
        description: "Acompanha maionese verde, farinha, pimenta e alho.",
        price: 14,
        category: "Espetinhos",
      },
      {
        id: 37,
        name: "ESPETINHO MISTO",
        description: "Acompanha maionese verde, farinha, pimenta e alho.",
        price: 14,
        category: "Espetinhos",
      },
      {
        id: 38,
        name: "ESPETINHO DE MEDALHÃO DE CARNE",
        description: "Acompanha maionese verde, farinha, pimenta e alho.",
        price: 15,
        category: "Espetinhos",
      },
      {
        id: 39,
        name: "ESPETINHO DE MEDALHÃO DE FRANGO",
        description: "Acompanha maionese verde, farinha, pimenta e alho.",
        price: 15,
        category: "Espetinhos",
      },
      {
        id: 40,
        name: "ESPETINHO DE QUEIJO COALHO",
        description: "Espetinho de queijo coalho.",
        price: 10,
        category: "Espetinhos",
      },
      {
        id: 41,
        name: "PÃO DE ALHO",
        description: "Pão de alho assado.",
        price: 10,
        category: "Espetinhos",
      },
    ],
  },
  {
    name: "Bebidas",
    products: [
      {
        id: 42,
        name: "ÁGUA COM GÁS",
        description: "Água mineral com gás.",
        price: 5,
        category: "Bebidas",
      },
      {
        id: 43,
        name: "ÁGUA SEM GÁS",
        description: "Água mineral sem gás.",
        price: 5,
        category: "Bebidas",
      },
      {
        id: 44,
        name: "COCA-COLA 200ML",
        description: "Refrigerante gelado.",
        price: 4,
        category: "Bebidas",
      },
      {
        id: 45,
        name: "GUARANÁ FRUKI 200ML",
        description: "Guaraná Fruki gelado.",
        price: 4,
        category: "Bebidas",
      },
      {
        id: 46,
        name: "FRUKITO 200ML",
        description: "Frukito gelado.",
        price: 4,
        category: "Bebidas",
      },
      {
        id: 47,
        name: "GUARANÁ FRUKI LATA",
        description: "Guaraná Fruki lata gelado.",
        price: 7,
        category: "Bebidas",
      },
      {
        id: 48,
        name: "COCA-COLA LATA",
        description: "Coca-Cola tradicional gelada.",
        price: 7,
        category: "Bebidas",
      },
      {
        id: 49,
        name: "COCA-COLA ZERO LATA",
        description: "Coca-Cola Zero gelada.",
        price: 7,
        category: "Bebidas",
      },
      {
        id: 50,
        name: "COCA-COLA 600ML",
        description: "Coca-Cola gelada.",
        price: 10,
        category: "Bebidas",
      },
      {
        id: 51,
        name: "GUARANÁ FRUKI 600ML",
        description: "Guaraná Fruki gelado.",
        price: 10,
        category: "Bebidas",
      },
      {
        id: 52,
        name: "CAIPIRINHA",
        description: "Selecione o sabor.",
        category: "Bebidas",
      },
      {
        id: 53,
        name: "CERVEJAS",
        description: "Consulte as opções disponíveis.",
        category: "Bebidas",
      },
      {
        id: 54,
        name: "DOSE",
        description: "Dose de 50ml de whisky ou Campari.",
        price: 15,
        category: "Bebidas",
      },
      {
        id: 55,
        name: "VINHO",
        description: "Jota Pe.",
        price: 27,
        category: "Bebidas",
      },
      {
        id: 56,
        name: "ENERGÉTICO",
        description: "Energético Baly lata.",
        price: 10,
        category: "Bebidas",
      },
      {
        id: 57,
        name: "COPO DE CHOPP",
        description: "Copo de 500ml.",
        price: 12,
        category: "Bebidas",
      },
      {
        id: 58,
        name: "COPO KIT",
        description: "Whisky, gelo de coco e energético.",
        price: 20,
        category: "Bebidas",
      },
      {
        id: 59,
        name: "FRUKI 2L",
        description: "Guaraná Fruki 2L gelado.",
        price: 14,
        category: "Bebidas",
      },
      {
        id: 60,
        name: "PEPSI 2L",
        description: "Refrigerante Pepsi 2L gelado.",
        price: 15,
        category: "Bebidas",
      },
      {
        id: 61,
        name: "QUENTÃO",
        description: "Quentão de 200ml.",
        price: 5,
        category: "Bebidas",
      },
      {
        id: 62,
        name: "TORRE DE CHOPP 2L",
        description: "Torre de chopp de 2 litros.",
        price: 40,
        category: "Bebidas",
      },
      {
        id: 63,
        name: "TORRE DE CAIPIRA",
        description: "Torre de caipirinha.",
        price: 80,
        category: "Bebidas",
      },
    ],
  },
  {
    name: "Doce",
    products: [
      {
        id: 64,
        name: "GOMA DE MASCAR",
        description: "Mentos Cool White com 5 unidades.",
        price: 3.5,
        category: "Doce",
      },
      {
        id: 65,
        name: "FINI",
        description: "Fini Tubet.",
        price: 2.5,
        category: "Doce",
      },
      {
        id: 66,
        name: "BOMBOM",
        description: "Ouro Branco.",
        price: 2.5,
        category: "Doce",
      },
      {
        id: 67,
        name: "PETIT GATEAU",
        description: "Não entregamos.",
        price: 19,
        category: "Doce",
      },
    ],
  },
  {
    name: "Narguilé",
    products: [
      {
        id: 68,
        name: "SESSÃO NARGUILÉ",
        description: "Sessão completa de narguilé.",
        price: 40,
        category: "Narguilé",
      },
    ],
  },
];

const WHATSAPP_NUMBER = "5551996781887";

const locations = [
  {
    id: "vila-imperial",
    name: "Vila Imperial",
    phone: "5551996781887",
    address: "R. Frederico Ritter, 665",
    map: "https://maps.app.goo.gl/xwFEEJ8JdVukEErb8",
  },
  {
    id: "bom-sucesso",
    name: "Bom Sucesso",
    phone: "5551991066992",
    address: "Av. dos Estados, 1379",
    map: "https://maps.app.goo.gl/HApaaUebXrmJ4cy5A",
  },
];

const MINIMUM_ORDER = 6;
type ProductOption = { name: string; price: number };

const kachurrascoOptions: ProductOption[] = [
  { name: "Simples", price: 33 },
  { name: "Duplo", price: 37 },
];

const caipirinhaOptions: ProductOption[] = [
  { name: "Limão", price: 13 },
  { name: "Morango", price: 13 },
];

const beerOptions: ProductOption[] = [
  { name: "Amstel Litrão", price: 14 },
  { name: "Budweiser Litrão", price: 16 },
  { name: "Corona Long Neck", price: 13 },
  { name: "Heineken 600ml", price: 18 },
  { name: "Heineken Long Neck", price: 12 },
  { name: "Heineken Long Neck sem álcool", price: 13 },
  { name: "Original Litrão", price: 20 },
  { name: "Polar Litrão", price: 14 },
  { name: "Sol Long Neck", price: 12 },
];

export default function LandingPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(locations[0].id);
  const [cartNotice, setCartNotice] = useState("");
  const [pendingSelection, setPendingSelection] = useState<{
    product: Product;
    options: ProductOption[];
  } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const selectedLocation =
    locations.find((location) => location.id === selectedLocationId) ??
    locations[0];
  const categoryButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const previousCategoryIndex = useRef<number | null>(null);

  // Efeito do scroll na Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedCart = window.localStorage.getItem("los-brothers-cart");
    if (!savedCart) return;

    try {
      setCart(JSON.parse(savedCart) as CartItem[]);
    } catch {
      window.localStorage.removeItem("los-brothers-cart");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("los-brothers-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!isCartOpen && !pendingSelection) return;

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (pendingSelection) {
        setPendingSelection(null);
      } else {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("keydown", closeWithEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeWithEscape);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, pendingSelection]);

  // --- LÓGICA DO CARRINHO ---
  const addToCart = (
    product: Product,
    option?: ProductOption,
    optionIndex = 0,
  ) => {
    const cartProduct = option
      ? {
          ...product,
          id: product.id * 100 + optionIndex + 1,
          name: `${product.name} - ${option.name}`,
          price: option.price,
        }
      : product;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartProduct.id);
      if (existing) {
        return prev.map((item) =>
          item.id === cartProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...cartProduct, quantity: 1 }];
    });
    setCartNotice(`${cartProduct.name} adicionado ao pedido.`);
    window.setTimeout(() => setCartNotice(""), 2200);
  };

  const confirmSelection = (option: ProductOption, optionIndex: number) => {
    if (!pendingSelection) return;
    addToCart(pendingSelection.product, option, optionIndex);
    setPendingSelection(null);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (acc, item) =>
      item.price === undefined ? acc : acc + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const hasPriceToConfirm = cart.some((item) => item.price === undefined);
  const selectedCategory = menuCategories[activeCategoryIndex];

  useEffect(() => {
    if (previousCategoryIndex.current === null) {
      previousCategoryIndex.current = activeCategoryIndex;
      return;
    }

    if (previousCategoryIndex.current === activeCategoryIndex) {
      return;
    }

    previousCategoryIndex.current = activeCategoryIndex;
    categoryButtonRefs.current[activeCategoryIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategoryIndex]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) return;

    let text = `Olá! Gostaria de fazer um pedido para a unidade ${selectedLocation.name}:\n\n`;
    cart.forEach((item) => {
      const itemTotal =
        item.price === undefined
          ? "preço a confirmar"
          : formatPrice(item.price * item.quantity);
      text += `• ${item.quantity}x ${item.name} - ${itemTotal}\n`;
    });
    const hasPriceToConfirm = cart.some((item) => item.price === undefined);
    text += `\n*Total do Pedido: ${formatPrice(cartTotal)}${hasPriceToConfirm ? " + itens a confirmar" : ""}*`;

    const selectedUrl = `https://wa.me/${selectedLocation.phone}?text=${encodeURIComponent(text)}`;
    window.open(selectedUrl, "_blank");
  };

  const askAboutProduct = (product: Product) => {
    const text = `Olá! Gostaria de consultar a disponibilidade e o preço de ${product.name} na unidade ${selectedLocation.name}.`;
    window.open(
      `https://wa.me/${selectedLocation.phone}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-[#100805] text-[#f7ead8] font-sans selection:bg-orange-500 selection:text-white pb-20">
      {/* NAVBAR */}
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? "bg-[#100805]/95 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo (Simulado em texto para o exemplo) */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Los Brothers BBQ"
              className="h-10 w-10 rounded-full border border-[#5a2b13] object-cover"
            />
            <span className="text-xl font-black tracking-widest uppercase">
              Los Brothers
            </span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest text-[#d8c5ae] uppercase">
            <a
              href="#cardapio"
              className="hover:text-orange-500 transition-colors"
            >
              Cardápio
            </a>
            <a
              href="#sobre"
              className="hover:text-orange-500 transition-colors"
            >
              Sobre
            </a>
            <a
              href="#visite"
              className="hover:text-orange-500 transition-colors"
            >
              Visite
            </a>
          </div>

          {/* Carrinho e CTA */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="md:hidden text-[#d8c5ae] hover:text-orange-400 transition-colors"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full border border-transparent p-2 text-[#d8c5ae] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400 hover:shadow-[0_0_16px_rgba(249,115,22,0.25)] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100805]"
              aria-label={`Abrir carrinho com ${cartCount} ${cartCount === 1 ? "item" : "itens"}`}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-black text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="#cardapio"
              className="hidden md:block bg-gradient-to-r from-[#ffb347] to-[#f15a24] text-[#1a0b05] px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105"
            >
              Pedir agora
            </a>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden border-t border-[#452315] bg-[#160a06]/98 backdrop-blur-md px-6 py-4"
          >
            <div className="flex flex-col gap-4 font-bold text-sm tracking-widest text-[#d8c5ae] uppercase">
              <a
                href="#cardapio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-orange-400 transition-colors"
              >
                Cardápio
              </a>
              <a
                href="#sobre"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-orange-400 transition-colors"
              >
                Sobre
              </a>
              <a
                href="#visite"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-orange-400 transition-colors"
              >
                Visite
              </a>
            </div>
          </div>
        )}
      </nav>

      <AnimatePresence>
        {cartNotice && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            role="status"
            className="fixed left-1/2 top-24 z-40 -translate-x-1/2 rounded-full border border-orange-500/50 bg-[#211109] px-5 py-3 text-center text-sm font-bold text-orange-300 shadow-xl"
          >
            {cartNotice}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pendingSelection && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPendingSelection(null)}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-options-title"
              className="fixed left-1/2 top-1/2 z-[51] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#633116] bg-[#1a0e09] p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                    Personalize seu pedido
                  </p>
                  <h2
                    id="product-options-title"
                    className="mt-1 text-2xl font-black uppercase text-[#f7ead8]"
                  >
                    {pendingSelection.product.name}
                  </h2>
                  <p className="mt-2 text-sm text-[#bda68f]">
                    Escolha uma opção para continuar.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPendingSelection(null)}
                  aria-label="Fechar opções do produto"
                  className="rounded-full p-2 text-[#bda68f] transition-colors hover:bg-orange-500/10 hover:text-[#f7ead8]"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {pendingSelection.options.map((option, optionIndex) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => confirmSelection(option, optionIndex)}
                    className="rounded-xl border border-[#75401e] bg-[#241309] p-5 text-left transition-all hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-500/10 hover:shadow-[inset_0_0_16px_rgba(249,115,22,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  >
                    <span className="block text-lg font-black uppercase text-[#f7ead8]">
                      {option.name}
                    </span>
                    <span className="mt-2 block text-xl font-black text-orange-400">
                      {formatPrice(option.price)}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL / DRAWER DO CARRINHO */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              tabIndex={-1}
              className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#1a0e09] border-l border-[#452315] z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-[#452315] flex justify-between items-center bg-[#211109]">
                <h2
                  id="cart-title"
                  className="text-xl font-black uppercase text-[#f7ead8] flex items-center gap-2"
                >
                  <ShoppingCart className="text-orange-500" /> Seu Pedido
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[#bda68f] hover:text-[#f7ead8]"
                  aria-label="Fechar carrinho"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center text-[#806c5a] mt-20">
                    <ShoppingCart
                      size={48}
                      className="mx-auto mb-4 opacity-20"
                    />
                    <p>Seu carrinho está vazio.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-orange-500 font-bold mt-4 hover:underline"
                    >
                      Ir para o cardápio
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center gap-4 bg-[#26140c] p-4 rounded-xl border border-[#452315]"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-[#f7ead8] uppercase text-sm">
                          {item.name}
                        </h4>
                        <span className="text-orange-500 font-bold text-sm">
                          {item.price === undefined
                            ? `${item.quantity} x preço a confirmar`
                            : `${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3 bg-[#100805] rounded-full border border-[#633116] px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-[#bda68f] hover:text-[#f7ead8]"
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold text-sm w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-orange-500 hover:text-orange-400"
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/10 transition-colors"
                          aria-label={`Remover ${item.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-[#452315] bg-[#211109]">
                  <label
                    htmlFor="order-location"
                    className="mb-2 block text-xs font-black uppercase tracking-wider text-[#bda68f]"
                  >
                    Unidade do pedido
                  </label>
                  <select
                    id="order-location"
                    value={selectedLocationId}
                    onChange={(event) =>
                      setSelectedLocationId(event.target.value)
                    }
                    className="mb-5 w-full rounded-xl border border-[#633116] bg-[#100805] px-4 py-3 text-sm font-bold text-[#f7ead8] outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
                  >
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="block text-[#bda68f] font-bold uppercase">
                        Total
                      </span>
                      <button
                        type="button"
                        onClick={clearCart}
                        className="mt-2 text-xs font-bold text-[#806c5a] transition-colors hover:text-red-300"
                      >
                        Limpar pedido
                      </button>
                    </div>
                    <span className="text-2xl font-black text-[#f7ead8]">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  {cartTotal < MINIMUM_ORDER && (
                    <p className="mb-4 text-xs text-orange-300">
                      Pedido mínimo de {formatPrice(MINIMUM_ORDER)}.
                    </p>
                  )}
                  <button
                    onClick={sendOrderToWhatsApp}
                    disabled={cartTotal < MINIMUM_ORDER}
                    className="w-full bg-gradient-to-r from-[#ffb347] to-[#f15a24] hover:from-[#ffc15c] hover:to-[#ff7040] text-[#1a0b05] font-black uppercase tracking-wider py-4 rounded-xl flex justify-center items-center gap-2 transition-all hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(241,90,36,0.3)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:hover:shadow-none"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 fill-current"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Enviar para {selectedLocation.name}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-0 flex items-center pb-16 pt-32 md:min-h-[90vh] md:pb-24 md:pt-36 overflow-hidden">
        {/* Fundo simulando a imagem do print (Burger no fundo direito) */}
        <div
          className="absolute right-0 top-0 w-full md:w-[70%] h-full bg-[url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-right opacity-30 md:opacity-40"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 40%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 40%)",
          }}
        ></div>
        <div className="absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-b from-transparent via-[#100805]/80 to-[#100805]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between">
          {/* Texto Esquerda */}
          <div className="md:w-3/5 pt-10 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 border border-orange-500/50 rounded-full px-4 py-1.5 w-fit mb-8 bg-orange-500/10 backdrop-blur-sm"
            >
              <Flame size={16} className="text-orange-500" />
              <span className="text-xs font-bold tracking-widest text-orange-400 uppercase">
                Artesanal · Na Brasa · Gravataí
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[110px] font-black uppercase leading-[0.85] tracking-tighter mb-8"
            >
              Sabor <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                No Fogo
              </span>{" "}
              <br />
              Lento.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#bda68f] max-w-md mb-10 leading-relaxed"
            >
              Hambúrgueres artesanais prensados na chapa. Receitas autorais,
              ingredientes selecionados e o capricho de quem leva a sério cada
              pedido.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#cardapio"
                className="group relative inline-flex items-center justify-center overflow-hidden border border-orange-300/70 bg-gradient-to-r from-orange-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-center transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-orange-200 hover:shadow-[0_0_22px_rgba(249,115,22,0.45)] active:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-200/0 via-orange-200/35 to-orange-200/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">Ver cardápio</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center overflow-hidden border border-[#75401e] bg-[#1a0e09]/80 text-orange-300 px-8 py-4 rounded-full font-bold text-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-orange-400 hover:bg-orange-500/10 hover:shadow-[inset_0_0_16px_rgba(249,115,22,0.2)] active:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/15 to-orange-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">Falar no WhatsApp</span>
              </a>
            </motion.div>
          </div>

          {/* Logo oficial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex w-2/5 justify-end mt-12 md:mt-0"
          >
            <img
              src="/logo.png"
              alt="Los Brothers BBQ e Hamburger"
              className="h-52 w-52 rounded-full border-[6px] border-[#100805] object-cover shadow-2xl lg:h-64 lg:w-64"
            />
          </motion.div>
        </div>
      </section>

      {/* CARDÁPIO (Baseado no Print image_c4708a e image_c470a5) */}
      <section
        id="cardapio"
        className="soft-transition transition-to-about scroll-mt-28 py-24 bg-[#100805]"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-orange-500 font-bold tracking-widest uppercase text-sm">
              Cardápio completo
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#f7ead8] mt-2">
              Escolha seu favorito
            </h2>
          </div>

          <nav
            aria-label="Categorias do cardápio"
            className="mb-12 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() =>
                setActiveCategoryIndex((index) => Math.max(0, index - 1))
              }
              disabled={activeCategoryIndex === 0}
              aria-label="Categoria anterior"
              className="shrink-0 rounded-full border border-[#633116] bg-[#1a0e09] p-2 text-[#bda68f] transition-all hover:border-orange-500/70 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex min-w-0 flex-1 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max gap-3">
                {menuCategories.map((category, index) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => setActiveCategoryIndex(index)}
                    ref={(button) => {
                      categoryButtonRefs.current[index] = button;
                    }}
                    aria-current={
                      activeCategoryIndex === index ? "page" : undefined
                    }
                    className={`rounded-full border px-5 py-3 text-xs font-black uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100805] ${activeCategoryIndex === index ? "border-orange-300 bg-orange-500 text-[#1a0b05] shadow-[inset_0_0_14px_rgba(255,238,190,0.45)]" : "border-[#75401e] bg-[#1a0e09] text-[#bda68f] hover:border-orange-400/80 hover:bg-[#241309] hover:text-orange-300 hover:shadow-[inset_0_0_12px_rgba(249,115,22,0.2)]"}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveCategoryIndex((index) =>
                  Math.min(menuCategories.length - 1, index + 1),
                )
              }
              disabled={activeCategoryIndex === menuCategories.length - 1}
              aria-label="Próxima categoria"
              className="shrink-0 rounded-full border border-[#633116] bg-[#1a0e09] p-2 text-[#bda68f] transition-all hover:border-orange-500/70 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </nav>

          <div
            id={`categoria-${selectedCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="scroll-mt-28"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px flex-1 bg-[#3a1d12]" />
              <h2 className="text-2xl md:text-3xl font-black uppercase text-[#f7ead8] text-center">
                {selectedCategory.name}
              </h2>
              <span className="h-px flex-1 bg-[#3a1d12]" />
            </div>
            <p className="-mt-4 mb-8 text-center text-sm text-[#806c5a]">
              {selectedCategory.products.length} opções nesta categoria
            </p>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
              {selectedCategory.products.map((product) => (
                <div
                  key={product.id}
                  className="group border-b border-[#3a1d12] pb-8 relative min-w-0"
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="min-w-0 pr-2 text-xl font-black uppercase text-[#f7ead8] tracking-wide">
                      {product.name}
                    </h3>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      {product.tag && (
                        <span className="bg-orange-500/20 text-orange-400 border border-orange-500/50 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                          {product.tag}
                        </span>
                      )}
                      {product.category === "Kachurrasco" ? (
                        <span className="text-right text-xs font-bold uppercase leading-tight text-orange-400">
                          A partir de
                          <strong className="block text-base">
                            {formatPrice(kachurrascoOptions[0].price)}
                          </strong>
                        </span>
                      ) : product.price !== undefined ? (
                        <div className="text-orange-500 font-black text-xl flex items-start leading-none">
                          <span className="text-[10px] mt-1 mr-1">R$</span>
                          {Math.floor(product.price)}
                          <span className="text-[12px] mt-1">
                            ,{(product.price % 1).toFixed(2).substring(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#bda68f] text-xs font-bold uppercase whitespace-nowrap">
                          Consultar
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[#bda68f] text-sm mb-6 pr-4 min-h-[40px] leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        if (product.category === "Kachurrasco") {
                          setPendingSelection({
                            product,
                            options: kachurrascoOptions,
                          });
                        } else if (product.name === "CAIPIRINHA") {
                          setPendingSelection({
                            product,
                            options: caipirinhaOptions,
                          });
                        } else if (product.name === "CERVEJAS") {
                          setPendingSelection({
                            product,
                            options: beerOptions,
                          });
                        } else {
                          addToCart(product);
                        }
                      }}
                      className="border-2 border-orange-500/50 hover:border-orange-500 text-orange-500 hover:text-orange-400 px-6 py-2 rounded-full font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-2 group-hover:bg-orange-500/10"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section
        id="sobre"
        className="soft-transition transition-to-visit scroll-mt-28 py-24 bg-[#160a06] border-t border-[#3a1d12]"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">
            Nossa história
          </span>
          <h2 className="text-5xl md:text-6xl font-black uppercase text-[#f7ead8] mt-2 tracking-tighter">
            Feito no fogo
          </h2>
          <p className="text-[#bda68f] max-w-2xl mx-auto mt-6 leading-relaxed">
            A Los Brothers prepara hambúrgueres artesanais na brasa, com pão
            macio, ingredientes selecionados e receitas feitas para
            compartilhar. Cada pedido sai da chapa com sabor, cuidado e
            personalidade.
          </p>
          <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
            <div className="border-l-2 border-orange-500 px-5 py-2">
              <strong className="block text-sm font-black uppercase tracking-wider text-[#f7ead8]">
                Na chapa
              </strong>
              <span className="mt-1 block text-sm text-[#a98f78]">
                Preparo artesanal em cada pedido.
              </span>
            </div>
            <div className="border-l-2 border-orange-500 px-5 py-2">
              <strong className="block text-sm font-black uppercase tracking-wider text-[#f7ead8]">
                Duas unidades
              </strong>
              <span className="mt-1 block text-sm text-[#a98f78]">
                Escolha o endereço mais perto de você.
              </span>
            </div>
            <div className="border-l-2 border-orange-500 px-5 py-2">
              <strong className="block text-sm font-black uppercase tracking-wider text-[#f7ead8]">
                Pedido direto
              </strong>
              <span className="mt-1 block text-sm text-[#a98f78]">
                Envie seu pedido pelo WhatsApp.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO VISITE (Baseado no Print image_c470c3) */}
      <section
        id="visite"
        className="soft-transition transition-to-footer scroll-mt-28 py-24 bg-[#100805] border-t border-[#3a1d12]"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16">
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">
              Visite
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase text-[#f7ead8] mt-2 tracking-tighter">
              Venha Provar
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Card Unidade 1 */}
            <div className="bg-[#1a0e09] border border-[#452315] p-8 rounded-[32px] text-left hover:border-orange-500/50 transition-colors">
              <MapPin
                className="text-orange-500 mb-6"
                size={32}
                strokeWidth={1.5}
              />
              <h3 className="text-2xl font-black text-[#f7ead8] uppercase mb-2">
                Unidade Vila Imperial
              </h3>
              <p className="text-[#bda68f] text-sm leading-relaxed">
                <a
                  href="https://maps.app.goo.gl/xwFEEJ8JdVukEErb8"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  R. Frederico Ritter, 665
                  <br />
                  Vila Imperial, Gravataí - RS
                </a>
              </p>
            </div>

            {/* Card Unidade 2 */}
            <div className="bg-[#1a0e09] border border-[#452315] p-8 rounded-[32px] text-left hover:border-orange-500/50 transition-colors">
              <MapPin
                className="text-orange-500 mb-6"
                size={32}
                strokeWidth={1.5}
              />
              <h3 className="text-2xl font-black text-[#f7ead8] uppercase mb-2">
                Unidade Bom Sucesso
              </h3>
              <p className="text-[#bda68f] text-sm leading-relaxed">
                <a
                  href="https://maps.app.goo.gl/HApaaUebXrmJ4cy5A"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  Av. dos Estados, 1379
                  <br />
                  Bom Sucesso, Gravataí - RS
                </a>
              </p>
            </div>

            {/* Card Reservas */}
            <div className="bg-[#1a0e09] border border-[#452315] p-8 rounded-[32px] text-left hover:border-orange-500/50 transition-colors">
              <Phone
                className="text-orange-500 mb-6"
                size={32}
                strokeWidth={1.5}
              />
              <h3 className="text-2xl font-black text-[#f7ead8] uppercase mb-2">
                Reservas
              </h3>
              <p className="text-[#bda68f] text-sm leading-relaxed">
                <a
                  href="https://wa.me/5551996781887"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  Vila Imperial: +55 51 99678-1887
                </a>
                <br />
                <a
                  href="https://wa.me/5551991066992"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  Bom Sucesso: +55 51 99106-6992
                </a>
              </p>
            </div>

            {/* Card Horário */}
            <div className="bg-[#1a0e09] border border-[#452315] p-8 rounded-[32px] text-left hover:border-orange-500/50 transition-colors">
              <Clock
                className="text-orange-500 mb-6"
                size={32}
                strokeWidth={1.5}
              />
              <h3 className="text-2xl font-black text-[#f7ead8] uppercase mb-2">
                Horário
              </h3>
              <p className="text-[#bda68f] text-sm leading-relaxed">
                Ter – Dom
                <br />
                19h às 23h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPE */}
      <footer className="border-t border-[#452315] bg-[#0c0503]">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_1fr]">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/logo.png"
                  alt="Los Brothers BBQ"
                  className="h-10 w-10 rounded-full border border-[#5a2b13] object-cover"
                />
                <span className="text-lg font-black tracking-widest uppercase text-[#f7ead8]">
                  Los Brothers
                </span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#a98f78]">
                Hambúrguer artesanal, fogo alto e sabor de verdade em Gravataí.
              </p>
              <a
                href="https://www.instagram.com/losbrothers.bbq/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#f7ead8] transition-colors hover:text-orange-400"
              >
                <Camera size={18} />
                @losbrothers.bbq
              </a>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-black uppercase tracking-widest text-orange-500">
                Navegação
              </h3>
              <div className="flex flex-col items-start gap-3 text-sm text-[#bda68f]">
                <a
                  href="#cardapio"
                  className="transition-colors hover:text-[#f7ead8]"
                >
                  Cardápio
                </a>
                <a
                  href="#sobre"
                  className="transition-colors hover:text-[#f7ead8]"
                >
                  Sobre nós
                </a>
                <a
                  href="#visite"
                  className="transition-colors hover:text-[#f7ead8]"
                >
                  Nossas unidades
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-black uppercase tracking-widest text-orange-500">
                Atendimento
              </h3>
              <p className="text-sm leading-relaxed text-[#bda68f]">
                Terça a domingo
                <br />
                19h às 23h
                <br />
                Gravataí - RS
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full border border-[#75401e] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-orange-400 transition-all hover:border-orange-400 hover:bg-orange-500/10"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[#2d160d] pt-6 text-xs text-[#806c5a] sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Los Brothers BBQ. Todos os direitos reservados.</span>
            <span>Feito para quem leva hambúrguer a sério.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
