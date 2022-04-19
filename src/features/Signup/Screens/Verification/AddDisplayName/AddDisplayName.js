import React, {useState, useRef, useEffect} from 'react';
import {Text, TouchableOpacity, Keyboard, View} from 'react-native';
import styles from './styles';
import Button from '../../../../../components/form/Button';
import TextInputSignup from '../../../../../components/form/TextInputSignup';
import Header from '../../../components/Header';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../userProfile/_redux/actions';

export default function AddDisplayName({navigation, route, updateAuthState}) {
  const initialValues = {
   firstName: '',
    lastName: ''
  };

  const [email] = useState(route.params.email);
  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);

  async function signUp() {
      dispatch(actions.createSeeker({
        username: email,
        firstName,
        lastName,
         status: 1,
        email
     })).then(() => {
         //Seeker profile created, now we can fetch it
         dispatch(actions.getSeeker(email)).then(() => {
         updateAuthState('loggedIn');
         });
     });
    }

  

  const dispatch = useDispatch();
  const refForm = useRef();
  const handleOnSubmit = async (values, {setStatus, setSubmitting}) => {
    try {
      await signUp();
    } catch (e) {
      setSubmitting(false);
      console.log("Error signing up via oauth: ",e);
    }
  };


  return (
    <View style={styles.backgroundContainer}>
      <View style={{bottom: 80}}>
        <Header
          headerText="Display Name"
          subText="Please enter your full name below to complete  your signup"
         // subText="We’ve emailed you a verification code, please enter it below"
        />
      </View>

      <Formik
        innerRef={refForm}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleOnSubmit}>
        {({handleSubmit, isSubmitting}) => (
          <>
            <View style={styles.input}>
              <TextInputSignup
                placeholder="Your first name"
                value={firstName}
                onChangeText={text => setFirstName(text)}
              />
            </View>
            <View style={styles.input}>
              <TextInputSignup
                placeholder="Your last name"
                value={lastName}
                onChangeText={text => setLastName(text)}
              />
            </View>
            <View style={{bottom: '0%'}}>
              <Button
                disabled={isSubmitting}
                onPress={() => {
                  handleSubmit();
                }}
                text="Submit"
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
