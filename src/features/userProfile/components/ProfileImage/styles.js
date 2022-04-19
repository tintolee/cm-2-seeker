import {StyleSheet} from 'react-native';
import {theme,width} from '../../../../components/Theme';

const styles = StyleSheet.create({
  title: {
    ...theme.typography.formFieldTitle,
    color: theme.colors.formFieldTitle,
    marginBottom: 9,
  },
  inputContainer: {
    
    overflow: 'hidden',
    height:170,
    width:170,
    borderColor:'#d9d9d9',
    borderWidth:2,
    bottom:20,
    borderRadius: 100,
    backgroundColor: theme.colors.white,
  
  },
  content: {
    flex: 1,
    position: 'absolute',
    padding: theme.spacing.sm,
    top:100,
    left: 110,
    right: 0,
    bottom: 0,
  },
  text: {
    ...theme.typography.formFieldText,
    color: theme.colors.formFieldText,
    flex: 1,
  },
  placeholder: {
    ...theme.typography.title6,
    color: theme.colors.formFieldPlaceholder,
    marginTop: theme.spacing.xs,
  },
  image: {
    height:170,
  },
  error: {
    ...theme.typography.regular,
    lineHeight: 16,
    color: theme.colors.formFieldError,
    marginTop: theme.spacing.s,
  },
});

export default styles;
