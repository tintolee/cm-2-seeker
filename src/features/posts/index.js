import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BlogEdit from './screens/BlogEdit';
import PhotoEdit from './screens/PhotoEdit';

const PostsStack = createStackNavigator();

export const PostsStackNavigator = () => {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen name="BlogEdit" component={BlogEdit} />
      <PostsStack.Screen name="PhotoEdit" component={PhotoEdit} />
    </PostsStack.Navigator>
  );
};
