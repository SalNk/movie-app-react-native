import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme'
import TrendingMovies from '../components/TrendingMovies'
import MovieList from '../components/MovieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { fetchTrendingMoviesEndpoint, fetchTopRatedMoviesEndpoint, fetchUpcomingMoviesEndpoint } from '../api/moviedb'

const ios = Platform.OS === 'ios'

export default function HomeScreen() {
    const [trending, setTrending] = useState([])
    const [upComing, setUpComing] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    useEffect(() => {
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMoviesEndpoint()
        // console.log('Got trending Movies', data)

        if (data && data.results) {
            setTrending(data.results)
            setLoading(false)
        }
    }

    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMoviesEndpoint()
        // console.log('Got Upcoming : ', data)

        if (data && data.results) {
            setUpComing(data.results)
            setLoading(false)
        }
    }

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMoviesEndpoint()
        // console.log('Got trending TopRated : ', data)

        if (data && data.results) {
            setTopRated(data.results)
            setLoading(false)
        }
    }

    return (
        <View className="flex-1 bg-neutral-800">
            {/* Search bar and logo */}
            <SafeAreaView className={ios ? "-mb-4" : "mb-3 mt-4"}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {loading ? <Loading /> :
                (
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    >
                        {trending.length && <TrendingMovies data={trending} />}
                        {upComing.length && <MovieList title="Upcoming" data={upComing} />}
                        {topRated.length && <MovieList title="Top Rated" data={topRated} />}
                    </ScrollView>
                )
            }

        </View>
    )
}