import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 77,
    width: 343,
    backgroundColor: '#fff1e0',
    marginHorizontal: 20,
    padding: 20,
    justifyContent: 'space-around',
    borderRadius: 8,
  },

  adImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  advertTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  advertDescription: {
    fontSize: 12,
    paddingLeft: 70,
  },

  imageBack: {
    backgroundColor: '#fff',
    width: 60,
    height: 50,
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default styles;
