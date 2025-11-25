import React, { useState } from 'react'
import { FaPhone, FaWhatsapp, FaEnvelope, FaUser, FaFileAlt } from 'react-icons/fa'
import { creerMessageDevis, creerMessageDevisAvecDetails, genererLienWhatsApp, NUMERO_TELEPHONE } from '../utils/whatsapp'

const Devis = () => {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    typeProjet: '',
    description: '',
  })

  const numeroTelephone = NUMERO_TELEPHONE
  const lienWhatsApp = genererLienWhatsApp(creerMessageDevis())

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = creerMessageDevisAvecDetails(formData)
    const whatsappLink = genererLienWhatsApp(message)
    window.open(whatsappLink, '_blank')
    alert('Redirection vers WhatsApp pour envoyer votre demande de devis')
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-marron text-white py-16 mb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511904211901-bb5a9c269e10?w=1920"
            alt="Devis"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-marron opacity-80"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Demande de Devis</h1>
          <p className="text-xl text-marron-200 max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous pour obtenir un devis gratuit et personnalisé pour votre projet de menuiserie
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
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
                <label htmlFor="typeProjet" className="block text-gray-700 font-semibold mb-2">
                  <FaFileAlt className="inline mr-2" />
                  Type de projet
                </label>
                <select
                  id="typeProjet"
                  name="typeProjet"
                  value={formData.typeProjet}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-600 focus:border-transparent"
                >
                  <option value="">Sélectionnez un type de projet</option>
                  <option value="Mobilier">Mobilier sur mesure</option>
                  <option value="Portes">Portes</option>
                  <option value="Fenêtres">Fenêtres</option>
                  <option value="Escaliers">Escaliers</option>
                  <option value="Cuisine">Cuisine équipée</option>
                  <option value="Dressing">Dressing</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                  Description du projet
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-600 focus:border-transparent"
                  placeholder="Décrivez votre projet en détail (dimensions, matériaux souhaités, style, etc.)"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-marron-600 hover:bg-marron-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale"
              >
                Envoyer la demande de devis
              </button>
            </form>
          </div>

          {/* Contact direct */}
          <div className="bg-marron-50 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-marron-800 mb-4">
              Préférez-vous nous contacter directement ?
            </h2>
            <p className="text-gray-700 mb-6">
              N'hésitez pas à nous appeler ou à nous envoyer un message sur WhatsApp
            </p>
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
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Devis

