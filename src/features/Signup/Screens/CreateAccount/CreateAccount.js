import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import {Divider} from 'react-native-elements';
import Twitter from '../../../../assets/Twitter.js';
import Facebook from '../../../../assets/Facebook.js';
import Gmail from '../../../../assets/Gmail.js';
import LinkedIn from '../../../../assets/LinkedIn.js';
import Apple from '../../../../assets/Apple.js';
import Button from '../../../../components/form/Button';
import TextInputSignup from '../../../../components/form/TextInputSignup';
import Header from '../../components/Header';
import {Auth, Hub} from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import {Formik} from 'formik';
import * as yup from 'yup';

export default function SignUp({navigation}) {
  const [isSubmitting, setSubmitting] = useState(false);
  async function signUp({firstName, lastName, password, username, email}) {
    try {
      await Auth.signUp({
        firstName,
        lastName,
        password,
        username,
        attributes: {email},
      });
      navigation.navigate('VerifyMobile', {
        firstName,
        lastName,
        email,
        username,
        password,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    }
  }

  const SigninSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    username: yup.string().when('email', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('email')], 'Both email need to be the same'),
    }),
  });

  const signupWithFacebook = async() => {
    Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook});
  }

  const signupWithApple = async() => {
    console.log("Signing up with Apple..");
    //Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Apple});
  }

  const signupWithGoogle = async() => {
    Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google});
  }

  const _oAuthSignUp = async () => {
    setSubmitting(true);
    try{
      Auth.currentAuthenticatedUser()
      .then(u => {
        try{
          dispatch(actions.getSeeker(u.attributes.email)).then((r) => {
           if(r.length < 1){
              let name = u.attributes.name.split(" ");
              navigation.navigate('AddDisplayName',{
                firstName: name[0],
                lastName: name[1],
                email: u.attributes.email,
                 
              });
            }
            else{
              //User has a seeker profile
              dispatch(actions.getSeeker(u.attributes.email)).then(() => {
                updateAuthState('loggedIn');
              });
            }
          });
        }
        catch(e){
           console.log("e: ",e);
        }
      });
    }
    catch (error) {
      Alert.alert('Error from _oAuthSignup: ', error.message);
      setSubmitting(false);
      console.log(error);
    }
    
  }

  useEffect(() => {
    Hub.listen('auth', (response) => {
     
      let payload = response.payload, event = payload.event;
   
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          _oAuthSignUp();
          break;
        case 'signOut':
          //setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', payload.data);
          break;
      }
    });
  });

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', paddingTop: '10%'}}>
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.backgroundContainer}>
          <Header
            headerText="Create Account"
            subText="Please enter your details below to create a new account"
          />
          <Formik
            initialValues={{
              email: '',
              password: '',
              firstName: '',
              lastName: '',
              username: '',
            }}
            validationSchema={SigninSchema}
            onSubmit={signUp}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              values,
              errors,
            }) => (
              <>
                <TextInputSignup
                  placeholder="First name"
                  autoCorrect={false}
                  value={values.firstName}
                  hasError={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : false
                  }
                  onChangeText={handleChange('firstName')}
                />
                <TextInputSignup
                  placeholder="Last name"
                  value={values.lastName}
                  hasError={
                    errors.lastName && touched.lastName
                      ? errors.lastName
                      : false
                  }
                  autoCorrect={false}
                  onChangeText={handleChange('lastName')}
                />
                <TextInputSignup
                  onChangeText={handleChange('email')}
                  placeholder="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={values.email}
                  hasError={
                    errors.email && touched.email ? errors.email : false
                  }
                />
                <TextInputSignup
                  onChangeText={handleChange('username')}
                  placeholder="Confirm email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.username}
                  hasError={
                    errors.username && touched.username
                      ? errors.username
                      : false
                  }
                />
                <TextInputSignup
                  placeholder="Password"
                  secureTextEntry={true}
                  value={values.password}
                  hasError={
                    errors.password && touched.password
                      ? errors.password
                      : false
                  }
                  onChangeText={handleChange('password')}
                />

                <Text style={styles.terms}>
                  I agree to connecMe2 privacy policy and terms of service.
                </Text>

                <View style={{bottom: 30, marginTop: -20}}>
                  <Button onPress={handleSubmit} text="Sign Up" />
                </View>
              </>
            )}
          </Formik>

          { isSubmitting && (
           <View style={{flexDirection: "row", justifyContent: "space-around", padding: 10}}>
            <ActivityIndicator size="small" color='#f59532'/>
            <Text style={{marginLeft: 5, fontSize: 18,color: "#000"}}>Please wait</Text>
           </View>
         )}

          <View style={styles.dividerView}>
            <Divider style={styles.dividerLeft} />
            <Text style={styles.dividerContent}>Or connect with</Text>
            <Divider style={styles.dividerRight} />
          </View>
          <View style={styles.socials}>
          <TouchableOpacity
         onPress={signupWithFacebook}
        >
          <Facebook width="40" height="40" />
        </TouchableOpacity>
        
        <TouchableOpacity
         onPress={signupWithGoogle}
        >
           <Gmail width="40" height="40" />
        </TouchableOpacity>
       
       
        <TouchableOpacity
         onPress={signupWithApple}
        >
           <Apple width="40" height="40" />
        </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signUp}>
                I have an account!{' '}
                <Text style={{color: '#f59532'}}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
