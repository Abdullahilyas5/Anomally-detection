import React from 'react'
import { motion } from 'framer-motion'

const DashImage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 0.5,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: { 
      y: [-8, 8, -8],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
    }
  }

  return (
    <section className="overflow-hidden">
        <motion.div 
          className="max-w-screen-xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
            {/* Gradient Background with Floating Text */}
            <div className="relative mb-8">
              <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/15 via-accent/10 to-transparent pointer-events-none" />
              
              <motion.div 
                className='relative  text-center py-16 px-4 md:px-8'
                variants={floatingVariants}
                initial="initial"
                animate="animate"
              >
                <motion.h2 
                  className='font-elegant text-5xl md:text-6xl tracking-wide text-primary'
                  variants={textVariants}
                >
                  Uncover Hidden <br /> 
                  <span className='text-primary'>Patterns in</span><br />
                  <span className='font-elegant text-accent text-6xl md:text-7xl'>Realtime Dashboard</span>
                </motion.h2>
              </motion.div>
            </div>

            {/* Image Container */}
            <motion.div 
              className="relative group" 
              style={{ perspective: '1200px' }}
              variants={imageVariants}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent rounded-[28px] pointer-events-none" />
                
                <motion.img
                  src="/Dashboard.png"
                  alt="Realtime procurement dashboard"
                  className="w-full max-w-[1260px] min-h-max mx-auto block rounded-md object-cover shadow-[0_40px_120px_-30px_rgba(15,23,42,0.5)]"
                  style={{ 
                    transform: 'rotateX(15deg)',
                    transformStyle: 'preserve-3d'
                  }}
                  whileHover={{ 
                    filter: 'brightness(1.05)',
                    boxShadow: '0 60px 180px -40px rgba(15,23,42,0.7)',
                    transition: { duration: 0.4 }
                  }}
                />

                {/* Bottom blur overlay */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/40 to-transparent rounded-b-[28px] pointer-events-none blur-xl" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent rounded-b-[28px] pointer-events-none" />
            </motion.div>
        </motion.div>
    </section>
  )
}

export default DashImage