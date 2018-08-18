import * as dynamoDb from './libs/dynamodb'
import { success, failure } from './libs/response'

export async function main(event, context, callback) {

	const params = {
		TableName: 'notes',
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id
		}
	}

	try {
		const result = await dynamoDb.call('delete', params)
		callback(null, success({ status: true }))
	} catch(e) {
		console.log(`DELETE NOTE: ${e}`)
		callback(null, failure({ status: false }))
	}
}