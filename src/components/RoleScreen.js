import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {PrimaryButton} from '../reusable-components/Button';

const RoleScreen = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('LoginScreen', {role: 'tutor'});
  };
  const handleLoginEmployer = () => {
    navigation.navigate('LoginScreen', {role: 'employer'});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.textLogoWrapper}>
          <Text style={styles.textLogo}>iShurApp</Text>
        </View>
        <Text style={styles.roleText}>What is you role?</Text>
        <View style={styles.rolesWrapper}>
          <PrimaryButton
            title="Employer"
            onPress={() => handleLoginEmployer()}
          />
          <PrimaryButton title="Tutor" onPress={() => handleLogin()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RoleScreen;

const styles = StyleSheet.create({
  rolesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  textLogo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  textLogoWrapper: {
    marginBottom: 30,
  },
  textLogo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  roleText: {
    fontSize: 18,
  },
});
