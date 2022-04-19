import React from 'react';
import {Alert, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button, TextInputAuthFiled} from '../../../../components/form';
import styles from './styles';

const initialValues = {
  email: '',
};

export const ForgotPassword = () => {
  const navigation = useNavigation();

  const handleOnSubmit = async (values, {setStatus, setSubmitting}) => {
    Auth.forgotPassword(values.email)
      .then(() => {
        navigation.navigate('CompleteNewPassword', {email: values.email});
      })
      .catch((err) => {
        Alert.alert(err.message);
        setSubmitting(false);
      });
  };

  const ForgotPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotPasswordSchema}
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
              <Text style={styles.title}>Forgot password</Text>
              <Text style={styles.subHeading}>
                Please enter your email address and we will send you a reset
                password link.
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInputAuthFiled
                placeholder="Enter email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                hasError={touched.email && errors.email}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                disabled={isSubmitting}
                title="Next"
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
