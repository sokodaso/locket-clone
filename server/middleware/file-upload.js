const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
//const {fromSSO} = require('@aws-sdk/credential-provider-sso');
const multerS3 = require('multer-s3');
const multer = require('multer');
const s3 = new S3Client({region: process.env.AWS_BUCKET_REGION, credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}});

const fileUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
        }
    }
});

const deleteFile = async (imageUrl) => {
    if(!imageUrl)
        return;

    const key = imageUrl.split('/').pop();

    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    }

    try{
        await s3.send(new DeleteObjectCommand(deleteParams));
        console.log(`Successfully delete object from S3 bucket`);
    }catch(err){
        console.error('Failed to delete object from S3', err);
    }

}

exports.fileUpload = fileUpload;
exports.deleteFile = deleteFile;
