'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function Story() {
  const containerRef = useRef<HTMLElement>(null)
  
  return (
    <section ref={containerRef} className="py-16 relative overflow-hidden" aria-label="Our Scrapbook" style={{ background: 'linear-gradient(180deg, #FAF3EE 0%, #F5E8E2 60%, #EDD8D3 100%)' }}>
      
      <div className="relative max-w-[500px] mx-auto z-10 px-4 flex flex-col items-center">
        
        {/* Title Section */}
        <div className="text-center mb-8">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-script text-[#7A2F4E] text-[64px] leading-[0.8] mb-4">Our <br/><span className="text-[52px] ml-16">Scrapbook</span></h2>
            <p className="font-serif italic gold-text-shimmer text-base tracking-wider font-semibold">Every picture tells our story...</p>
          </motion.div>
        </div>

        {/* Video Player Container */}
        <motion.div 
          className="relative mx-auto overflow-hidden bg-[#FAF3EE] flex justify-center items-center w-[90%] sm:w-auto h-auto sm:h-[75vh] lg:h-[85vh] sm:max-h-[800px]"
          style={{
            borderRadius: '1.5rem',
            border: '5px solid white',
            boxShadow: '0 20px 40px rgba(122,47,78,0.25), 0 0 0 1px rgba(201,164,106,0.3)',
            animation: 'videoGlow 3s ease-in-out infinite',
          }}
          initial={{ opacity: 0, scale: 0.93, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <video 
            src="/photos/shreya wedding/scrapbookVideo.mp4"
            className="block w-full h-auto sm:w-auto sm:h-full object-contain"
            autoPlay 
            loop 
            muted 
            playsInline
            controls={false}
          />
        </motion.div>

      </div>
    </section>
  )
}
