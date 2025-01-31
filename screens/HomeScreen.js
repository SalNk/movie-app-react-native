import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme'
import TrendingMovies from '../components/TrendingMovies'
import MovieList from '../components/MovieList'

export default function HomeScreen() {
    const [trending, setTrending] = useState([1, 2, 3])
    const [upComing, setUpComing] = useState([1, 2, 3, 1, 2, 3])
    const [topRated, setTopRated] = useState([1, 2, 3, 1, 2, 3])

    const ios = Platform.OS === 'ios'

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
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                <TrendingMovies data={trending} />
                <MovieList title="Upcoming" data={upComing} />
                <MovieList title="Tp Rated" data={topRated} />
            </ScrollView>
        </View>
    )
}