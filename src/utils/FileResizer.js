import ImageResizer from 'react-native-image-resizer';

const resizeImage = (path, {maxWidth, maxHeight, compressFormat, quality}) => {
  return ImageResizer.createResizedImage(
    path,
    maxWidth,
    maxHeight,
    compressFormat,
    quality,
    0,
    undefined,
    false,
    {mode: 'contain', onlyScaleDown: false},
  );
};

export {resizeImage};
