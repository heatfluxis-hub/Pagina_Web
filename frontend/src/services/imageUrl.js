export const imageUrl = (id) => {
  if (!id) return null
  return `${import.meta.env.VITE_API_URL}/imagenes/${id}`
}