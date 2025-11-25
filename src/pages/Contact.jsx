import React, { useState, useEffect } from 'react'
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaComment } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    message: '',
  })
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
    const message = `Message de contact\n\nNom: ${formData.nom}\nTéléphone: ${formData.telephone}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    const whatsappLink = `https://wa.me/225${numeroTelephone}?text=${encodeURIComponent(message)}`
    window.open(whatsappLink, '_blank')
    alert('Redirection vers WhatsApp pour envoyer votre message')
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-marron text-white py-16 mb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920"
            alt="Contact"
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
            Contactez-nous
          </h1>
          <p
            data-animate
            className={`text-xl text-marron-200 max-w-2xl mx-auto ${
              visibleElements['hero-desc'] ? 'animate-slide-up' : 'opacity-0'
            }`}
            id="hero-desc"
          >
            Nous sommes là pour répondre à toutes vos questions et discuter de votre projet
          </p>
        </div>
      </section>

      {/* Informations de contact */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Adresse */}
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <FaMapMarkerAlt className="text-4xl text-marron-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-marron-800 mb-2">Adresse</h3>
            <p className="text-gray-700">
              Koumassi 05<br />
              Derrière le lycée municipal de Koumassi
            </p>
          </div>

          {/* Téléphone */}
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <FaPhone className="text-4xl text-marron-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-marron-800 mb-2">Téléphone</h3>
            <a
              href={`tel:${numeroTelephone}`}
              className="text-marron-600 hover:text-marron-800 transition-colors duration-300"
            >
              {numeroTelephone}
            </a>
          </div>

          {/* Horaires */}
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <FaClock className="text-4xl text-marron-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-marron-800 mb-2">Horaires</h3>
            <p className="text-gray-700">
              Lundi - Vendredi: 8h - 18h<br />
              Samedi: 8h - 16h
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-marron-800 mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nom" className="block text-gray-700 font-semibold mb-2">
                  <FaUser className="inline mr-2" />
                  Nom complet
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-600 focus:border-transparent"
                  placeholder="Votre nom complet"
                />
              </div>

              <div>
                <label htmlFor="telephone" className="block text-gray-700 font-semibold mb-2">
                  <FaPhone className="inline mr-2" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-600 focus:border-transparent"
                  placeholder="Votre numéro de téléphone"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  <FaEnvelope className="inline mr-2" />
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-600 focus:border-transparent"
                  placeholder="Votre adresse email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  <FaComment className="inline mr-2" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-600 focus:border-transparent"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-marron-600 hover:bg-marron-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Contact direct */}
          <div className="bg-marron-50 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-marron-800 mb-6">Contactez-nous directement</h2>
            <p className="text-gray-700 mb-8">
              Vous préférez nous parler directement ? N'hésitez pas à nous appeler ou à nous envoyer un message sur WhatsApp.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href={`tel:${numeroTelephone}`}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover-scale"
              >
                <div className="bg-marron-600 p-3 rounded-full">
                  <FaPhone className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-marron-800">Téléphone</h3>
                  <p className="text-gray-600">{numeroTelephone}</p>
                </div>
              </a>

              <a
                href={lienWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover-scale"
              >
                <div className="bg-green-600 p-3 rounded-full">
                  <FaWhatsapp className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-marron-800">WhatsApp</h3>
                  <p className="text-gray-600">Chat avec nous</p>
                </div>
              </a>

              <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-marron-600 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-marron-800">Adresse</h3>
                  <p className="text-gray-600">
                    Koumassi 05<br />
                    Derrière le lycée municipal de Koumassi
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-marron-800 mb-4">Horaires d'ouverture</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-semibold">8h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-semibold">8h - 16h</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="font-semibold">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

