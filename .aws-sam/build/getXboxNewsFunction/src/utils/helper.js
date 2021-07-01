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
