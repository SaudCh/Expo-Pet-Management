import { Image } from 'react-native'
import React from 'react'

export function AuthLogo() {
    return (
        <Image
            source={require("../Images/pet_hub.png")}
            resizeMode='stretch'
            style={{ marginTop: 60, height: 100, width: 150, alignSelf: 'center' }}
        />
    )
}

export function HeaderLogo() {
    return (
        <Image
            source={require("../Images/pet_hub.png")}
            resizeMode='stretch'
            style={{ height: 50, width: 100, alignSelf: 'center' }}
        />
    )
}
