import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa'
import { MdCarpenter } from 'react-icons/md'

const Footer = () => {
  const numeroTelephone = '0707857252'
  const lienWhatsApp = `https://wa.me/225${numeroTelephone}`

  return (
    <footer className="bg-marron-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <MdCarpenter className="text-3xl text-marron-300" />
              <Link 
                to="/login" 
                className="text-xl font-bold hover:text-marron-300 transition-colors duration-300 cursor-pointer"
              >
                Menuiserie Koffi
              </Link>
            </div>
            <p className="text-marron-200 text-sm leading-relaxed">
              Spécialiste en menuiserie sur mesure, nous transformons vos idées en réalité.
              Qualité, précision et finition impeccable pour tous vos projets.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="animate-fade-in">
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-marron-200 hover:text-white transition-colors duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/creations" className="text-marron-200 hover:text-white transition-colors duration-300">
                  Créations
                </Link>
              </li>
              <li>
                <Link to="/devis" className="text-marron-200 hover:text-white transition-colors duration-300">
                  Devis gratuit
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-marron-200 hover:text-white transition-colors duration-300">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-marron-200 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in">
            <h4 className="text-lg font-semibold mb-4">Contactez-nous</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-marron-300 mt-1" />
                <span className="text-marron-200 text-sm">
                  Koumassi 05, derrière le lycée municipal de Koumassi
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-marron-300" />
                <a href={`tel:${numeroTelephone}`} className="text-marron-200 hover:text-white transition-colors duration-300">
                  {numeroTelephone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaWhatsapp className="text-marron-300 text-xl" />
                <a
                  href={lienWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-marron-200 hover:text-white transition-colors duration-300"
                >
                  Chat WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div className="animate-fade-in">
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="bg-marron-800 hover:bg-marron-700 p-3 rounded-full transition-all duration-300 hover-scale"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-marron-800 hover:bg-marron-700 p-3 rounded-full transition-all duration-300 hover-scale"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
            <div className="bg-marron-800 p-4 rounded-lg">
              <p className="text-sm text-marron-200 mb-2">Horaires d'ouverture</p>
              <p className="text-xs text-marron-300">Lun - Ven: 8h - 18h</p>
              <p className="text-xs text-marron-300">Samedi: 8h - 13h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-marron-800 mt-8 pt-8 text-center">
          <p className="text-marron-300 text-sm">
            © {new Date().getFullYear()} Menuiserie Koffi. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

