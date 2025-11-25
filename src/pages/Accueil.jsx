import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaWhatsapp, FaCheckCircle, FaTools, FaAward, FaUsers, FaHandshake, FaComments } from 'react-icons/fa'
import { MdCarpenter, MdSpeed, MdLocalShipping, MdBuild } from 'react-icons/md'
import Slider from '../components/Slider'
import { imagesSlider, articles } from '../data/articles'
import { creerMessageProduit, genererLienWhatsApp } from '../utils/whatsapp'

const Accueil = () => {
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
      {/* Hero Section avec Slider */}
      <section className="container mx-auto px-4 py-12 mb-16">
        <Slider images={imagesSlider} />
      </section>

      {/* Section Introduction */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div
          data-animate
          className={`text-center max-w-4xl mx-auto animate-fade-in ${
            visibleElements['intro'] ? 'animate-slide-up' : 'opacity-0'
          }`}
          id="intro"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-marron-800 mb-6">
            Bienvenue chez Menuiserie Koffi
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Depuis de nombreuses années, nous sommes spécialisés dans la création de menuiserie sur mesure.
            Que ce soit pour vos portes, fenêtres, escaliers, mobilier ou cuisines, nous transformons vos idées
            en réalité avec un savoir-faire artisanal et des matériaux de qualité.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${numeroTelephone}`}
              className="flex items-center space-x-2 bg-marron-600 hover:bg-marron-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover-scale"
            >
              <FaPhone />
              <span>Nous appeler</span>
            </a>
            <a
              href={lienWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover-scale"
            >
              <FaWhatsapp className="text-xl" />
              <span>Chat WhatsApp</span>
            </a>
            <Link
              to="/devis"
              className="flex items-center space-x-2 bg-marron-700 hover:bg-marron-800 text-white px-6 py-3 rounded-lg transition-all duration-300 hover-scale"
            >
              <span>Devis gratuit</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="bg-marron-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <h2
            data-animate
            className={`text-4xl font-bold text-center text-marron-800 mb-4 ${
              visibleElements['services-title'] ? 'animate-slide-down' : 'opacity-0'
            }`}
            id="services-title"
          >
            Nos Services
          </h2>
          <p
            data-animate
            className={`text-xl text-center text-gray-600 mb-12 ${
              visibleElements['services-subtitle'] ? 'animate-slide-down' : 'opacity-0'
            }`}
            id="services-subtitle"
          >
            Tout ce que nous pouvons faire pour vous
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <MdCarpenter />, titre: 'Sur Mesure', desc: 'Création de meubles adaptés à vos dimensions et à vos besoins' },
              { icon: <MdLocalShipping />, titre: 'Livraison', desc: 'Service de livraison disponible pour tous nos produits' },
              { icon: <MdBuild />, titre: 'Rénovation', desc: 'Restauration et rénovation de vos meubles anciens' },
              { icon: <FaComments />, titre: 'Conseil', desc: 'Accompagnement personnalisé dans vos projets' },
            ].map((service, index) => (
              <div
                key={index}
                data-animate
                className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover-scale text-center ${
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
        </div>
      </section>

      {/* Section Pourquoi Nous Choisir */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <h2
          data-animate
          className={`text-4xl font-bold text-center text-marron-800 mb-12 ${
            visibleElements['pourquoi-title'] ? 'animate-slide-down' : 'opacity-0'
          }`}
          id="pourquoi-title"
        >
          Pourquoi Nous Choisir ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <FaAward />, titre: 'Qualité Premium', desc: 'Matériaux sélectionnés et finitions impeccables' },
            { icon: <FaUsers />, titre: 'Équipe Expérimentée', desc: 'Artisans qualifiés avec des années d\'expérience' },
            { icon: <FaHandshake />, titre: 'Accompagnement', desc: 'Du projet à la livraison, nous vous accompagnons' },
            { icon: <FaCheckCircle />, titre: 'Garantie', desc: 'Garantie sur tous nos travaux' },
            { icon: <MdSpeed />, titre: 'Réactivité', desc: 'Délais respectés et intervention rapide' },
            { icon: <FaTools />, titre: 'Savoir-faire', desc: 'Techniques traditionnelles et modernes' },
          ].map((avantage, index) => (
            <div
              key={index}
              data-animate
              className={`bg-gradient-to-br from-marron-50 to-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover-scale ${
                visibleElements[`avantage-${index}`] ? 'animate-slide-up' : 'opacity-0'
              }`}
              id={`avantage-${index}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl text-marron-600 mb-4">{avantage.icon}</div>
              <h3 className="text-xl font-semibold text-marron-800 mb-2">{avantage.titre}</h3>
              <p className="text-gray-700">{avantage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Créations Récentes */}
      <section className="bg-marron-900 text-white py-16 mb-16">
        <div className="container mx-auto px-4">
          <h2
            data-animate
            className={`text-4xl font-bold text-center mb-12 ${
              visibleElements['creations-title'] ? 'animate-slide-down' : 'opacity-0'
            }`}
            id="creations-title"
          >
            Nos Créations Récentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {articles.slice(0, 6).map((article, index) => (
              <div
                key={article.id}
                data-animate
                className={`bg-marron-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover-scale ${
                  visibleElements[`article-${index}`] ? 'animate-scale-in' : 'opacity-0'
                }`}
                id={`article-${index}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.titre}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-marron-600 px-3 py-1 rounded-full text-sm">
                    {article.categorie}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{article.titre}</h3>
                  <p className="text-marron-200 mb-4 text-sm line-clamp-2">{article.description}</p>
                  <div className="mb-4">
                    <span className="text-marron-300 font-semibold">{article.prix}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/details/${article.id}`}
                      className="flex-1 bg-marron-600 hover:bg-marron-500 px-4 py-2 rounded-lg transition-all duration-300 text-center"
                    >
                      Voir plus
                    </Link>
                    <a
                      href={genererLienWhatsApp(creerMessageProduit(article))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center"
                      title="Demander sur WhatsApp"
                    >
                      <FaWhatsapp className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/creations"
              className="inline-block bg-marron-600 hover:bg-marron-500 text-white px-8 py-3 rounded-lg transition-all duration-300 hover-scale"
            >
              Voir toutes nos créations
            </Link>
          </div>
        </div>
      </section>

      {/* Section Processus */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <h2
          data-animate
          className={`text-4xl font-bold text-center text-marron-800 mb-12 ${
            visibleElements['processus-title'] ? 'animate-slide-down' : 'opacity-0'
          }`}
          id="processus-title"
        >
          Notre Processus
        </h2>
        <div className="max-w-4xl mx-auto">
          {[
            { etape: 1, titre: 'Consultation', desc: 'Nous écoutons vos besoins et vos idées lors d\'un premier rendez-vous' },
            { etape: 2, titre: 'Devis détaillé', desc: 'Nous vous proposons un devis gratuit et personnalisé' },
            { etape: 3, titre: 'Fabrication', desc: 'Nos artisans réalisent votre projet avec précision et qualité' },
            { etape: 4, titre: 'Installation', desc: 'Nous installons et finalisons votre projet à votre domicile' },
          ].map((processus, index) => (
            <div
              key={index}
              data-animate
              className={`flex items-start space-x-6 mb-8 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                visibleElements[`processus-${index}`] ? 'animate-slide-up' : 'opacity-0'
              }`}
              id={`processus-${index}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-marron-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {processus.etape}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-marron-800 mb-2">{processus.titre}</h3>
                <p className="text-gray-700">{processus.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Localisation */}
      <section className="bg-marron-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <div
            data-animate
            className={`max-w-4xl mx-auto text-center ${
              visibleElements['localisation'] ? 'animate-fade-in' : 'opacity-0'
            }`}
            id="localisation"
          >
            <h2 className="text-4xl font-bold text-marron-800 mb-6">Où Nous Trouver</h2>
            <p className="text-xl text-gray-700 mb-8">
              Nous sommes situés à <strong>Koumassi 05</strong>, derrière le lycée municipal de Koumassi.
              N'hésitez pas à passer nous voir ou à nous contacter pour toute demande.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg inline-block">
              <p className="text-2xl font-semibold text-marron-800 mb-4">Contactez-nous</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${numeroTelephone}`}
                  className="flex items-center space-x-2 bg-marron-600 hover:bg-marron-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover-scale"
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

      {/* Section CTA */}
      <section className="bg-gradient-marron text-white py-20 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h2
            data-animate
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              visibleElements['cta'] ? 'animate-slide-up' : 'opacity-0'
            }`}
            id="cta"
          >
            Prêt à démarrer votre projet ?
          </h2>
          <p
            data-animate
            className={`text-xl mb-8 text-marron-200 ${
              visibleElements['cta-desc'] ? 'animate-slide-up' : 'opacity-0'
            }`}
            id="cta-desc"
          >
            Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/devis"
              className="bg-white text-marron-800 hover:bg-marron-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale"
            >
              Demander un devis
            </Link>
            <a
              href={lienWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale flex items-center space-x-2"
            >
              <FaWhatsapp className="text-xl" />
              <span>Discuter sur WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Accueil

