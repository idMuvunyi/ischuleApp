import React from 'react'
import { View, Text, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

export default function OnboardingScreen({navigation}) {
    return (
        <Onboarding
        imageContainerStyles={{}}
        bottomBarColor="#6BABE2"
        onSkip={() => navigation.navigate("RoleScreen")}
        onDone={() => navigation.navigate("RoleScreen")}
        pages={[
            {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/imone.png')} style={{ width: 200, height: 200 }} />,
                title: 'iSchule',
                subtitle: 'If you are looking for a tutor in any subject, We help you find on without moving an inch!',
            },
            {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/imtwo.png')} style={{ width: 200, height: 200 }} />,
                title: 'Students sessions',
                subtitle: 'Students are welcomed to seek help to challenging courses with skilled tutors of their choice',
            },
            {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/imone.png')} style={{ width: 200, height: 200 }} />,
                title: 'Tutors Profile',
                subtitle: 'Tutors are well educated personnels in their respective fields of study',
            }
        ]}
    />
    )
}
