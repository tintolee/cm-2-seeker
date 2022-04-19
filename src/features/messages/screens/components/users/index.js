import React from 'react';
import {Image} from 'react-native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Item from '../../../../../components/Search/Accounts/Item';
import {theme} from '../../../../../components/Theme';

export default function index({users, navigation}) {
  return (
    <View>
      <ScrollView
        horizontal
        style={{marginTop: 20}}
        showsHorizontalScrollIndicator={false}>
        {users.map((user, key) => {
          if (user.type != 'add') {
            return (
              <View key={key} style={styles.userContainer}>
                <View style={styles.image}>
                  <Image
                    source={{uri: user.image}}
                    style={{flex: 1, borderRadius: 100}}
                  />
                  <View
                    style={[
                      styles.status,
                      {
                        backgroundColor:
                          user.status == '1'
                            ? theme.colors.green
                            : theme.colors.grayIcon,
                      },
                    ]}
                  />
                </View>
                <View style={{}}>
                  <Text style={styles.text}>{user.firstName}</Text>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    marginBottom: 5,
  },
  userContainer: {
    alignItems: 'center',
    marginHorizontal: 3,
    width: 75,
  },
  status: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: theme.colors.background,
    borderRadius: 100,
    position: 'absolute',
    bottom: 3,
    right: 3,
  },
  text: {
    ...theme.typography.title8,
    color: theme.colors.selectionItem,
    textAlign: 'center',
    // fontFamily: "SFProDisplay-Semibold"
  },
});
