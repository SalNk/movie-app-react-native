import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { fallbackPersonImage, image185, image500 } from '../api/moviedb'

export default function Cast({ cast, navigation }) {
    let personName = "Keanu Reeves"
    let characterName = "John Wick"

    return (
        <View className="my-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="mr-4 items-center"
                                onPress={() => navigation.navigate('Person', person)}
                            >
                                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                                    <Image
                                        source={{ uri: image185(person.profile_path) || fallbackPersonImage }}
                                        className="w-20 h-24 rounded-2xl"
                                    />
                                </View>
                                <Text className="text-white text-xs mt-1">
                                    {person.character.length > 10 ? person.character.slice(0, 10) + '...' : person.character}
                                </Text>
                                <Text className="text-neutral-400 text-xs mt-1">
                                    {person.original_name.length > 10 ? person.original_name.slice(0, 11) + '...' : person.original_name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}