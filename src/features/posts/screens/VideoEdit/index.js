import React, {useEffect, useRef, useState} from 'react';
import {Alert, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import {Formik} from 'formik';
import * as yup from 'yup';
import {s3Bucket, region, uploadImage} from '../../../../hooks/useUploadImage';
import {
  ImagePicker,
  MultilineTextInputField,
  LinkSelection,
  MultiSelect,
  Button,
  VisibilityChange,
} from '../../../../components/form';
import styles from './styles';

const initialValues = {
  id: undefined,
  type: 'VIDEO',
  caption: '',
  video: '',
  visibility: 1,
  status: 1,
  routeMap: undefined,
};

export default function VideoEdit({route}) {
  const [postForEdit, setPostForEdit] = useState(undefined);
  const navigation = useNavigation();
  const refForm = useRef();

  const id = route.params?.id;
  const previousScreen = route.params?.previousScreen;

  const dispatch = useDispatch();
  const {seeker, postDetail} = useSelector(
    (state) => ({
      seeker: state.seekerReducer.seeker,
      postDetail: state.postsReducer.postDetail,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (refForm.current) {
      const routeMap = route.params?.routeMap;
      if (routeMap) {
        refForm.current.setFieldValue('routeMap', routeMap);
      }
    }
  }, [route.params]);

  useEffect(() => {
    dispatch(actions.fetchPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (postDetail && id) {
      navigation.setOptions({
        title: 'Edit Video',
      });

      setPostForEdit({
        id: postDetail.id,
        caption: postDetail.caption,
        visibility: postDetail.visibility,
        status: postDetail.status,
        routeMap: postDetail.routeMap,
        video: postDetail.video,
      });
    }
  }, [postDetail, id]);

  const handleOnSubmit = async (values, {setStatus, setSubmitting}) => {
    try {
      let video;
      if (!!values.video) {
        video = await uploadImage(values.video);
      }

      const input = {
        type: values.type,
        caption: values.caption,
        status: values.status,
        visibility: values.visibility,
        postSeekerId: seeker.id,
      };

      if (values.routeMap) {
        input.postRouteMapId = values.routeMap.id;
      }
      if (!!values.video) {
        input.video = {
          key: video,
          bucket: s3Bucket,
          region: region,
        };
      }
      if (id) {
        input.id = id;
        dispatch(actions.updatePost(input)).then(() => {
          navigation.navigate(previousScreen, {
            forceUpdate: new Date().toLocaleString(),
          });
        });
      } else {
        dispatch(actions.createPost(input)).then(() => {
          navigation.navigate(previousScreen, {
            forceUpdate: new Date().toLocaleString(),
          });
        });
      }
    } catch (e) {
      setSubmitting(false);
      console.log(e);
    }
  };

  const VideoEditSchema = yup.object().shape({
    caption: yup.string(),
    video: yup.string().required('Video is required'),
    visibility: yup.string().required(),
    routeMap: yup.object().shape({
      id: yup.string(),
    }),
  });

  return (
    <View style={styles.container}>
      <Formik
        innerRef={refForm}
        enableReinitialize
        initialValues={postForEdit || initialValues}
        validationSchema={VideoEditSchema}
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
                  <ImagePicker
                    mediaType="video"
                    fieldTitle="Add a video"
                    hasError={touched.video && errors.video}
                    imageUrl={values.video}
                    setImageUrl={(imageUrl) => {
                      setFieldValue('video', imageUrl);
                    }}
                  />
                </View>
                <View style={styles.field}>
                  <MultilineTextInputField
                    caption="Why not add a caption?"
                    maxLength={800}
                    autoCorrect={false}
                    value={values.caption}
                    onChangeText={handleChange('caption')}
                    hasError={touched.caption && errors.caption}
                  />
                </View>
                <View style={styles.field}>
                  <LinkSelection
                    fieldTitle="Link an opportunity or collaboration"
                    onPress={() => Alert.alert('Coming soon...')}
                  />
                </View>
                <View style={styles.field}>
                  <MultiSelect
                    fieldTitle="Tag friends, collaborators or opportunity providers"
                    onPress={() => Alert.alert('Coming soon...')}
                  />
                </View>
                <View style={styles.field}>
                  <MultiSelect
                    fieldTitle="Route map (Optional)"
                    values={values.routeMap && values.routeMap.id}
                    text={values.routeMap && values.routeMap.destination}
                    onPress={() =>
                      navigation.navigate('SelectRouteMap', {
                        seekerId: seeker.id,
                        previousScreen: 'VideoEdit',
                      })
                    }
                  />
                </View>
                <View style={styles.field}>
                  <VisibilityChange
                    value={values.visibility}
                    setValue={(value) => setFieldValue('visibility', value)}
                  />
                </View>
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <SafeAreaView edges={['bottom']}>
                <Button
                  title={'Post Video'}
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
