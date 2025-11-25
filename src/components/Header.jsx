import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaPhone, FaWhatsapp } from 'react-icons/fa'
import { MdCarpenter } from 'react-icons/md'

const Header = () => {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const gererScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', gererScroll)
    return () => window.removeEventListener('scroll', gererScroll)
  }, [])

  const numeroTelephone = '0707857252'
  const lienWhatsApp = `https://wa.me/225${numeroTelephone}`

  const liensNavigation = [
    { nom: 'Accueil', chemin: '/' },
    { nom: 'Créations', chemin: '/creations' },
    { nom: 'Devis', chemin: '/devis' },
    { nom: 'À propos', chemin: '/a-propos' },
    { nom: 'Contact', chemin: '/contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50
          ? 'bg-marron-800 shadow-lg py-2'
          : 'bg-marron-900 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <MdCarpenter className="text-4xl text-marron-300 group-hover:text-marron-200 transition-colors duration-300" />
            <div className="text-white">
              <h1 className="text-2xl font-bold">Menuiserie Koffi</h1>
              <p className="text-xs text-marron-300">Koumassi 05</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {liensNavigation.map((lien) => (
              <Link
                key={lien.chemin}
                to={lien.chemin}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === lien.chemin
                    ? 'bg-marron-600 text-white'
                    : 'text-marron-200 hover:bg-marron-700 hover:text-white'
                }`}
              >
                {lien.nom}
              </Link>
            ))}
          </nav>

          {/* Boutons Contact */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={`tel:${numeroTelephone}`}
              className="flex items-center space-x-2 bg-marron-600 hover:bg-marron-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover-scale"
            >
              <FaPhone />
              <span>{numeroTelephone}</span>
            </a>
            <a
              href={lienWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover-scale"
            >
              <FaWhatsapp className="text-xl" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setMenuOuvert(!menuOuvert)}
            className="md:hidden text-white text-2xl"
          >
            {menuOuvert ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu Mobile */}
        {menuOuvert && (
          <nav className="md:hidden mt-4 pb-4 animate-slide-down">
            <div className="flex flex-col space-y-2">
              {liensNavigation.map((lien) => (
                <Link
                  key={lien.chemin}
                  to={lien.chemin}
                  onClick={() => setMenuOuvert(false)}
                  className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === lien.chemin
                      ? 'bg-marron-600 text-white'
                      : 'text-marron-200 hover:bg-marron-700 hover:text-white'
                  }`}
                >
                  {lien.nom}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-marron-700">
                <a
                  href={`tel:${numeroTelephone}`}
                  className="flex items-center justify-center space-x-2 bg-marron-600 hover:bg-marron-500 text-white px-4 py-3 rounded-lg transition-all duration-300"
                >
                  <FaPhone />
                  <span>{numeroTelephone}</span>
                </a>
                <a
                  href={lienWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg transition-all duration-300"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

