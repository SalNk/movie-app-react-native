import axios from "axios";
import { apiKey } from "../constants";


const apiBaseUrl = 'https://api.themoviedb.org'
const trendingMoviesEndpoint = `${apiBaseUrl}/3/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/3/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/3/movie/top_rated?api_key=${apiKey}`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null

export const fallbackMoviePoster = 'https://img.freepik.com/premium-psd/mystery-movie-posters_1117895-396.jpg?uid=R68126319&ga=GA1.1.452966945.1711439910&semt=ais_hybrid_sidr';
export const fallbackPersonImage = 'https://img.freepik.com/premium-psd/event-flyer-design-template_528542-1673.jpg?uid=R68126319&ga=GA1.1.452966945.1711439910&semt=ais_hybrid_sidr';

export const movieDetailsEndPoint = id => `${apiBaseUrl}/3/movie/${id}?api_key=${apiKey}`
export const similarMoviesEndPoint = id => `${apiBaseUrl}/3/movie/${id}/similar?api_key=${apiKey}`
export const movieCreditsEndPoint = credit_id => `${apiBaseUrl}/3/credit/${credit_id}?api_key=${apiKey}`

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
        // headers: {
        //     accept: 'application/json',
        //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDQ3MjI1MzY5ZjQ1MDVmMDZlZDMxZTFkODM5MTU2OCIsIm5iZiI6MTczODMyNzA4Ny44ODcsInN1YiI6IjY3OWNjNDJmMTZmZjgzMmU1N2JkZTg0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LyWVtSt6Ehf34j69Em5kO9wXAx_gZ8cCtCtcLmGDscY'
        // }
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log('error : ', error)
        return {}
    }
}

export const fetchTrendingMoviesEndpoint = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMoviesEndpoint = () => {
    return apiCall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMoviesEndpoint = () => {
    return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetailsEndPoint = (id) => {
    return apiCall(movieDetailsEndPoint(id))
}
export const fetchSimilarMoviesEndPoint = (id) => {
    return apiCall(similarMoviesEndPoint(id))
}
export const fetchMovieCreditsEndPoint = (credit_id) => {
    return apiCall(movieCreditsEndPoint(credit_id))
}