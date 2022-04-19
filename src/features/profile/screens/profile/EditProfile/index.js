import React, {useEffect, useState, useRef} from 'react';
import {Alert, View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DocumentPicker from 'react-native-document-picker';
import * as yup from 'yup';
import {Formik} from 'formik';

import * as actions from '../../../_redux/actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Button, MultilineTextInputField} from '../../../../../components/form';
import {
  Cvinput,
  EditTextInput,
  LineSeperator,
  ToggleButton,
} from './components';
import styles from './styles';

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default function EditProfile() {
  const [doc, setDoc] = useState('');

  const refForm = useRef();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {seeker, user} = useSelector(
    (state) => ({
      user: state.seekerReducer.seeker,
      seeker: state.profileReducer.seeker,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(actions.fetchSeekerProfile(user.id));
  }, [user.id]);

  const handleOnSubmit = async (values, {setSubmitting}) => {
    try {
      const input = {
        status: values.status,
        id: seeker.id,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        biography: values.biography,
        postcodeArea: values.postcodeArea,
        visibleToProviders: values.visibleToProviders,
        visibleToSeekers: values.visibleToSeekers,
      };

      dispatch(actions.updateSeeker(input)).then(() => {
        dispatch(actions.fetchSeekerProfile(user.id));

        Alert.alert('Your profile details have been saved.');
        navigation.navigate('Profile');
      });
    } catch (e) {
      setSubmitting(false);
      console.log(e);
    }
  };

  const addDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (res) {
        setDoc(res);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const initialValues = {
    firstName: seeker?.firstName ? seeker.firstName : '',
    lastName: seeker?.lastName ? seeker.lastName : '',
    email: seeker?.email ? seeker.email : '',
    status: 1,
    postcodeArea: seeker.postcodeArea ? seeker.postcodeArea : '',
    mobileNumber: seeker.mobileNumber ? seeker.mobileNumber : '',
    dateOfBirth: seeker.dateOfBirth ? seeker.dateOfBirth : '',
    biography: seeker.biography ? seeker.biography : '',
    visibleToProviders: seeker?.visibleToProviders
      ? seeker.visibleToProviders
      : false,
    visibleToSeekers: seeker?.visibleToSeekers
      ? seeker.visibleToSeekers
      : false,
  };

  const userProfileSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    postcodeArea: yup.string().required('Post Code is required.'),
    mobileNumber: yup
      .string()
      .required('Mobile Number is required.')
      .matches(phoneRegExp, 'Phone number is not valid'),
    dateOfBirth: yup
      .date()
      .nullable()
      .transform((curr, orig) => (orig === '' ? null : curr)),
    biography: yup.string(),
  });

  return (
    <View style={styles.container}>
      <Formik
        innerRef={refForm}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={userProfileSchema}
        onSubmit={handleOnSubmit}>
        {({
          handleSubmit,
          values,
          setFieldValue,
          handleChange,
          touched,
          errors,
          isValid,
          isSubmitting,
        }) => (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                <View style={styles.field}>
                  <EditTextInput
                    fieldTitle="First name"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    hasError={touched.firstName && errors.firstName}
                  />
                  <LineSeperator />
                </View>
                <View style={styles.field}>
                  <EditTextInput
                    fieldTitle="Last name"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    hasError={touched.lastName && errors.lastName}
                  />
                  <LineSeperator />
                </View>
                <View style={styles.field}>
                  <EditTextInput
                    fieldTitle="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    hasError={touched.email && errors.email}
                    editable={false}
                  />
                </View>
                <View style={styles.field}>
                  <EditTextInput
                    fieldTitle="Mobile number"
                    value={values.mobileNumber}
                    onChangeText={handleChange('mobileNumber')}
                    keyboardType='phone-pad'
                    hasError={touched.mobileNumber && errors.mobileNumber}
                  />
                </View>
                <View style={styles.field}>
                  <EditTextInput
                    fieldTitle="Post code"
                    value={values.postcodeArea}
                    onChangeText={handleChange('postcodeArea')}
                    hasError={touched.postcodeArea && errors.postcodeArea}
                  />
                </View>
                <View style={styles.field}>
                  <EditTextInput
                    fieldTitle="Date of birth"
                    value={values.dateOfBirth}
                    onChangeText={handleChange('dateOfBirth')}
                    keyboardType='numbers-and-punctuation'
                    hasError={touched.dateOfBirth && errors.dateOfBirth}
                  />
                </View>
                <View style={styles.field}>
                  <Cvinput
                    fieldTitle={doc.name ? doc.name : 'Upload CV'}
                    onPress={addDoc}
                  />
                </View>
                <View style={styles.field}>
                  <MultilineTextInputField
                    caption={'Bio'}
                    hasError={touched.biography && errors.biography}
                    maxLength={300}
                    value={values.biography}
                    onChangeText={handleChange('biography')}
                  />
                </View>
                <View style={styles.field}>
                  <View style={styles.visibilityContainer}>
                    <Text style={styles.heading}>Account Visibility</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.text}>Visible to providers</Text>
                      <ToggleButton
                        value={values.visibleToProviders}
                        setValue={(value) =>
                          setFieldValue('visibleToProviders', value)
                        }
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.text}>Visible to Seekers</Text>
                      <ToggleButton
                        value={values.visibleToSeekers}
                        setValue={(value) =>
                          setFieldValue('visibleToSeekers', value)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <SafeAreaView edges={['bottom']}>
                <Button
                  title={'Update'}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />
              </SafeAreaView>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
