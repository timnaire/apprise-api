const Parser = require('rss-parser');

exports.parser = new Parser({
    customFields: {
        item: ['media:thumbnail']
    }
});

exports.send = (body) => {
    const response = {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }

    return response;
}

exports.formatError = (error) => {
    const response = {
        "statusCode": error.statusCode,
        "headers": {
            "Content-Type": "text/plain",
            "x-amzn-ErrorType": error.code
        },
        "isBase64Encoded": false,
        "body": error.code + ": " + error.message
    }
    return response;
}
