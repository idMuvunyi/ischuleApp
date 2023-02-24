import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import auth, {firebase} from '@react-native-firebase/auth';
import COLORS from '../assets/colors';

export default function OnboardingScreen({navigation}) {
  useEffect(() => {
    isTheUserAuthenticated();
  }, [navigation]);

  const isTheUserAuthenticated = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null && user.emailVerified) {
        navigation.navigate('BottomNavigator');
      }
    });
  };

  return (
    <Onboarding
      imageContainerStyles={{}}
      bottomBarColor={COLORS.secondary}
      onSkip={() => navigation.navigate('LoginScreen')}
      onDone={() => navigation.navigate('LoginScreen')}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/imone.png')}
              style={{width: 200, height: 200}}
            />
          ),
          title: 'iShurApp',
          subtitle:
            'If you are looking for a tutor in any subject, We help you find one without moving an inch!',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/imtwo.png')}
              style={{width: 200, height: 200}}
            />
          ),
          title: 'Students Choice',
          subtitle:
            'Students are welcomed to seek help to challenging courses from skilled tutors of their choice',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/listtutor.png')}
              style={{width: 200, height: 200}}
            />
          ),
          title: 'Tutors Profile',
          subtitle:
            'We have list of tutors who are qualified in their respective fields of study',
        },
      ]}
    />
  );
}
