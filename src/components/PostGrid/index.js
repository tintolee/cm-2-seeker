import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {ShapePencil, ShapePlay} from '../svg/icons';
import ImageS3 from '../Image/ImageS3';
import styles from './styles';

export default function PostGrid({onPress, post}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.5}>
      {post.type === 'BLOG' ? (
        <View style={styles.content}>
          <View style={styles.icon}>
            <ShapePencil width={14} height={14} color={'#fff'} />
          </View>
          <Text style={styles.title}>{post.blog.blogTitle}</Text>
        </View>
      ) : post.type === 'VIDEO' ? (
        <View style={styles.content}>
          <View style={styles.icon}>
            <ShapePlay width={14} height={14} color={'#fff'} />
          </View>
          <Text style={styles.title}>Video</Text>
        </View>
      ) : post.type === 'PHOTO' && post.photo.length == !0 ? (
        <ImageS3
          imageObj={post.photo[0]}
          style={{height: '100%', width: '100%'}}
        />
      ) : post.type === 'MILESTONE' ? (
        <View
          style={[styles.content, {borderWidth: 3, borderColor: '#de5420'}]}>
          {post?.photo?.length == !0 || post.photo ? (
            <View style={[styles.image]}>
              <ImageS3
                imageObj={
                  post?.photo?.length == !0 ? post?.photo[0] : post?.photo
                }
                style={[styles.image]}
              />
              <View style={styles.layer}>
                <Text style={styles.title}>{post.milestone.title}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.absoluteContent}>
              <Text style={styles.title}>{post.milestone.title}</Text>
            </View>
          )}
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
