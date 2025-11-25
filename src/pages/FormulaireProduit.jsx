import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaPlus, FaTrash, FaUpload, FaArrowLeft, FaChevronRight, FaHome } from 'react-icons/fa'
import { getProductById, addProduct, updateProduct, getCategories } from '../utils/dataManager'
import DashboardLayout from '../components/DashboardLayout'

const FormulaireProduit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = id && id !== 'nouveau'
  
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    image: '',
    prix: '',
    categorie: '',
    largeur: '',
    longueur: '',
    caracteristiques: [],
    imagesDetail: []
  })
  
  const [categories, setCategories] = useState([])
  const [newCaracteristique, setNewCaracteristique] = useState('')
  const [newImageDetail, setNewImageDetail] = useState('')
  const [imageMode, setImageMode] = useState('url') // 'url' ou 'file'
  const [detailImageMode, setDetailImageMode] = useState('url') // 'url' ou 'file'
  const [loading, setLoading] = useState(false)

  // Fonction pour convertir un fichier en base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  useEffect(() => {
    // Charger les catégories
    const cats = getCategories()
    setCategories(cats)

    // Si édition, charger le produit
    if (isEdit) {
      const product = getProductById(id)
      if (product) {
        setFormData({
          titre: product.titre || '',
          description: product.description || '',
          image: product.image || '',
          prix: product.prix || '',
          categorie: product.categorie || '',
          largeur: product.largeur || '',
          longueur: product.longueur || '',
          caracteristiques: product.caracteristiques || [],
          imagesDetail: product.imagesDetail || []
        })
      } else {
        alert('Produit non trouvé')
        navigate('/dashboard/produits')
      }
    }
  }, [id, isEdit, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddCaracteristique = () => {
    if (newCaracteristique.trim()) {
      setFormData(prev => ({
        ...prev,
        caracteristiques: [...prev.caracteristiques, newCaracteristique.trim()]
      }))
      setNewCaracteristique('')
    }
  }

  const handleRemoveCaracteristique = (index) => {
    setFormData(prev => ({
      ...prev,
      caracteristiques: prev.caracteristiques.filter((_, i) => i !== index)
    }))
  }

  const handleAddImageDetail = () => {
    if (newImageDetail.trim()) {
      setFormData(prev => ({
        ...prev,
        imagesDetail: [...prev.imagesDetail, newImageDetail.trim()]
      }))
      setNewImageDetail('')
    }
  }

  const handleRemoveImageDetail = (index) => {
    setFormData(prev => ({
      ...prev,
      imagesDetail: prev.imagesDetail.filter((_, i) => i !== index)
    }))
  }

  // Gestion du téléversement de l'image principale
  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      try {
        const base64 = await fileToBase64(file)
        setFormData(prev => ({
          ...prev,
          image: base64
        }))
      } catch (error) {
        alert('Erreur lors du chargement de l\'image')
        console.error(error)
      }
    } else {
      alert('Veuillez sélectionner un fichier image valide')
    }
  }

  // Gestion du téléversement des images de détail
  const handleDetailImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (imageFiles.length === 0) {
      alert('Veuillez sélectionner des fichiers image valides')
      return
    }

    try {
      const base64Images = await Promise.all(imageFiles.map(file => fileToBase64(file)))
      setFormData(prev => ({
        ...prev,
        imagesDetail: [...prev.imagesDetail, ...base64Images]
      }))
    } catch (error) {
      alert('Erreur lors du chargement des images')
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation de l'image principale
    if (!formData.image || formData.image.trim() === '') {
      alert('Veuillez ajouter une image principale')
      return
    }

    setLoading(true)

    try {
      if (isEdit) {
        updateProduct(id, formData)
        alert('Produit modifié avec succès!')
      } else {
        addProduct(formData)
        alert('Produit ajouté avec succès!')
      }
      navigate('/dashboard/produits')
    } catch (error) {
      alert('Une erreur est survenue')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb avec bouton retour */}
        <nav className="mb-6 flex items-center justify-between" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center hover:text-marron-600 transition-colors"
              >
                <FaHome className="mr-1" />
                Dashboard
              </button>
            </li>
            <li>
              <FaChevronRight className="text-gray-400" />
            </li>
            <li>
              <button
                onClick={() => navigate('/dashboard/produits')}
                className="hover:text-marron-600 transition-colors"
              >
                Produits
              </button>
            </li>
            <li>
              <FaChevronRight className="text-gray-400" />
            </li>
            <li className="text-marron-800 font-semibold truncate max-w-xs">
              {isEdit ? (formData.titre || 'Modifier le produit') : 'Ajouter un produit'}
            </li>
          </ol>
          <button
            onClick={() => navigate('/dashboard/produits')}
            className="flex items-center space-x-2 text-marron-600 hover:text-marron-700 transition-colors font-medium"
          >
            <FaArrowLeft />
            <span>Retour à la liste</span>
          </button>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-marron-800">
            {isEdit ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
          </h1>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titre *
            </label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
            />
          </div>

          {/* Image principale */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image principale *
            </label>
            <div className="mb-2">
              <div className="flex space-x-2 mb-2">
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    imageMode === 'url'
                      ? 'bg-marron-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('file')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    imageMode === 'file'
                      ? 'bg-marron-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FaUpload className="inline mr-2" />
                  Charger depuis l'appareil
                </button>
              </div>
              {imageMode === 'url' ? (
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formats acceptés: JPG, PNG, GIF, etc.
                  </p>
                </div>
              )}
            </div>
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Aperçu"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
            )}
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Catégorie *
            </label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.nom}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Prix *
            </label>
            <input
              type="text"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              required
              placeholder="À partir de 450 000 FCFA"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
            />
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Largeur (cm)
              </label>
              <input
                type="number"
                name="largeur"
                value={formData.largeur}
                onChange={handleChange}
                placeholder="Ex: 120"
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Longueur (cm)
              </label>
              <input
                type="number"
                name="longueur"
                value={formData.longueur}
                onChange={handleChange}
                placeholder="Ex: 200"
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Caractéristiques */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Caractéristiques
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newCaracteristique}
                onChange={(e) => setNewCaracteristique(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCaracteristique())}
                placeholder="Ajouter une caractéristique"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddCaracteristique}
                className="px-4 py-2 bg-marron-600 text-white rounded-lg hover:bg-marron-700 transition-colors"
              >
                <FaPlus />
              </button>
            </div>
            <div className="space-y-2">
              {formData.caracteristiques.map((carac, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <span>{carac}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCaracteristique(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Images de détail */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Images de détail
            </label>
            <div className="mb-2">
              <div className="flex space-x-2 mb-2">
                <button
                  type="button"
                  onClick={() => setDetailImageMode('url')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    detailImageMode === 'url'
                      ? 'bg-marron-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setDetailImageMode('file')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    detailImageMode === 'file'
                      ? 'bg-marron-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FaUpload className="inline mr-2" />
                  Charger depuis l'appareil
                </button>
              </div>
              {detailImageMode === 'url' ? (
                <div className="flex space-x-2 mb-2">
                  <input
                    type="url"
                    value={newImageDetail}
                    onChange={(e) => setNewImageDetail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImageDetail())}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageDetail}
                    className="px-4 py-2 bg-marron-600 text-white rounded-lg hover:bg-marron-700 transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleDetailImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marron-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Vous pouvez sélectionner plusieurs images à la fois
                  </p>
                </div>
              )}
            </div>
            {formData.imagesDetail.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {formData.imagesDetail.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Détail ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-300"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImageDetail(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Boutons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-marron-600 hover:bg-marron-700 text-white px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              <FaSave />
              <span>{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/produits')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default FormulaireProduit

