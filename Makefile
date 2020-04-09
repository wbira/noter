deploy:
	sam deploy --template-file ./template.yaml --stack-name NOTER --capabilities CAPABILITY_NAMED_IAM

run-create-note:
	sam local invoke -e backend/catalog/events/event.json -t ./template.yaml CreateNotesFunction

run-fetch-note:
	sam local invoke -e backend/catalog/events/event.json -t ./template.yaml FetchNotesFunction
