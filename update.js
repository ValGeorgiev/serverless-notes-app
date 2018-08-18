import * as dynamoDb from './libs/dynamodb'
import { success, failure } from './libs/response'

export async function main(event, context, callback) {
	const data = JSON.parse(event.body)
	const params = {
		TableName: 'notes',
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id
		},
		UpdateExpression: 'SET content = :content, attachment = :attachment',
		ExpressionAttributeValues: {
			':attachment': data.attachment || null,
			':content': data.content || null
		},
		ReturnValues: 'ALL_NEW'
	}

	try {
		const result = await dynamoDb.call('update', params)
		callback(null, success({ status: true }))
	} catch(e) {
		console.error(`UPDATE NOTE: ${e}`)
		callback(null, failure({ status: false }))
	}
}