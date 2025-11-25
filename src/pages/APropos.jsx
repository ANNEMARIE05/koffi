import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAward, FaUsers, FaHandshake, FaCheckCircle, FaTools, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa'
import { MdCarpenter, MdSpeed, MdLocalShipping } from 'react-icons/md'

const APropos = () => {
  const [visibleElements, setVisibleElements] = useState({})
  const numeroTelephone = '0707857252'
  const lienWhatsApp = `https://wa.me/225${numeroTelephone}`

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-marron text-white py-16 mb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920"
            alt="À propos"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-marron opacity-80"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1
            data-animate
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              visibleElements['hero-title'] ? 'animate-slide-down' : 'opacity-0'
            }`}
            id="hero-title"
          >
            À Propos
          </h1>
          <p
            data-animate
            className={`text-xl text-marron-200 max-w-2xl mx-auto ${
              visibleElements['hero-desc'] ? 'animate-slide-up' : 'opacity-0'
            }`}
            id="hero-desc"
          >
            Découvrez l'histoire d'Agbonou Koffi et son engagement envers l'excellence dans l'artisanat du bois
          </p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate
            className={`text-4xl font-bold text-left text-marron-800 mb-12 ${
              visibleElements['histoire-title'] ? 'animate-slide-down' : 'opacity-0'
            }`}
            id="histoire-title"
          >
            L'Artisan
          </h2>
          <div
            data-animate
            className={`flex flex-col md:flex-row gap-8 ${
              visibleElements['histoire-content'] ? 'animate-fade-in' : 'opacity-0'
            }`}
            id="histoire-content"
          >
            {/* Card Message */}
            <div className="flex-1 bg-white rounded-lg shadow-xl p-10 md:p-16">
              <div className="mb-6">
                <h3 className="text-4xl font-bold text-marron-800 mb-2">Agbonou Koffi</h3>
                <p className="text-2xl text-marron-600 italic">Artisan Menuisier</p>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                <strong>Agbonou Koffi</strong> est né de la passion pour l'artisanat du bois et d'un savoir-faire transmis de génération en génération. 
                Avec plus de 25 ans d'expérience, il a su allier tradition et modernité pour créer des meubles uniques et durables.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Son atelier situé à <strong>Koumassi 05</strong>, juste derrière le lycée municipal de Koumassi, est le cœur de son activité. 
                C'est ici que chaque pièce prend vie, façonnée avec soin et attention par cet artisan expérimenté. 
                Il travaille uniquement avec des essences de bois de qualité, sélectionnées pour leur beauté et leur résistance.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Que ce soit pour un meuble sur mesure, une rénovation ou une création originale, <strong>Agbonou Koffi</strong> met 
                son expertise à votre service pour réaliser vos projets avec passion et professionnalisme.
              </p>
            </div>

            {/* Card Image */}
            <div className="flex-1 bg-white rounded-lg shadow-xl p-6 md:p-10 flex items-center justify-center">
              <img
                src="/images/Koffi Artisan.jpg"
                alt="Agbonou Koffi - Artisan menuisier"
                className="w-full h-full max-h-[600px] rounded-lg shadow-lg object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1544473080-d2a56781dda0?w=800"
                  e.target.alt = "Artisan menuisier"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="bg-marron-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <h2
            data-animate
            className={`text-4xl font-bold text-center text-marron-800 mb-12 ${
              visibleElements['valeurs-title'] ? 'animate-slide-down' : 'opacity-0'
            }`}
            id="valeurs-title"
          >
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FaAward />, titre: 'Qualité Premium', desc: 'Matériaux sélectionnés et finitions impeccables' },
              { icon: <FaUsers />, titre: 'Équipe Expérimentée', desc: 'Artisans qualifiés avec des années d\'expérience' },
              { icon: <FaHandshake />, titre: 'Accompagnement', desc: 'Du projet à la livraison, nous vous accompagnons' },
              { icon: <FaCheckCircle />, titre: 'Garantie', desc: 'Garantie sur tous nos travaux' },
              { icon: <MdSpeed />, titre: 'Réactivité', desc: 'Délais respectés et intervention rapide' },
              { icon: <FaTools />, titre: 'Savoir-faire', desc: 'Techniques traditionnelles et modernes' },
            ].map((valeur, index) => (
              <div
                key={index}
                data-animate
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover-scale ${
                  visibleElements[`valeur-${index}`] ? 'animate-slide-up' : 'opacity-0'
                }`}
                id={`valeur-${index}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl text-marron-600 mb-4">{valeur.icon}</div>
                <h3 className="text-xl font-semibold text-marron-800 mb-2">{valeur.titre}</h3>
                <p className="text-gray-700">{valeur.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Services */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <h2
          data-animate
          className={`text-4xl font-bold text-center text-marron-800 mb-12 ${
            visibleElements['services-title'] ? 'animate-slide-down' : 'opacity-0'
          }`}
          id="services-title"
        >
          Nos Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <MdCarpenter />, titre: 'Mobilier sur mesure', desc: 'Armoires, bibliothèques, tables...' },
            { icon: <FaTools />, titre: 'Portes & Fenêtres', desc: 'Installation et réparation' },
            { icon: <MdSpeed />, titre: 'Escaliers', desc: 'Escaliers en bois massif' },
            { icon: <MdLocalShipping />, titre: 'Cuisines équipées', desc: 'Cuisines modernes sur mesure' },
          ].map((service, index) => (
            <div
              key={index}
              data-animate
              className={`bg-gradient-to-br from-marron-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover-scale text-center ${
                visibleElements[`service-${index}`] ? 'animate-scale-in' : 'opacity-0'
              }`}
              id={`service-${index}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl text-marron-600 mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-marron-800 mb-2">{service.titre}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Localisation */}
      <section className="bg-marron-900 text-white py-16 mb-16">
        <div className="container mx-auto px-4">
          <div
            data-animate
            className={`max-w-4xl mx-auto text-center ${
              visibleElements['localisation'] ? 'animate-fade-in' : 'opacity-0'
            }`}
            id="localisation"
          >
            <FaMapMarkerAlt className="text-5xl text-marron-300 mb-6 mx-auto" />
            <h2 className="text-4xl font-bold mb-6">Où Nous Trouver</h2>
            <p className="text-xl text-marron-200 mb-8">
              Nous sommes situés à <strong>Koumassi 05</strong>, derrière le lycée municipal de Koumassi.
              N'hésitez pas à passer nous voir ou à nous contacter pour toute demande.
            </p>
            <div className="bg-marron-800 p-8 rounded-lg shadow-xl inline-block">
              <h3 className="text-2xl font-semibold mb-6">Contactez-nous</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${numeroTelephone}`}
                  className="flex items-center space-x-2 bg-marron-600 hover:bg-marron-500 text-white px-6 py-3 rounded-lg transition-all duration-300 hover-scale"
                >
                  <FaPhone />
                  <span>{numeroTelephone}</span>
                </a>
                <a
                  href={lienWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover-scale"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mb-16">
        <div className="bg-gradient-marron text-white py-16 rounded-lg text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à Démarrer Votre Projet ?</h2>
          <p className="text-xl text-marron-200 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/devis"
              className="bg-white text-marron-800 hover:bg-marron-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale"
            >
              Demander un devis
            </Link>
            <Link
              to="/contact"
              className="bg-marron-600 hover:bg-marron-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default APropos

