import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, Platform, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {LineCalendar} from '../../svg/icons';
import {theme} from '../../../components/Theme';
import styles from './styles';

export default function DatePickerInputField({
  fieldTitle,
  placeholder,
  iconColor = theme.colors.primary,
  hasError,
  // value,
  onChange,
}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const handleOnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onChange(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <>
      <Text style={styles.title}>{fieldTitle}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.inputContainer}
        onPress={showDatepicker}>
        <LineCalendar height={24} width={24} color={iconColor} />
        {/* <Text
          style={[
            styles.input,
            !date && {color: theme.colors.formFieldPlaceholder},
          ]}>
          {placeholder ? placeholder : 'None selected'}
        </Text> */}
        {show ? (
          <View style={styles.input}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={handleOnChange}
            />
          </View>
        ) : (
          <Text
            style={[
              styles.input,
              !date && {color: theme.colors.formFieldPlaceholder},
            ]}>
            {placeholder ? placeholder : 'None selected'}
          </Text>
        )}
      </TouchableOpacity>
      {hasError && <Text style={styles.error}>{hasError}</Text>}
    </>
  );
}
