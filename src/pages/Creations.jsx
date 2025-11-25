import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { articles } from '../data/articles'
import { creerMessageProduit, genererLienWhatsApp } from '../utils/whatsapp'
import Pagination from '../components/Pagination'

const Creations = () => {
  const [visibleElements, setVisibleElements] = useState({})
  const [categorieFiltre, setCategorieFiltre] = useState('Tous')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9 // 3 colonnes x 3 lignes
  
  // Récupérer toutes les catégories uniques
  const categories = ['Tous', ...new Set(articles.map(article => article.categorie))]
  
  // Filtrer les articles selon la catégorie sélectionnée
  const articlesFiltres = useMemo(() => {
    return categorieFiltre === 'Tous' 
      ? articles 
      : articles.filter(article => article.categorie === categorieFiltre)
  }, [categorieFiltre])
  
  // Réinitialiser à la page 1 quand le filtre change
  useEffect(() => {
    setCurrentPage(1)
  }, [categorieFiltre])
  
  // Calculer les articles paginés
  const totalPages = Math.ceil(articlesFiltres.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedArticles = articlesFiltres.slice(startIndex, endIndex)
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
  }, [categorieFiltre])

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-marron text-white py-16 mb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920"
            alt="Créations"
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
            Nos Créations
          </h1>
          <p
            data-animate
            className={`text-xl text-marron-200 max-w-2xl mx-auto ${
              visibleElements['hero-desc'] ? 'animate-slide-up' : 'opacity-0'
            }`}
            id="hero-desc"
          >
            Découvrez notre portfolio de réalisations sur mesure. Chaque création est unique et adaptée aux besoins de nos clients.
          </p>
        </div>
      </section>

      {/* Filtres par catégorie */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((categorie) => (
            <button
              key={categorie}
              onClick={() => setCategorieFiltre(categorie)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-scale ${
                categorieFiltre === categorie
                  ? 'bg-marron-600 text-white shadow-lg'
                  : 'bg-white text-marron-800 hover:bg-marron-50 shadow-md'
              }`}
            >
              {categorie}
            </button>
          ))}
        </div>
      </section>

      {/* Grille des créations */}
      <section className="container mx-auto px-4 pb-16">
        {articlesFiltres.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">Aucune création trouvée dans cette catégorie.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {paginatedArticles.map((article, index) => (
              <div
                key={article.id}
                data-animate
                className={`bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover-scale ${
                  visibleElements[`article-${article.id}`] ? 'animate-scale-in' : 'opacity-0'
                }`}
                id={`article-${article.id}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.titre}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-marron-600 px-3 py-1 rounded-full text-sm text-white">
                    {article.categorie}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-marron-800 mb-2">{article.titre}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                  <div className="mb-4">
                    <span className="text-marron-600 font-semibold">{article.prix}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/details/${article.id}`}
                      className="flex-1 bg-marron-600 hover:bg-marron-700 text-white px-4 py-2 rounded-lg transition-all duration-300 text-center"
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
            
            {/* Pagination */}
            {articlesFiltres.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={articlesFiltres.length}
              />
            )}
          </>
        )}
      </section>

      {/* Section CTA */}
      <section className="bg-marron-50 py-16 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h2
            data-animate
            className={`text-4xl font-bold text-marron-800 mb-6 ${
              visibleElements['cta-title'] ? 'animate-slide-down' : 'opacity-0'
            }`}
            id="cta-title"
          >
            Vous avez un projet en tête ?
          </h2>
          <p
            data-animate
            className={`text-xl text-gray-700 mb-8 max-w-2xl mx-auto ${
              visibleElements['cta-desc'] ? 'animate-slide-up' : 'opacity-0'
            }`}
            id="cta-desc"
          >
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/devis"
              className="bg-marron-600 hover:bg-marron-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale"
            >
              Demander un devis
            </Link>
            <Link
              to="/contact"
              className="bg-white hover:bg-marron-50 text-marron-800 border-2 border-marron-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-scale"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Creations

