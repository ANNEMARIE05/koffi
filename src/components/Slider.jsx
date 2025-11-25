import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Slider = ({ images = [] }) => {
  const [indexActuel, setIndexActuel] = useState(0)

  useEffect(() => {
    if (images.length === 0) return
    const intervalle = setInterval(() => {
      setIndexActuel((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(intervalle)
  }, [images.length])

  const imagePrecedente = () => {
    if (images.length === 0) return
    setIndexActuel((prev) => (prev - 1 + images.length) % images.length)
  }

  const imageSuivante = () => {
    if (images.length === 0) return
    setIndexActuel((prev) => (prev + 1) % images.length)
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === indexActuel
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-110'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-marron-900/80 to-transparent flex items-center">
            <div className="container mx-auto px-4 text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">
                {image.titre}
              </h2>
              <p className="text-xl md:text-2xl text-marron-200 animate-slide-up delay-200">
                {image.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Boutons de navigation */}
      <button
        onClick={imagePrecedente}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Image précédente"
      >
        <FaChevronLeft className="text-2xl" />
      </button>
      <button
        onClick={imageSuivante}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Image suivante"
      >
        <FaChevronRight className="text-2xl" />
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setIndexActuel(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === indexActuel
                ? 'w-8 bg-white'
                : 'w-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider

