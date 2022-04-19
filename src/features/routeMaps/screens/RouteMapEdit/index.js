import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import {Formik} from 'formik';
import * as yup from 'yup';
import {s3Bucket, region, uploadImage} from '../../../../hooks/useUploadImage';
import {resizeImage} from '../../../../utils/FileResizer';
import {
  MultiSelect,
  ImagePicker,
  VisibilityChange,
  Button,
} from '../../../../components/form';
import styles from './styles';

const initialValues = {
  id: undefined,
  category: {
    id: undefined,
  },
  destination: '',
  focusAreas: [],
  photo: '',
  visibility: 1,
  status: 1,
};

export default function RouteMapsEdit({route}) {
  const [routeMapForEdit, setRouteMapForEdit] = useState(undefined);
  const navigation = useNavigation();
  const refForm = useRef();

  const id = route.params?.id;

  const dispatch = useDispatch();
  const {user, routeMapDetail} = useSelector(
    (state) => ({
      user: state.seekerReducer.seeker,
      routeMapDetail: state.routeMapsReducer.routeMapDetail,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (refForm.current) {
      const category = route.params?.category;
      if (category) {
        refForm.current.setFieldValue('category', category);
      }

      const destination = route.params?.destination;
      if (destination) {
        refForm.current.setFieldValue('destination', destination);
      }

      const focusAreas = route.params?.focusAreas;
      if (focusAreas) {
        refForm.current.setFieldValue('focusAreas', focusAreas);
      }
    }
  }, [route.params]);

  const handleOnSubmit = async (values, {setStatus, setSubmitting}) => {
    setSubmitting(true);
    let image;
    if (!!values.photo) {
      image = await uploadImage(values.photo);
    }

    try {
      const input = {
        visibility: values.visibility,
        status: values.status,
        coverPhoto: {
          key: image,
          bucket: s3Bucket,
          region: region,
        },
        destination: values.destination,
        focusAreas: values.focusAreas,
        routeMapCategoryId: values.category.id,
        routeMapOwnerId: user.id,
      };

      if (id) {
        input.id = id;
        dispatch(actions.updateRouteMap(input)).then(() => {
          setSubmitting(false);
          navigation.navigate('RouteMapsList', {
            forceUpdate: new Date().toLocaleString(),
          });
        });
      } else {
        dispatch(actions.createRouteMap(input)).then(() => {
          setSubmitting(false);
          navigation.navigate('RouteMapsList', {
            forceUpdate: new Date().toLocaleString(),
          });
        });
      }
    } catch (e) {
      setSubmitting(false);
      console.log(e);
    }
  };

  const onPhotoPickChange = async (imageUrl, fieldName, callback) => {
    try {
      const config = {
        maxWidth: 500,
        maxHeight: 500,
        compressFormat: 'JPEG',
        quality: 100,
      };

      const resizedImage = await resizeImage(imageUrl, config);

      callback(fieldName, resizedImage.path);
    } catch (err) {
      console.log(err);
    }
  };

  const RouteMapEditSchema = yup.object().shape({
    category: yup.object().shape({
      id: yup.string().required('Category is required'),
    }),
    destination: yup.string().required('Destination is required'),
    photo: yup.string().required('Photo is required'),
    focusAreas: yup.array().of(yup.string()),
  });

  return (
    <View style={styles.container}>
      <Formik
        innerRef={refForm}
        enableReinitialize
        initialValues={routeMapForEdit || initialValues}
        validationSchema={RouteMapEditSchema}
        onSubmit={handleOnSubmit}>
        {({
          handleSubmit,
          values,
          setFieldValue,
          touched,
          errors,
          isValid,
          isSubmitting,
        }) => (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                <View style={styles.field}>
                  <MultiSelect
                    fieldTitle="Category"
                    placeholder="Select your category"
                    values={values.category.id}
                    text={values.category.name}
                    hasError={touched.category?.id && errors.category?.id}
                    disabled
                  />
                </View>
                <View style={styles.field}>
                  <MultiSelect
                    fieldTitle="Destination"
                    placeholder="Select your destination"
                    values={values.destination}
                    text={values.destination}
                    hasError={touched.destination && errors.destination}
                    onPress={() =>
                      navigation.navigate('SelectionDestination', {
                        destination: values.destination,
                      })
                    }
                  />
                </View>
                <View style={styles.field}>
                  <MultiSelect
                    fieldTitle="Focus Areas"
                    placeholder="Select your key focus areas"
                    text={values.focusAreas}
                    values={values.focusAreas}
                    hasError={touched.focusAreas && errors.focusAreas}
                    multi
                    onPress={() =>
                      navigation.navigate('SelectionFocusAreas', {
                        focusAreas: values.focusAreas,
                      })
                    }
                  />
                </View>
                <View style={styles.field}>
                  <ImagePicker
                    fieldTitle="Cover Photo"
                    placeholder="This will display at the top of your route map"
                    hasError={touched.photo && errors.photo}
                    imageUrl={values.photo}
                    setImageUrl={(imageUrl) => {
                      onPhotoPickChange(imageUrl, 'photo', setFieldValue);
                    }}
                  />
                </View>
                <View style={styles.field}>
                  {!user?.visibleToSeekers && (
                    <VisibilityChange
                      value={values.visibility}
                      setValue={(value) => setFieldValue('visibility', value)}
                    />
                  )}
                </View>
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <SafeAreaView edges={['bottom']}>
                <Button
                  title={'Create Route Map'}
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
