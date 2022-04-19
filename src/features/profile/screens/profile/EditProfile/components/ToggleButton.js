import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

function ToggleButton({value, setValue}) {
  const toggleSwitch = () => {
    setValue(value === false ? true : false);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: 'gray', true: '#f59532'}}
        thumbColor="white"
        ios_backgroundColor="gray"
        onValueChange={toggleSwitch}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.ssm,
    alignItems: 'flex-end',
  },
});

export default ToggleButton;
