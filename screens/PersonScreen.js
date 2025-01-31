import { View, Text, Platform, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchActorDetails, fetchPersonActorDetails, fetchPersonActorMovies, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const verticalMargin = ios ? '' : ' my-3'


export default function PersonScreen() {
    const [isFavourite, toggleFavourite] = useState(false)
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5])
    const [loading, setLoading] = useState(false)
    const [actorDetails, setActorDetails] = useState({})

    const navigation = useNavigation()
    const { params: person } = useRoute();
    // console.log(person.id)

    useEffect(() => {
        getActorDetails(person.id)
        getPersonActorMovies(person.id)
    }, [person])

    const getActorDetails = async (id) => {
        const data = await fetchPersonActorDetails(id)
        // console.log('actor detail : ', data.biography)
        if (data) setActorDetails(data)
        setLoading(false)
    }

    const getPersonActorMovies = async (id) => {
        const data = await fetchPersonActorMovies(id)
        // console.log('actor movies details : ', data)
        if (data) setPersonMovies(data.cast)
        // setLoading(false)
    }

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
                                    shadowColor: 'white',
                                    shadowRadius: 40,
                                    shadowOffset: { width: 0, height: 5 },
                                    shadowOpacity: 1,
                                    elevation: 40, // Pour Android
                                }}>
                                <Image
                                    source={{ uri: image500(actorDetails.profile_path) }}
                                    style={{ height: height * 0.43, width: width * 0.72 }}
                                />
                            </View>

                        </View>
                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">{actorDetails?.name}</Text>
                            <Text className="text-base text-neutral-500 text-center">{actorDetails?.place_of_birth} </Text>
                        </View>
                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-neutral-400 px-4 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-500 text-sm">{actorDetails?.gender == 1 ? 'Female' : 'Male'} </Text>
                            </View>
                            <View className="border-r-2 border-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-500 text-sm">{actorDetails?.birthday} </Text>
                            </View>
                            <View className="border-r-2 border-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Known for</Text>
                                <Text className="text-neutral-500 text-sm">{actorDetails?.known_for_department}</Text>
                            </View>
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-500 text-sm">{actorDetails?.popularity}</Text>
                            </View>
                        </View>

                        <View className="my-6 mx-4 gap-y-2">
                            <Text className="text-white text-lg">Biographhy</Text>
                            <Text className="text-neutral-400 tracking-wide">{actorDetails.biography || 'N/A'}</Text>
                        </View>

                        <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
                    </View>
                )
            }
        </ScrollView>
    )
}