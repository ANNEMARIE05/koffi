import React, { useState, useEffect } from 'react'
import { FaArrowUp, FaWhatsapp } from 'react-icons/fa'
import { genererLienWhatsApp, NUMERO_TELEPHONE } from '../utils/whatsapp'

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const numeroTelephone = NUMERO_TELEPHONE
  // Message par défaut pour le bouton flottant WhatsApp
  const messageWhatsApp = 'Bonjour, j\'aimerais discuter d\'un projet de menuiserie. Pouvez-vous me renseigner ?'
  const lienWhatsApp = genererLienWhatsApp(messageWhatsApp)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {/* Bouton WhatsApp flottant */}
      <a
        href={lienWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Contacter sur WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat WhatsApp
        </span>
      </a>

      {/* Bouton Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 bg-marron-600 hover:bg-marron-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Remonter en haut"
        >
          <FaArrowUp className="text-xl" />
          <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Remonter
          </span>
        </button>
      )}
    </>
  )
}

export default FloatingButtons

