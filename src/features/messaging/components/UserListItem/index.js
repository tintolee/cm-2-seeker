import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageS3 from '../../../../components/Image/ImageS3/index'
import styles from './styles';
import { theme } from '../../../../components/Theme';
export default function UserListItem({
    friend: item,
    id: friendshipId,
    handleOnPress,
}) {
    const navigation = useNavigation();



    return (

        <TouchableOpacity style={styles.userContainer} onPress={()=>handleOnPress(item)}>
            <View style={styles.avatarContainer}>
                {item.profilePic && (
                    <ImageS3 imageObj={item.profilePic} style={styles.logo} />
                )}

                {/* <View
                    style={[
                        styles.status,
                        {
                            backgroundColor:
                                item.status == '1'
                                    ? theme.colors.green
                                    : theme.colors.grayIcon,
                        },
                    ]}
                /> */}
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.text} numberOfLines={1}>{item.firstName}</Text>
                <Text style={styles.text} numberOfLines={1}>{item.lastName}</Text>
            </View>
        </TouchableOpacity>
      
    );
}
