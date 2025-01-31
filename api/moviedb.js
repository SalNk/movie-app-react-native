import axios from "axios";
import { apiKey } from "../constants";


const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`
export const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null

export const fallbackMoviePoster = 'https://img.freepik.com/premium-psd/mystery-movie-posters_1117895-396.jpg?uid=R68126319&ga=GA1.1.452966945.1711439910&semt=ais_hybrid_sidr';
export const fallbackPersonImage = 'https://img.freepik.com/premium-vector/user-profile-people-icon-isolated-white-background_322958-4540.jpg?uid=R68126319&ga=GA1.1.452966945.1711439910&semt=ais_hybrid_sidr';

export const movieDetailsEndPoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
export const similarMoviesEndPoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
export const movieCreditsEndPoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`

export const personActorDetails = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
export const personActorMovies = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`


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
export const fetchMovieCreditsEndPoint = (id) => {
    return apiCall(movieCreditsEndPoint(id))
}

export const fetchPersonActorDetails = (id) => {
    return apiCall(personActorDetails(id))
}
export const fetchPersonActorMovies = (id) => {
    return apiCall(personActorMovies(id))
}

export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params)
}