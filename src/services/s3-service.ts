import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { s3Repo } from '../user Repo/s3.repo';
import { UserRequest } from './s3-type';
import config from '../config';


const s3 = new S3Client({
    region: config.region,
    credentials: {
        accessKeyId: config.keyId,
        secretAccessKey: config.keySecret,
    }
});

export class S3Service {
    private s3_send = new s3Repo();    
    
    public async createUpload(file: Express.Multer.File, name:string,email:string): Promise<UserRequest|null>  {
        const fileName = Date.now().toString() + "_" + file.originalname;
        const params = {
            Bucket: "my-testing-monny",
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype // Use the actual MIME type
        };

        try {
            await s3.send(new PutObjectCommand(params));
            const fileUrl = `https://my-testing-monny.s3.amazonaws.com/${fileName}`;

            const userData: UserRequest = {
                name: name,
                email: email,  // assuming email is a required field in your schema. If not, add a check in the repo method.
                file: fileUrl
            };
            console.log(name);
            console.log(email);
            console.log(fileUrl);
            return this.s3_send.createUpload(userData);

            
            
        } catch (error) {
            console.error('Error uploading to S3:', error);
            throw new Error('Error uploading to S3.');
        }
    }
}
