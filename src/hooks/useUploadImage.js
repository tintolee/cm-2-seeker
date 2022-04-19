import {v4 as uuidv4} from 'uuid';
import {Storage} from 'aws-amplify';
import awsAppConfig from '../aws-exports';

export const s3Bucket = awsAppConfig.aws_user_files_s3_bucket;
export const region = awsAppConfig.aws_project_region;

export const uploadImage = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);

    const blob = await response.blob();

    const urlParts = imageUrl.split('.');
    const extension = urlParts[urlParts.length - 1];

    const key = `${uuidv4()}.${extension}`;

    await Storage.put(key, blob);

    // const imageKey = await Storage.get(key, {
    //   bucket: s3Bucket,
    //   region: region,
    // });

    // console.log(imageKey);

    return key;
  } catch (e) {
    console.log(e);
    return null;
  }
};
