import * as dynamoDb from './libs/dynamodb'
import { success, failure } from './libs/response'

export async function main(event, context, callback) {
	const params = {
		TableName: 'notes',
		KeyConditionExpression: 'userId = :userId',
		ExpressionAttributeValues: {
			':userId': event.requestContext.identity.cognitoIdentityId
		}
	}

	try {
		const result = await dynamoDb.call('query', params)
		callback(null, success(result.Item))
	} catch(e) {
		console.error(`GET ALL NOTES: ${e}`)
		callback(null, failure({ status: false }))
	}
}