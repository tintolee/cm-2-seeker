import React, {useState, useRef, useEffect} from 'react';
import {Text, TouchableOpacity, Keyboard, View} from 'react-native';
import styles from './styles';
import Button from '../../../../../components/form/Button';
import TextInputSignup from '../../../../../components/form/TextInputSignup';
import Header from '../../../components/Header';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../userProfile/_redux/actions';
import {Auth} from 'aws-amplify';

export default function VerifyMobile({navigation, route, updateAuthState}) {
  const initialValues = {
    username: '',
    firstName: '',
    lastName: '',
    status: '',
    email: '',
  };

  const [authCode, setAuthCode] = useState('');
  const [username] = useState(route.params.username);
  const [password] = useState(route.params.password);
  const [email] = useState(route.params.email);
  const [firstName] = useState(route.params.firstName);
  const [lastName] = useState(route.params.lastName);

  async function signIn() {
    try {
      await Auth.signIn(email, password);

      updateAuthState('loggedIn');
    } catch (error) {
      console.log(' Error signing in...', error);
    }
  }

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      await signIn();
      console.log(' Code confirmed');
    } catch (error) {
      console.log(
        ' Verification code does not match. Please enter a valid verification code.',

        error.code,
      );
    }
  }

  const dispatch = useDispatch();
  const refForm = useRef();
  const handleOnSubmit = async (values, {setStatus, setSubmitting}) => {
    console.log(values);
    await confirmSignUp();
    try {
      const input = {
        username: route.params.username,
        firstName: route.params.firstName,
        lastName: route.params.lastName,
        status: 1,
        email: route.params.email,
      };

      dispatch(actions.createSeeker(input)).then(() => {
        console.log(input);
      });
    } catch (e) {
      setSubmitting(false);
      console.log(e);
    }
  };

  // async function resendConfirmationCode() {
  //   try {
  //     await Auth.resendSignUp(username);
  //     console.log('code resent successfully');
  //   } catch (err) {
  //     console.log('error resending code: ', err);
  //   }
  // }

  return (
    <View style={styles.backgroundContainer}>
      <View style={{bottom: 80}}>
        <Header
          headerText="Verification"
          // subText="Please enter your details below to create a new account"
          subText="We’ve emailed you a verification code, please enter it below"
        />
      </View>

      <Formik
        innerRef={refForm}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleOnSubmit}>
        {({handleSubmit, isSubmitting}) => (
          <>
            <View style={styles.passwordInput}>
              <TextInputSignup
                placeholder="6 digit code"
                keyboardType = {"number-pad"}
                value={authCode}
                onChangeText={text => setAuthCode(text)}
              />
            </View>
            <View style={{marginBottom: 20}}>
              {/* <TouchableOpacity onPress={resendConfirmationCode}>
                <Text style={styles.resendCode}>Resend Code</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{bottom: '25%'}}>
              <Button
                disabled={isSubmitting}
                onPress={() => {
                  // confirmSignUp();
                  // signIn();
                  handleSubmit();
                }}
                text="Verify"
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
