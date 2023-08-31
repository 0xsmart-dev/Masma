import S3 from 'aws-sdk/clients/s3'
export default async function handler(req, res) {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: 'us-east-1'
  })

  const preSignedUrl = await s3.getSignedUrl('putObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.query.file,
    ContentType: req.query.fileType,
    Expires: 5 * 60
  })
  res.status(200).json({
    url: preSignedUrl
  })
}
