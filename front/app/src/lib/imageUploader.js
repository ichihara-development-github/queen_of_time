import { stepButtonClasses } from '@mui/material';
import AWS from 'aws-sdk';


export const imageUploder = (image, key, sb) => {
   
    // aws setting
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
    })


    const bucket = new AWS.S3({
        params: {Bucket: process.env.REACT_APP_S3_BUCKET},
        region: process.env.REACT_APP_S3_BUCKET_REGION
    })

  
        const params = {
            Body: image,
            Bucket:  process.env.REACT_APP_S3_BUCKET,
            Key: key
        }
        
        // setUpload(true)
        
        bucket.putObject(params).promise()
        .then(function(data) {
            sb.setSnackBar({open: true, variant: "success", content: `プロフィール画像のアップロードに成功しました`})
            return 
          }).catch(function(err) {
            sb.setSnackBar({open: true, variant: "error", content: `プロフィール画像のアップロードに失敗しました`})
            console.log(err);
            return 
          });
}
    