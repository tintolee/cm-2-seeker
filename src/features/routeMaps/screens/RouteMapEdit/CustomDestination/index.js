import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Button, MultilineTextInputField, TextInput} from '../../../../../components/form';
import styles from './styles';

export default function CustomDestination() {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const navigation = useNavigation();

  const submitOnPress = () => {
    setSubmitting(true);
    setError(false);

    if (text === '') {
      setError(true);
      setSubmitting(false);
      return null;
    }

    navigation.navigate('RouteMapsEdit', {destination: text});
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Custom destination</Text>
        <View style={styles.field}>
          <TextInput
            fieldTitle="What do you want to achieve?"
            value={text}
            autoCorrect={false}
            onChangeText={setText}
            hasError={error && 'Custon destination is required'}
          />
          {/* <MultilineTextInputField
            caption="What do you want to achieve?"
            maxLength={30}
            value={text}
            onChangeText={setText}
            hasError={error && 'Custon destination is required'}
          /> */}
        </View>
      </View>
      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']}>
          <Button
            title={'Done'}
            onPress={() => submitOnPress()}
            disabled={isSubmitting}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
