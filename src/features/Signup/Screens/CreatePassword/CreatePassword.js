import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../../../../components/form/Button';
import TextInputSignup from '../../../../components/form/TextInputSignup';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';

export const CreatePassword = () => {
  const navigation = useNavigation();

  Auth.signIn(username, password)
    .then(user => {
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const {requiredAttributes} = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        Auth.completeNewPassword(
          user, // the Cognito User Object
          newPassword, // the new password
          // OPTIONAL, the required attributes
          {
            email: 'xxxx@example.com',
            phone_number: '1234567890',
          },
        )
          .then(user => {
            // at this time the user is logged in if no MFA required
            console.log(user);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        // other situations
      }
    })
    .catch(e => {
      console.log(e);
    });

  return (
    <View style={styles.backgroundContainer}>
      <Header
        headerText="Create new password"
        subText="Please enter you password and confirm"
      />
      <View style={styles.passwordInput}>
        <TextInputSignup placeholder="Enter Password" secureTextEntry={true} />
        <TextInputSignup
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
      </View>

      <Button
        onPress={() => navigation.navigate('SignIn')}
        text="Reset Password"
      />
    </View>
  );
};

export default CreatePassword;
