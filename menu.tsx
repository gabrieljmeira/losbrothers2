import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ORDER_LINK = "https://pedido.anota.ai/loja/los-brothersbbq";

// Estrutura de dados pronta para ser substituída pelos produtos reais
const menuData = {
  hamburgueres: [
    { id: 1, name: "Burger Placeholder 1", description: "Blend artesanal, queijo derretido, bacon crocante, maionese da casa no pão brioche.", price: "R$ --,--", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Burger Placeholder 2", description: "Duplo blend, duplo queijo, cebola caramelizada e molho especial.", price: "R$ --,--", img: "https://images.unsplash.com/photo-1594212691516-745d7fa451a5?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Burger Placeholder 3", description: "Blend defumado, anéis de cebola, cheddar cremoso e barbecue.", price: "R$ --,--", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "Burger Placeholder 4", description: "Opção focada em simplicidade com ingredientes de altíssima qualidade.", price: "R$ --,--", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800&auto=format&fit=crop" },
  ],
  acompanhamentos: [
    { id: 5, name: "Batata Rústica", description: "Porção de batatas perfeitamente crocantes por fora e macias por dentro.", price: "R$ --,--", img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop" },
  ]
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<'hamburgueres' | 'acompanhamentos'>('hamburgueres');

  return (
    <section id="cardapio" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase text-white">Escolha seu Favorito</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Feitos na chapa com ingredientes frescos e muito sabor.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveCategory('hamburgueres')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeCategory === 'hamburgueres' ? 'bg-orange-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
          >
            Hambúrgueres
          </button>
          <button 
            onClick={() => setActiveCategory('acompanhamentos')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeCategory === 'acompanhamentos' ? 'bg-orange-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
          >
            Acompanhamentos
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {menuData[activeCategory].map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col sm:flex-row group hover:border-orange-500/50 transition-colors"
            >
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white uppercase">{item.name}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                  <span className="text-orange-500 font-bold text-lg">{item.price}</span>
                  <a href={ORDER_LINK} target="_blank" rel="noreferrer" className="text-white hover:text-orange-500 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a href={ORDER_LINK} target="_blank" rel="noreferrer" className="inline-block bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-transform hover:scale-105">
            VER CARDÁPIO COMPLETO NO APP
          </a>
        </div>
      </div>
    </section>
  );
}