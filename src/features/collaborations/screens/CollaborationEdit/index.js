import React, {useEffect, useState, useRef} from 'react';
import {View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import {Formik} from 'formik';
import * as yup from 'yup';
import {s3Bucket, region, uploadImage} from '../../../../hooks/useUploadImage';
import {resizeImage} from '../../../../utils/FileResizer';
import {
  LinkSelection,
  MultiSelect,
  Button,
  TextInput,
  DatePickerInput,
  ImagePicker,
  MultilineTextInputField,
} from '../../../../components/form';
import {theme} from '../../../../components/Theme';
import SuccessCreatedModal from './components/SuccessCreatedModal';
import styles from './styles';
import * as messagingActions from '../../../messaging/_redux/actions';


const initialValues = {
  id: undefined,
  title: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
  caption: '',
  capacity: 0,
  status: 1,
  cover: undefined,
  coverThumb: undefined,
  inviteOnly: false,
  invitedConnections: [],
};

export default function CollaborationEdit({route}) {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [collaborationForEdit, setCollaborationForEdit] = useState(undefined);

  const id = route.params?.id;
  const previousScreen = route.params?.previousScreen;

  const navigation = useNavigation();
  const refForm = useRef();

  const dispatch = useDispatch();
  const {collaborationDetail, user} = useSelector(
    (state) => ({
      collaborationDetail: state.collaborationsReducer.collaborationDetail,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (collaborationDetail && id) {
      navigation.setOptions({
        title: 'Edit Collaboration',
      });

      setCollaborationForEdit({
        id: collaborationDetail.id,
        title: collaborationDetail.title,
        startDate: collaborationDetail.startDate,
        endDate: collaborationDetail.endDate,
        description: collaborationDetail.description,
        caption: collaborationDetail.caption,
        capacity: collaborationDetail.capacity,
        status: collaborationDetail.status,
        inviteOnly: collaborationDetail.inviteOnly,
        cover: collaborationDetail.cover,
      });
    }
  }, [collaborationDetail, id]);

  useEffect(() => {
    if (refForm.current) {
      const invitedConnections = route.params?.invitedConnections;
      if (invitedConnections) {
        refForm.current.setFieldValue('invitedConnections', invitedConnections);
      }
    }
  }, [route.params]);

  const toggleSuccessModal = () => {
    setSuccessModalVisible(!successModalVisible);
  };

  const handleOnSubmit = async (values, {setStatus, setSubmitting}) => {
    try {
      let image;
      if (!!values.cover) {
        image = await uploadImage(values.cover);
      }

      const input = {
        title: values.title,
        location: values.location,
        startDate: values.startDate,
        endDate: values.endDate,
        description: values.description,
        caption: values.caption,
        capacity: values.capacity,
        status: values.status,
        inviteOnly: values.inviteOnly,
        collaborationOwnerId: user.id,
      };

      if (!!values.cover) {
        input.cover = {
          key: image,
          bucket: s3Bucket,
          region: region,
        };
      }

      if (id) {
        input.id = id;
        dispatch(actions.updateCollaboration(input)).then(() => {
          navigation.navigate(previousScreen, {
            forceUpdate: new Date().toLocaleString(),
          });
        });
      } else {
        dispatch(
          actions.createCollaboration(input, (collaboration) => {
            if (values.invitedConnections.length > 0 && collaboration) {
              values.invitedConnections.map((value) => {
                const inputMember = {
                  status: 2, //INVITED
                  comment: '',
                  collaborationId: collaboration.id,
                  seekerId: value.id,
                };
                actions
                  .createCollaborationMember(inputMember)
                  .then(() => {})
                  .catch((error) => {
                    setSubmitting(false);
                    console.log(error);
                  });
              });

              var input = {
                type: 'GROUP',
                title: collaboration.title,
                groupId: collaboration.id,
                avatar: JSON.stringify(collaboration.cover),
                createdAt: new Date(),
                updatedAt: new Date(),
              };
              messagingActions.createConversation(input).then(()=>{

              }) .catch((error) => {
              
              });

            }
            toggleSuccessModal();
          }),
        );
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

  const CollaborationEditSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    caption: yup.string(),
    location: yup.string().required('Location is required'),
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string().required('End date is required'),
    cover: yup.string().required('Cover Photo is required'),
    inviteOnly: yup.string(),
    capacity: yup.number(),
    invitedConnections: yup.array().of(yup.object()),
  });

  return (
    <View style={styles.container}>
      <Formik
        innerRef={refForm}
        enableReinitialize
        initialValues={collaborationForEdit || initialValues}
        validationSchema={CollaborationEditSchema}
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
                  <TextInput
                    fieldTitle="Collaboration title"
                    value={values.title}
                    autoCorrect={false}
                    onChangeText={handleChange('title')}
                    hasError={touched.title && errors.title}
                  />
                </View>
                <View style={styles.field}>
                  <ImagePicker
                    fieldTitle="Add a cover photo"
                    hasError={touched.cover && errors.cover}
                    imageUrl={values.cover}
                    setImageUrl={(imageUrl) => {
                      onPhotoPickChange(imageUrl, 'cover', setFieldValue);
                      onPhotoPickChange(imageUrl, 'coverThumb', setFieldValue);
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
                  <MultilineTextInputField
                    caption="Collaboration description"
                    maxLength={800}
                    autoCorrect={false}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    hasError={touched.description && errors.description}
                  />
                </View>
                <View style={styles.field}>
                  <DatePickerInput
                    fieldTitle="Start Date"
                    placeholder="Select a date"
                    value={values.startDate}
                    onChange={(startDate) =>
                      setFieldValue('startDate', startDate)
                    }
                    hasError={touched.startDate && errors.startDate}
                  />
                </View>
                <View style={styles.field}>
                  <DatePickerInput
                    fieldTitle="End Date (optional)"
                    placeholder="Select a date"
                    iconColor={theme.colors.grayIcon}
                    value={values.endDate}
                    onChange={(endDate) => setFieldValue('endDate', endDate)}
                    hasError={touched.endDate && errors.endDate}
                  />
                </View>
                <View style={styles.field}>
                  <TextInput
                    fieldTitle="Place"
                    icon="pin"
                    placeholder="Enter place"
                    iconColor={theme.colors.grayIcon}
                    value={values.location}
                    onChangeText={handleChange('location')}
                    hasError={touched.location && errors.location}
                  />
                </View>
                <View style={styles.field}>
                  <TextInput
                    fieldTitle="Number of people wanted"
                    icon="people"
                    placeholder="Enter number of people"
                    value={values.capacity}
                    onChangeText={handleChange('capacity')}
                    hasError={touched.capacity && errors.capacity}
                  />
                </View>
                <View style={styles.field}>
                  <LinkSelection fieldTitle="Open to" />
                </View>
                <View style={styles.field}>
                  <MultiSelect
                    fieldTitle="Invite connections"
                    icon="personAdd"
                    iconColor={theme.colors.grayIcon}
                    text={values.invitedConnections.map((c) => c.firstName)}
                    values={values.invitedConnections}
                    hasError={
                      touched.invitedConnections && errors.invitedConnections
                    }
                    multi
                    onPress={() =>
                      navigation.navigate('InviteConnection', {
                        invitedConnections: values.invitedConnections,
                      })
                    }
                  />
                </View>
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <SafeAreaView edges={['bottom']}>
                <Button
                  title={'Create Collaboration'}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />
              </SafeAreaView>
            </View>
          </>
        )}
      </Formik>
      <SuccessCreatedModal
        visible={successModalVisible}
        toggleModal={toggleSuccessModal}
      />
    </View>
  );
}
