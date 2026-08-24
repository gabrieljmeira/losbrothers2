import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop", alt: "Hambúrguer Artesanal Destaque", span: "md:col-span-2 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop", alt: "Batatas Fritas Crocantes", span: "md:col-span-1 md:row-span-1" },
  { src: "https://images.unsplash.com/photo-1544983389-985223019159?q=80&w=800&auto=format&fit=crop", alt: "Preparo na Chapa", span: "md:col-span-1 md:row-span-1" },
  { src: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800&auto=format&fit=crop", alt: "Ambiente Los Brothers", span: "md:col-span-2 md:row-span-1" },
];

export default function Gallery() {
  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white">Nossa Essência</h2>
          <p className="text-zinc-400 text-lg mt-2">Um pouco do que espera por você.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl overflow-hidden group ${img.span} h-64 md:h-auto`}
            >
              {/* Overlay discreto */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
              
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}