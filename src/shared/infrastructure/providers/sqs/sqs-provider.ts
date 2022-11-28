import { DeleteMessageCommand, ReceiveMessageCommand, SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
const REGION = 'REGION'

export class SQSProvider {
    async sendMessage(queueURL: string, message: string) {
        const sqsClient = new SQSClient(process.env['CLOUD_REGION'])
        await sqsClient.send(new SendMessageCommand(this.getParams(queueURL, message)))
    }

    async receiveMessage(queueURL: string) {
        const sqsClient = new SQSClient({ region: REGION })
        const data = await sqsClient.send(new ReceiveMessageCommand(this.getParams(queueURL)))
        if (data.Messages) {
            const deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: data.Messages[0].ReceiptHandle,
            }
            try {
                const data = await sqsClient.send(new DeleteMessageCommand(deleteParams))
                console.log('Message deleted', data)
            } catch (err) {
                console.log('Error', err)
            }
        } else {
            console.log('No messages to delete')
        }
    }

    getParams(queueURL: string, message: string = null) {
        const params = {
            QueueUrl: queueURL,
            MessageBody: message,
        }
        return params
    }
}
