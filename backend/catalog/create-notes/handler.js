
exports.lambdaHandler = async (event, context) => {
    console.log("Event:", event)
    console.log("Ctx:", context)
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
