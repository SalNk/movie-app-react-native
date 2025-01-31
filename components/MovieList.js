import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185, image500 } from '../api/moviedb'


var { width, height } = Dimensions.get('window');

export default function MovieList({ title, data, hideSeeAll }) {
    const navigation = useNavigation()

    let movieName = "Ant-man and the Wasp: Quantumania"
    return (
        <View className="mb-8 gap-y-4">
            <View className="flex-row justify-between items-center mx-4">
                <Text className="text-white text-xl">{title}</Text>
                {
                    !hideSeeAll && <TouchableOpacity>
                        <Text className="text-lg" style={styles.text}>See All</Text>
                    </TouchableOpacity>
                }
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHoriznotal: 15 }}
                className="mx-2"
            >
                {
                    data.map((movie, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                style={styles.movieCard}
                                onPress={() => navigation.push('Movie', movie)}
                            >
                                <View className="gap-y-1 mr-4 items-center">
                                    <Image
                                        // source={require('../assets/images/moviesPoster2.jpeg')}
                                        source={{ uri: image185(movie.poster_path) || fallbackMoviePoster }}
                                        className="rounded-3xl"
                                        style={{ width: width * 0.3, height: height * 0.22 }}
                                    />
                                    <Text className="text-neutral-300 ml-1">
                                        {/* {movie.title.length > 14 ? movie.title.slice(0, 13) + '...' : movie.title} */}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}