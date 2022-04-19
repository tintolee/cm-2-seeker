import React, {useEffect, useRef, useState} from 'react';
import {Text, KeyboardAvoidingView, Keyboard, View} from 'react-native';
import * as actions from '../_redux/actions';
import styles from './styles';
import Button from '../../../components/form/Button';
import MultilineTextInputField from '../../../components/form/MultilineTextInputField';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

const initialValues = {
  id: undefined,
  biography: '',
  mobileNumber: '',
  admireBrands: [],
  interests: [],
};

export default function AboutYourself({route}) {
  const dispatch = useDispatch();
  const {seeker} = useSelector(
    state => ({
      seeker: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );
  const refForm = useRef();
  const [biography, setbiography] = useState('');
  

  useEffect(() => {
    if (refForm.current) {
      const admireBrands = route.params?.admireBrands;
      if (admireBrands) {
        refForm.current.setFieldValue('Brands', admireBrands);
      }
      const interests = route.params?.interests;
      if (interests) {
        refForm.current.setFieldValue('Interests', interests);
      }
    }
  }, [route.params]);

  const handleOnSubmit = async (values, {setStatus, setSubmitting}) => {
    try {
      const input = {
        status: 1,
        biography: values.biography,
        id: seeker.id,
        admireBrands: values.admireBrands,
        interests: values.interests,
      };

      console.log(input);

      dispatch(actions.updateSeeker(input)).then(() => {
        // navigation.navigate('TabNavigator');
        dispatch(actions.completeSeekerProfile());
      });
    } catch (e) {
      setSubmitting(false);
      console.log(e);
    }
  };

  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.backgroundContainer}>
      <Formik
        innerRef={refForm}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleOnSubmit}>
        {({handleSubmit, isSubmitting}) => (
          <>
            <View style={{marginTop: '20%'}}>
              <Text style={styles.heading}>
                Tell others a little bit about yourself
              </Text>
              <Text style={styles.subtext}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                {route.params.interests}
              </Text>

              <View style={{top: '10%', marginHorizontal: 20}}>
                <MultilineTextInputField
                  onSubmitEditing={Keyboard.dismiss}
                  value={biography}
                  autoCorrect={false}
                  onChangeText={text => setbiography(text)}
                />

                <Text style={styles.bio}>Bio</Text>
              </View>
              <View style={{marginLeft: '10%', top: '10%'}}>
                <Text style={styles.bodyText}>
                  eg. I am a keen videographer looking for oppportunities in the
                  film or music industry. Hit me up if you fancy collaborating.
                </Text>
              </View>
              <View style={{marginLeft: '10%', marginTop: '15%'}}>
                <Button
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  text="Finish"
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}
