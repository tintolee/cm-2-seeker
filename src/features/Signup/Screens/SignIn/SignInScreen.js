import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
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
import {Auth, Hub, oAuthSignInButton} from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import {useDispatch} from 'react-redux';
import * as actions from '../../../userProfile/_redux/actions';
import {Formik} from 'formik';
import * as yup from 'yup';

export default function SignInScreen({navigation, updateAuthState}) {
  const dispatch = useDispatch();

  const [isSubmitting, setSubmitting] = useState(false);

  async function signIn({password, email}, {setErrors, resetForm}) {
    setSubmitting(true);
    try {
      await Auth.signIn(email, password);
      dispatch(actions.getSeeker(email)).then(() => {
        updateAuthState('loggedIn');
      });
    } catch (error) {
      Alert.alert('Error', error.message);
      setSubmitting(false);
      console.log(error);
    }
  }

  const SignupSchema = yup.object().shape({
    password: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
  });

  const loginWithFacebook = async() => {
    Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook});
  }

  const loginWithApple = async() => {
    console.log("Logging in with Apple..");
    //Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Apple});
  }

  const loginWithGoogle = async() => {
    setSubmitting(true);
    Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google});
  }

  const _oAuthSignIn = async () => {
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
      Alert.alert('Error from _oAuthSignIn: ', error.message);
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
           _oAuthSignIn();
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.backgroundContainer}>
      <Image
        style={styles.logoImage}
        source={require('../../../../assets/LogoNew1.jpeg')}
      />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={signIn}>
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
              placeholder="Email"
              value={values.email}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              hasError={errors.email && touched.email ? errors.email : false}
            />
            <TextInputSignup
              placeholder="Password"
              value={values.password}
              secureTextEntry
              autoCorrect={false}
              secureTextEntry
              textContentType="password"
              onChangeText={handleChange('password')}
              hasError={
                errors.password && touched.password ? errors.password : false
              }
              // onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
            <Button
              text="Sign In"
              onPress={handleSubmit}
              disabled={isSubmitting}
            />
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
         onPress={loginWithFacebook}
         disabled={isSubmitting}
        >
          <Facebook width="40" height="40" />
        </TouchableOpacity>
        
        <TouchableOpacity
         onPress={loginWithGoogle}
         disabled={isSubmitting}
        >
           <Gmail width="40" height="40" />
        </TouchableOpacity>
       
       
        <TouchableOpacity
         onPress={loginWithApple}
         disabled={isSubmitting}
        >
           <Apple width="40" height="40" />
        </TouchableOpacity>
       
      </View>

      <View style={{flexDirection: 'row', top: '5%'}}>
        <Text style={styles.signUp}>i dont have an account</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={{color: '#f59532'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
