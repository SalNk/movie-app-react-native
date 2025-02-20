import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { fallbackMoviePoster, image342, searchMovies } from '../api/moviedb'
import { debounce } from 'lodash'

var { width, height } = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    let movieName = "Ant-man and the Wasp: Quantumania"


    const handleSearch = value => {
        if (value && value.length > 2) {
            setLoading(true)
            searchMovies({
                query: value,
                include_adult: false,
                language: 'en-US',
                page: 1
            }).then(data => {
                setLoading(false)
                if (data && data.results) setResults(data.results)
                console.log('got search movies : ', data)
            })
        } else {
            setLoading(false)
            setResults([])
        }

        // handleSearch(value)
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mt-2 mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'gray'}
                    className="py-3 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500"
                >
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>

            {
                loading ? <Loading /> :
                    results.length ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className="gap-y-3"
                        >
                            <Text className="text-white font-semibold ml-1 mb-3">Results ({results.length}) </Text>
                            <View className="flex-row justify-between flex-wrap">
                                {
                                    results.map((result, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', result)}
                                            >
                                                <View className="gap-y-2 mb-5">
                                                    <Image
                                                        className="rounded-3xl"
                                                        style={{ width: width * 0.44, height: height * 0.3 }}
                                                        source={{ uri: image342(result.poster_path) || fallbackMoviePoster }}
                                                    />
                                                    <Text className="text-neutral-300 ml-1">
                                                        {result.title.length > 20 ? result.title.slice(0, 20) + '...' : result.title}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className="flex-row justify-center mt-16">
                            <Image source={require('../assets/images/movieTime.png')} className="h-72 w-96" />
                        </View>
                    )
            }
        </SafeAreaView>
    )
}