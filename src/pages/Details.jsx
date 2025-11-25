import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaPhone, FaWhatsapp, FaCheckCircle } from 'react-icons/fa'
import { articles } from '../data/articles'
import { creerMessageProduit, genererLienWhatsApp, NUMERO_TELEPHONE } from '../utils/whatsapp'

const Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = articles.find((a) => a.id === parseInt(id, 10))
  const [imageSelectionnee, setImageSelectionnee] = useState(0)

  const numeroTelephone = NUMERO_TELEPHONE

  if (!article) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-marron-800 mb-4">Article non trouvé</h2>
          <p className="text-gray-600 mb-8">L'article que vous recherchez n'existe pas.</p>
          <Link
            to="/creations"
            className="bg-marron-600 hover:bg-marron-700 text-white px-6 py-3 rounded-lg transition-all duration-300 inline-block"
          >
            Retour aux créations
          </Link>
        </div>
      </div>
    )
  }

  // Récupérer toutes les images (image principale + images de détails)
  const toutesLesImages = article.imagesDetail 
    ? [article.image, ...article.imagesDetail].filter(Boolean)
    : article.image 
    ? [article.image]
    : []
  
  // Réinitialiser l'index d'image si nécessaire
  useEffect(() => {
    if (imageSelectionnee >= toutesLesImages.length && toutesLesImages.length > 0) {
      setImageSelectionnee(0)
    }
  }, [toutesLesImages.length, imageSelectionnee])
  
  // S'assurer que imageSelectionnee est valide
  const imageActuelle = toutesLesImages[imageSelectionnee] || toutesLesImages[0] || ''
  
  // Créer le message WhatsApp avec le nouveau format
  const messageWhatsApp = creerMessageProduit(article)
  const lienWhatsApp = genererLienWhatsApp(messageWhatsApp)

  return (
    <div className="pt-20">
      {/* Bouton retour */}
      <section className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-marron-800 hover:text-marron-600 transition-colors duration-300"
        >
          <FaArrowLeft />
          <span>Retour</span>
        </button>
      </section>

      {/* Images principales et galerie */}
      <section className="container mx-auto px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          {/* Image principale */}
          {imageActuelle && (
            <div className="rounded-lg overflow-hidden shadow-2xl mb-4">
              <img
                src={imageActuelle}
                alt={`${article.titre} - Image ${imageSelectionnee + 1}`}
                className="w-full h-[500px] object-cover"
              />
            </div>
          )}
          
          {/* Galerie d'images miniatures */}
          {toutesLesImages.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {toutesLesImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setImageSelectionnee(index)}
                  className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl ${
                    imageSelectionnee === index
                      ? 'ring-4 ring-marron-600 scale-105'
                      : 'hover:scale-105 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${article.titre} - Miniature ${index + 1}`}
                    className="w-full h-24 md:h-32 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Détails de l'article */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="bg-marron-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {article.categorie}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-marron-800 mb-6">
            {article.titre}
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            {article.description}
          </p>
          <div className="bg-marron-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-marron-800 mb-4">Prix</h2>
            <p className="text-3xl font-bold text-marron-600">{article.prix}</p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-marron-800 mb-4">Caractéristiques</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {article.caracteristiques.map((caracteristique, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md"
                >
                  <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  <span className="text-gray-700">{caracteristique}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="bg-gradient-marron text-white py-16 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Intéressé par cette création ?
          </h2>
          <p className="text-xl text-marron-200 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${numeroTelephone}`}
              className="flex items-center space-x-2 bg-white text-marron-800 hover:bg-marron-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale"
            >
              <FaPhone />
              <span>Nous appeler</span>
            </a>
            <a
              href={lienWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale"
            >
              <FaWhatsapp className="text-xl" />
              <span>Demander sur WhatsApp</span>
            </a>
            <Link
              to="/devis"
              className="bg-marron-600 hover:bg-marron-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Details

