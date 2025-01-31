import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbackMoviePoster, fetchMovieCreditsEndPoint, fetchMovieDetailsEndPoint, fetchSimilarMoviesEndPoint, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : ' mt-3 '

export default function MovieScreen() {
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [movieDetails, setMovieDetails] = useState({})
    const [isFavourite, toggleFavourite] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()
    const { params: movie } = useRoute();

    let movieName = "Ant-man and the Wasp: Quantumania"

    useEffect(() => {
        getMovieDetails(movie.id)
        getSimilarMovies(movie.id)
        getMovieCredits(movie.id)
    }, [movie])

    const getMovieDetails = async (id) => {
        const data = await fetchMovieDetailsEndPoint(id)
        if (data) setMovieDetails(data)
        setLoading(false)
    }

    const getSimilarMovies = async (id) => {
        const data = await fetchSimilarMoviesEndPoint(id)
        // console.log('similar movies ', data)
        if (data && data.results) setSimilarMovies(data.results)
        setLoading(false)
    }

    const getMovieCredits = async (id) => {
        const data = await fetchMovieCreditsEndPoint(id)
        // console.log('credits : ', data)
        if (data && data.cast) setCast(data.cast)
        setLoading(false)
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            <View>
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} className="rounded-xl p-1">
                        <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

                {
                    loading ? <Loading /> : (
                        <>
                            <View>
                                <Image
                                    source={{ uri: image500(movieDetails?.poster_path) || fallbackMoviePoster }}
                                    style={{ width, height: height * 0.55 }}
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                    style={{ width, height: height * 0.50 }}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    className="absolute bottom-0"
                                />
                            </View>

                            <View style={{ marginTop: -(height * 0.09) }} className="gap-y-3">
                                <Text className="text-white text-center text-3xl font-bold tracking-wide"> {movieDetails?.title} </Text>
                                <Text className="text-neutral-400 font-semibold text-base text-center">
                                    {movieDetails?.status} -  {movieDetails?.release_date?.split('-')[0]} -  {movieDetails?.runtime} min
                                </Text>

                                <View className="flex-row justify-center mx-8 gap-x-4 flex-wrap">
                                    {
                                        movieDetails?.genres?.map((genre, index) => {
                                            let showDot = index + 1 != movieDetails.genres?.length
                                            return (
                                                <Text key={genre.id} className="text-neutral-400 font-semibold text-base text-center">
                                                    {genre.name}{showDot && "    •"}
                                                </Text>
                                            )
                                        })
                                    }
                                </View>
                                <Text className="text-neutral-400 mx-4 tracking-wide">
                                    {movieDetails?.overview}
                                </Text>
                            </View>

                            {/* Cast */}
                            <Cast cast={cast} navigation={navigation} />

                            {/* Similar Movies */}
                            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
                        </>
                    )
                }
            </View>
        </ScrollView>
    )
}