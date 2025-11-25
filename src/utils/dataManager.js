// Gestion des données produits et catégories avec localStorage

// Initialiser les données depuis articles.js si nécessaire
import { articles } from '../data/articles'

const PRODUCTS_KEY = 'menuiserie_products'
const CATEGORIES_KEY = 'menuiserie_categories'

// Extraire les catégories uniques depuis les articles existants
const getInitialCategories = () => {
  const categoriesSet = new Set()
  articles.forEach(article => {
    if (article.categorie) {
      categoriesSet.add(article.categorie)
    }
  })
  return Array.from(categoriesSet).map((name, index) => ({
    id: index + 1,
    nom: name,
    description: `Catégorie ${name}`
  }))
}

// Initialiser les produits
export const initializeProducts = () => {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(articles))
  }
}

// Initialiser les catégories
export const initializeCategories = () => {
  if (!localStorage.getItem(CATEGORIES_KEY)) {
    const initialCategories = getInitialCategories()
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories))
  }
}

// PRODUITS
export const getProducts = () => {
  initializeProducts()
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]')
}

export const getProductById = (id) => {
  const products = getProducts()
  return products.find(p => p.id === parseInt(id, 10))
}

export const addProduct = (product) => {
  const products = getProducts()
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
  const newProduct = {
    ...product,
    id: newId,
    imagesDetail: product.imagesDetail || []
  }
  products.push(newProduct)
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  return newProduct
}

export const updateProduct = (id, product) => {
  const products = getProducts()
  const index = products.findIndex(p => p.id === parseInt(id, 10))
  if (index !== -1) {
    products[index] = { ...product, id: parseInt(id, 10) }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
    return products[index]
  }
  return null
}

export const deleteProduct = (id) => {
  const products = getProducts()
  const filtered = products.filter(p => p.id !== parseInt(id, 10))
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered))
  return true
}

// CATÉGORIES
export const getCategories = () => {
  initializeCategories()
  return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]')
}

export const getCategoryById = (id) => {
  const categories = getCategories()
  return categories.find(c => c.id === parseInt(id, 10))
}

export const addCategory = (category) => {
  const categories = getCategories()
  const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1
  const newCategory = {
    ...category,
    id: newId
  }
  categories.push(newCategory)
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
  return newCategory
}

export const updateCategory = (id, category) => {
  const categories = getCategories()
  const index = categories.findIndex(c => c.id === parseInt(id, 10))
  if (index !== -1) {
    categories[index] = { ...category, id: parseInt(id, 10) }
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
    return categories[index]
  }
  return null
}

export const deleteCategory = (id) => {
  const categories = getCategories()
  const filtered = categories.filter(c => c.id !== parseInt(id, 10))
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(filtered))
  return true
}

