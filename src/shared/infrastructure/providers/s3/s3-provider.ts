import { S3 } from 'aws-sdk'
import { S3Config } from './s3-config'

export class S3Provider {
    private client: S3
    constructor(config: S3Config) {
        this.client = new S3({
            region: config.region,
        })
    }
}
