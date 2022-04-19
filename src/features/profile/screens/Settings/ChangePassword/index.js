import React from 'react';
import {Alert, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button, TextInputAuthFiled} from '../../../../../components/form';
import styles from './styles';

const initialValues = {
  currentPassword: '',
  password: '',
  cPassword: '',
};

export const ChangePassword = () => {
  const navigation = useNavigation();

  const handleOnSubmit = async (values, {setStatus, setSubmitting}) => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(
          user,
          values.currentPassword,
          values.password,
        );
      })
      .then(() => {
        Alert.alert('Your password has been changed successfully.');
        navigation.navigate('Profile');
      })
      .catch((err) => {
        Alert.alert(err.message);
        setSubmitting(false);
      });
  };

  const ChangePasswordSchema = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    password: yup.string().required('New Password is required'),
    cPassword: yup
      .string()
      .required('Password confirmation is required')
      .when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref('password')],
            "Password and Confirm Password didn't match",
          ),
      }),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={ChangePasswordSchema}
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
              <Text style={styles.title}>Change Password</Text>
              <Text style={styles.subHeading}>
                Please enter your current and new password
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInputAuthFiled
                placeholder="Current Password"
                secureTextEntry={true}
                value={values.currentPassword}
                onChangeText={handleChange('currentPassword')}
                hasError={touched.currentPassword && errors.currentPassword}
              />
              <TextInputAuthFiled
                placeholder="New Password"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange('password')}
                hasError={touched.password && errors.password}
              />
              <TextInputAuthFiled
                placeholder="Verify Password"
                secureTextEntry={true}
                value={values.cPassword}
                onChangeText={handleChange('cPassword')}
                hasError={touched.cPassword && errors.cPassword}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                disabled={isSubmitting}
                title="Change Password"
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default ChangePassword;
