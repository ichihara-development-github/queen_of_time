import AWS from 'aws-sdk';
import { sendProfile } from '../apis/config';
import { sendEmployeeParams } from '../apis/employees';


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

    try {
        const params = {
            Body: image,
            Bucket:  process.env.REACT_APP_S3_BUCKET,
            Key: key
        }
        
        // setUpload(true)
        bucket.putObject(params).promise()
        .then(res => {
            console.log(res.$response)
            if(res.$response.httpResponse.statusCode !== 200){
                sb.setSnackBar({open: true, variant:"error", content: "画像のアップロードに失敗しました。"})
                return 
            }
            sendProfile({image_url: key})
            sb.setSnackBar({open: true, variant:"success", content: "画像のアップロードが正常に行われました。"})
        })
        }
        catch(e){ throw e}
    }