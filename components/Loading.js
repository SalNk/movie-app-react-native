import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../theme';

var { width, height } = Dimensions.get('window');

export default function Loading() {
    return (
        <View style={{ width, height }} className="absolute flex-row justify-center items-center">
            <Progress.CircleSnail size={160} thickness={12} color={theme.background} />
        </View>
    )
}