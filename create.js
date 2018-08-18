import uuid from 'uuid'
import * as dynamoDb from './libs/dynamodb'
import { success, failure } from './libs/response'

export async function main(event, context, callback) {
	const data = JSON.parse(event.body)

	const params = {
		TableName: 'notes',
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: uuid.v1(),
			content: data.content,
			attachment: data.attachment,
			createdAt: Date.now()
		}
	}

	try {
		await dynamoDb.call('put', params)
		callback(null, success(params.Item))
	} catch(e) {
		console.error(`CREATE NOTE: ${e}`)
		callback(null, failure({ status: false }))
	}
}