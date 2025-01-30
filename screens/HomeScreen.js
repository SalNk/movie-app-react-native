import { View, Text, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon } from 'react-native-heroicons/outline'

export default function HomeScreen() {
    const ios = Platform.OS === 'ios'

    return (
        <View className="flex-1 bg-neutral-800">
            {/* Search bar and logo */}
            <SafeAreaView classNam={ios ? "-mb-4" : "mb-3"}>
                <StatusBar style="light" />
                <View classNam="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
                    <Text classNam="text-white text-3xl font-bold">
                        Movies
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    )
}