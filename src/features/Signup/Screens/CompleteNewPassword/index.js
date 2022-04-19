import React from 'react';
import {Alert, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button, TextInputAuthFiled} from '../../../../components/form';
import styles from './styles';

const initialValues = {
  code: '',
  password: '',
};

export const CompleteNewPassword = ({route}) => {
  const navigation = useNavigation();

  const email = route.params?.email;

  const handleOnSubmit = async (values, {setStatus, setSubmitting}) => {
    if (!email) {
      return null;
    }

    Auth.forgotPasswordSubmit(email, values.code, values.password)
      .then(() => {
        Alert.alert('Your password has been changed successfully.');
        navigation.navigate('SignIn');
      })
      .catch((err) => {
        Alert.alert(err.message);
        setSubmitting(false);
      });
  };

  const CompleteNewPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password is required'),
    code: yup
      .string()
      .min(6, 'Minimum 6 symbols')
      .max(6, 'Maximum 6 symbols')
      .required('Verification code is required'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={CompleteNewPasswordSchema}
        onSubmit={handleOnSubmit}>
        {({
          handleSubmit,
          values,
          handleChange,
          touched,
          errors,
          isSubmitting,
        }) => (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Create New Password</Text>
              <Text style={styles.subHeading}>
                Please enter your new password and confirm
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInputAuthFiled
                placeholder="Verification Code"
                autoCorrect={false}
                autoCapitalize="none"
                value={values.code}
                onChangeText={handleChange('code')}
                hasError={touched.code && errors.code}
              />
              <TextInputAuthFiled
                placeholder="New Password"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange('password')}
                hasError={touched.password && errors.password}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                disabled={isSubmitting}
                title="Reset Password"
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default CompleteNewPassword;
