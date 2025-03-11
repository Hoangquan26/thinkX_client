export const ratingString = '☆☆☆☆☆★★★★★'

export const getStarString = (rating: number) => {
    rating = Math.floor(rating)
    
    return ratingString.slice(rating, rating + 5).split('').reverse().join('')
}