const helper = require('../utils/helper');
exports.getXboxNewsHandler = async (res, req) => {
    let news = [];
    try {
        const xboxFeeds = await helper.parser.parseURL('https://news.xbox.com/en-us/feed/');
        const icon = "https://play-lh.googleusercontent.com/M6mi-W7n__Fv9Y8ml4-2IoTzJJ8m6zKy2X7SsMdiPHUKinTdQ8ILgjbF-zB7REAtRxY";
        
        news = xboxFeeds.items.map(item => {
            return {
                id: item.guid,
                icon: icon,
                thumbnail: item['media:thumbnail'] ? item['media:thumbnail']['$']['url'] : null,
                url: item.link,
                title: item.title,
                content: item.contentSnippet
            }
        });

    } catch (error) {
        console.log(`Err Xbox: ${error}`);
    }

    return helper.send(news);
}
