/**
 * Fonctions utilitaires pour générer des messages WhatsApp
 */

const NUMERO_TELEPHONE = '0707857252'

/**
 * Extrait le prix du format "À partir de 450 000 FCFA" pour obtenir "450 000 FCFA"
 * @param {string} prix - Le prix au format complet
 * @returns {string} - Le prix formaté
 */
export const extrairePrix = (prix) => {
  if (!prix) return ''
  
  // Retire "À partir de" si présent
  let prixFormate = prix.replace(/À partir de\s*/i, '').trim()
  
  // Supprime les espaces multiples
  prixFormate = prixFormate.replace(/\s+/g, ' ')
  
  // Si "FCFA" est déjà présent, on le garde tel quel, sinon on l'ajoute
  if (!prixFormate.toUpperCase().includes('FCFA')) {
    prixFormate += ' FCFA'
  }
  
  // Retire les doublons "FCFA FCFA"
  prixFormate = prixFormate.replace(/\s*FCFA\s*FCFA/gi, ' FCFA')
  
  return prixFormate.trim()
}

/**
 * Crée un message WhatsApp pour un produit spécifique
 * @param {object} produit - L'objet produit contenant titre, prix, image, etc.
 * @returns {string} - Le message formaté
 */
export const creerMessageProduit = (produit) => {
  const prix = extrairePrix(produit.prix)
  const imageUrl = produit.image || ''
  
  let message = `Bonjour, je suis intéressé(e) par le produit "${produit.titre}"`
  
  if (prix) {
    message += ` au prix de ${prix}`
  }
  
  message += `. Pouvez-vous me donner plus d'informations ?`
  
  // Ajouter le lien de l'image dans le message pour que l'utilisateur puisse voir le produit
  // Note: WhatsApp ne permet pas d'envoyer directement des images via URL dans wa.me,
  // mais le lien sera visible dans le message et pourra être ouvert
  if (imageUrl) {
    message += `\n\n🖼️ Image du produit : ${imageUrl}`
  }
  
  return message
}

/**
 * Crée un message WhatsApp pour une demande de devis
 * @returns {string} - Le message formaté
 */
export const creerMessageDevis = () => {
  return `Bonjour, je souhaite demander un devis pour un projet de menuiserie sur mesure.`
}

/**
 * Crée un message WhatsApp pour une demande de devis avec détails du formulaire
 * @param {object} formData - Les données du formulaire (nom, telephone, email, typeProjet, description)
 * @returns {string} - Le message formaté
 */
export const creerMessageDevisAvecDetails = (formData) => {
  let message = `Bonjour, je souhaite demander un devis pour un projet de menuiserie sur mesure.\n\n`
  
  if (formData.nom) {
    message += `Nom : ${formData.nom}\n`
  }
  if (formData.telephone) {
    message += `Téléphone : ${formData.telephone}\n`
  }
  if (formData.email) {
    message += `Email : ${formData.email}\n`
  }
  if (formData.typeProjet) {
    message += `Type de projet : ${formData.typeProjet}\n`
  }
  if (formData.description) {
    message += `\nDescription :\n${formData.description}`
  }
  
  return message
}

/**
 * Génère le lien WhatsApp complet avec le message encodé
 * @param {string} message - Le message à envoyer
 * @param {string} numero - Le numéro de téléphone (optionnel, utilise le numéro par défaut si non fourni)
 * @returns {string} - Le lien WhatsApp complet
 */
export const genererLienWhatsApp = (message, numero = null) => {
  const numeroUtilise = numero || NUMERO_TELEPHONE
  const messageEncode = encodeURIComponent(message)
  return `https://wa.me/225${numeroUtilise}?text=${messageEncode}`
}

/**
 * Export du numéro de téléphone par défaut
 */
export { NUMERO_TELEPHONE }

