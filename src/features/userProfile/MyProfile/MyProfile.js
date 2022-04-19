import React, {useRef} from 'react';
import {View, KeyboardAvoidingView, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as actions from '../_redux/actions';
import * as yup from 'yup';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {s3Bucket, region, uploadImage} from '../../../hooks/useUploadImage';
import ImagePicker from '../components/ProfileImage';
import Button from '../../../components/form/Button';
import EditTextInput from '../../../features/profile/screens/profile/EditProfile/components/EditTextInput';
import styles from './styles';

export default function MyProfile({route}) {
  const navigation = useNavigation();
  const refForm = useRef();

  const dispatch = useDispatch();

  const {seeker} = useSelector(
    (state) => ({
      seeker: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  const initialValues = {
    profilePic: '',
    status: 1,
    postcodeArea: seeker?.postcodeArea ? seeker.postcodeArea : '',
    mobileNumber: seeker?.mobileNumber ? seeker.mobileNumber : '',
  };
  const handleOnSubmit = async (values, {setStatus, setSubmitting}) => {
    try {
      let image;
      if (!!values.profilePic) {
        image = await uploadImage(values.profilePic);
      }

      const input = {
        status: values.status,
        id: seeker.id,
        postcodeArea: values.postcodeArea,
        mobileNumber: values.mobileNumber,
        profilePic: values.profilePic,
      };
      if (!!values.profilePic) {
        input.profilePic = {
          key: image,
          bucket: s3Bucket,
          region: region,
        };
      }
      console.log(input);

      dispatch(actions.updateSeeker(input)).then(() => {
        navigation.navigate('Interests');
      });
    } catch (e) {
      setSubmitting(false);
      console.log(e);
    }
  };
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const PhotoEditSchema = yup.object().shape({
    profilePic: yup.string().required('Photo is required'),
    postcodeArea: yup.string().required('Post Code Must be required.'),
    // .matches(/^[0-9]+$/, "Must be only digits")
    // .min(5, 'Must be exactly 5 digits')
    // .max(5, 'Must be exactly 5 digits'),
    mobileNumber: yup
      .string()
      .required('Mobile Number Must be required.')
      .matches(phoneRegExp, 'Phone number is not valid'),
  });

  return (
    <Formik
      innerRef={refForm}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={PhotoEditSchema}
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.backgroundContainer}>
            <View style={styles.topContainer}>
              <ImagePicker
                hasError={touched.profilePic && errors.profilePic}
                imageUrl={values.profilePic}
                setImageUrl={(imageUrl) => {
                  setFieldValue('profilePic', imageUrl);
                }}
              />
              <Text style={styles.profileName}>
                {seeker?.firstName ? seeker.firstName : ''}{' '}
                {seeker?.lastName ? seeker.lastName : ''}
              </Text>
            </View>

            <View style={styles.field}>
              <EditTextInput
                value={values.postcodeArea}
                onChangeText={handleChange('postcodeArea')}
                fieldTitle="Post code"
                hasError={touched.postcodeArea && errors.postcodeArea}
              />
            </View>

            <Text style={styles.bodyText}>
              We'll use this to help you find local opportunities.
            </Text>

            <View
              style={{
                borderBottomColor: '#edf1f7',
                borderBottomWidth: 1,
                bottom: 40,
                marginHorizontal: 50,
              }}
            />
            <View style={styles.field}>
              <EditTextInput
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                fieldTitle="Mobile number"
                hasError={touched.mobileNumber && errors.mobileNumber}
              />
            </View>
            <Text style={styles.bodyText}>
              We'll use this to Lorem ipsum sit.
            </Text>
            <View
              style={{
                borderBottomColor: '#edf1f7',
                borderBottomWidth: 1,
                bottom: 40,
                marginHorizontal: 50,
              }}
            />
            <View style={{marginLeft: '10%'}}>
              <Button
                onPress={handleSubmit}
                disabled={isSubmitting}
                text="Next"
              />
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </Formik>
  );
}
