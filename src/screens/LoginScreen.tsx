import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {blue_theme, user} from '../utils';
import {validationErrors} from '../utils/validation';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {_signInWithGoogle} from '../firebase/GoogleSignIn';
import {setUserData} from '../utils/Storage';
import {
  ic_hide_icon,
  ic_lock_icon,
  ic_mail_icon,
  ic_view_icon,
} from '../utils/images';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = () => {
    if (email === '') {
      setError(validationErrors?.email);
      return;
    } else if (password === '') {
      setError(validationErrors?.password);
      return;
    } else if (email !== user?.EMAIL) {
      setError(validationErrors?.invalidEmail);
      return;
    } else if (password !== user?.PASSWORD) {
      setError(validationErrors?.invalidPassword);
      return;
    }
    doSingIn(email, password);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const doSingIn = async (email: string, password: string) => {
    setFetching(true);
    try {
      const response = {
        email,
        password,
        name: user?.NAME,
        fullName: user?.FULL_NAME,
      };
      setTimeout(() => {
        if (response) {
          setUserData(response);
          setFetching(false);
          navigation.replace('TabNavigator');
        }
      }, 1000);
    } catch (err) {
      setFetching(false);
    }
  };

  async function googleSignIn() {
    _signInWithGoogle().then(data => {
      setFetching(true);
      if (!data) {
        setFetching(false);
        return;
      }
      const response = {
        email: data.user.email,
        password: null,
        name: data.user.givenName,
        fullName: data.user.name,
      };
      if (response) {
        setUserData(response);
        setFetching(false);
        navigation.replace('TabNavigator');
      }
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <Image source={ic_mail_icon} style={styles.icons} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView}>
        <Image source={ic_lock_icon} style={styles.icons} />
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={hidePassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        {password && (
          <TouchableOpacity
            style={styles.hideIconView}
            onPress={() => {
              setHidePassword(prev => !prev);
            }}>
            <Image
              source={hidePassword ? ic_view_icon : ic_hide_icon}
              style={styles.icons}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <View style={styles.errorLabelContainerStyle}>
          <Text style={styles.errorTextStyle} testID="errorLabel">
            {error}
          </Text>
        </View>
      ) : null}
      {fetching && <ActivityIndicator color={blue_theme} />}
      <TouchableOpacity
        testID="loginButton"
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.orView}>
        <Text>or</Text>
      </View>
      <View style={styles.sectionContainer}>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn}
        /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
  },
  button: {
    backgroundColor: blue_theme,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonCreate: {
    position: 'absolute',
    bottom: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  buttonCreateText: {
    color: 'red',
  },
  errorLabelContainerStyle: {
    margin: 10,
  },
  errorTextStyle: {
    color: 'red',
  },
  sectionContainer: {
    marginTop: 10,
  },
  otherSignInButtonsContaoner: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  otherSignInButtons: {
    marginHorizontal: 8,
  },
  googleSignInButton: {
    height: 30,
    width: 150,
  },
  orView: {alignItems: 'center', marginTop: 10},
  passwordInput: {
    width: '80%',
  },
  inputView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    gap: 10,
  },
  icons: {width: 20, height: 20},
  hideIconView: {
    position: 'absolute',
    right: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
