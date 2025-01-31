import { View, Text, Platform, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const verticalMargin = ios ? '' : ' my-3'


export default function PersonScreen() {
    const [isFavourite, toggleFavourite] = useState(false)
    const navigation = useNavigation()
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5])
    const [loading, setLoading] = useState(true)

    return (
        <ScrollView className=" flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4" + verticalMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} className="rounded-xl p-1">
                    <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {
                loading ? <Loading /> : (
                    <View>
                        <View className="flex-row justify-center"
                        >
                            <View
                                className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500"
                                style={{
                                    shadowColor: 'gray',
                                    shadowRadius: 40,
                                    shadowOffset: { width: 0, height: 5 },
                                    shadowOpacity: 1,
                                    elevation: 40, // Pour Android
                                }}>
                                <Image
                                    source={require('../assets/images/castImage1.jpg')}
                                    style={{ height: height * 0.43, width: width * 0.72 }}
                                />
                            </View>

                        </View>
                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">Keanu Reeves</Text>
                            <Text className="text-base text-neutral-500 text-center">London United Kingdom</Text>
                        </View>
                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-neutral-400 px-4 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-500 text-sm">Gender</Text>
                            </View>
                            <View className="border-r-2 border-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-500 text-sm">17/05/2002</Text>
                            </View>
                            <View className="border-r-2 border-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Known for</Text>
                                <Text className="text-neutral-500 text-sm">Acting</Text>
                            </View>
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-500 text-sm">64.23</Text>
                            </View>
                        </View>

                        <View className="my-6 mx-4 gap-y-2">
                            <Text className="text-white text-lg">Biographhy</Text>
                            <Text className="text-neutral-400 tracking-wide">Doctor Strange in the Multiverse of Madness is a 2022 American superhero film based on Marvel Comics featuring the character Doctor Strange. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the sequel to Doctor Strange (2016) and the 28th film in the Marvel Cinematic Universe (MCU). The film was directed by Sam Raimi, written by Michael Waldron, and stars Benedict Cumberbatch as Stephen Strange, alongside Elizabeth Olsen, Chiwetel Ejiofor, Benedict Wong, Xochitl Gomez, Michael Stuhl</Text>
                        </View>

                        <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                    </View>
                )
            }
        </ScrollView>
    )
}