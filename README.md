# Serverless Note Application

CREATE Note:
`serverless invoke local --function create --path mocks/create-event.json`

GET Note:
`serverless invoke local --function get --path mocks/get-event.json`

GET All Notes:
`serverless invoke local --function list --path mocks/list-event.json`

UPDATE Note:
`serverless invoke local --function update --path mocks/update-event.json`

DELETE Note:
`serverless invoke local --function delete --path mocks/delete-event.json`

