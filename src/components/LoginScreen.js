import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import auth, {firebase} from '@react-native-firebase/auth';
import DoubleTapToClose from '../reusable-components/ExistAppHandler';
import {login} from '../store/actions/actions';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../assets/colors';

const LoginScreen = ({navigation, login}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setTextSecureTextEntry] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);

  const ChangeSecureTextEntry = () => {
    setTextSecureTextEntry(!secureTextEntry);
  };

  const handleSignUp = () => {
    navigation.navigate('TutorSignUpScreen');
  };

  const validateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignIn = async () => {
    // implement some validations
    const trimmedPass = password.trim();
    if (!email) {
      setError('Email required *');
      setValid(false);
      return;
    } else if (!validateEmail(email)) {
      setError('Invalid Email');
      setValid(false);
      return;
    } else if (!trimmedPass || password.length < 6) {
      setError('Weak password, minimum 6 chars');
      setValid(false);
      return;
    }

    setError('');
    setFetching(true);

    login(email, password, (res, stats) => {
      if (stats === true) {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            if (user.emailVerified === false) {
              user.sendEmailVerification();
              setFetching(false);
              Alert.alert(
                'Verification',
                'Please check your email for account verification.',
              );
              return;
            } else if (user.emailVerified === true) {
              setFetching(false);
              setEmail('');
              setPassword('');
              navigation.navigate('BottomNavigator');
            }
          }
        });
      } else if (res.includes('auth/user-not-found')) {
        setFetching(false);
        Alert.alert('Sign In', 'Email address provided is not registered.');
      } else if (res.includes('auth/wrong-password')) {
        setFetching(false);
        Alert.alert(
          'Sign In',
          'The password is invalid or the user does not have a password.',
        );
      }
    });
  };

  const handleChangePassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.containerStyle}>
      <DoubleTapToClose />
      <StatusBar backgroundColor={COLORS.secondary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={{fontSize: 16}}>Welcome To, </Text>
        <Text style={styles.textHeader}>iShurApp</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        {fetching && <ActivityIndicator color={COLORS.primary} size="large" />}
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.inputWrapper}>
          <FontAwesome name="user-o" color={COLORS.grey} size={20} />
          <TextInput
            placeholder="Enter your email"
            style={styles.TextInput}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={value => {
              setError;
              setEmail(value);
            }}
            error={isValid}
          />
        </View>

        <Text style={{...styles.text_footer, marginTop: 35}}>Password</Text>
        <View style={styles.inputWrapper}>
          <Feather name="lock" color={COLORS.grey} size={20} />
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={secureTextEntry ? true : false}
            style={styles.TextInput}
            autoCapitalize="none"
            value={password}
            onChangeText={value => {
              setError;
              setPassword(value);
            }}
            error={isValid}
          />
          <TouchableOpacity onPress={ChangeSecureTextEntry}>
            {secureTextEntry ? (
              <Feather name="eye-off" color={COLORS.grey} size={20} />
            ) : (
              <Feather name="eye" color={COLORS.grey} size={20} />
            )}
          </TouchableOpacity>
        </View>
        {error ? (
          <View>
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => handleSignIn()}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.primary]}
              style={styles.signIn}>
              <Text style={styles.textSign}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSignUp()}
            style={{
              ...styles.signIn,
              borderColor: COLORS.primary,
              borderWidth: 1,
              marginTop: 15,
            }}>
            <Text style={{...styles.textSign, color: COLORS.primary}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleChangePassword()}>
            <Text style={styles.textForgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold',
  },
  text_footer: {
    color: COLORS.grey,
    fontSize: 18,
  },
  inputWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  TextInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 15,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  textForgot: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    padding: 20,
  },
  errorTextStyle: {
    color: 'red',
    paddingTop: 10,
  },
});

const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
