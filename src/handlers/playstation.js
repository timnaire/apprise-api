const helper = require('../utils/helper');
exports.getPlaystationNewsHandler = async (res, req) => {
    let news = [];
    try {
        const playstationFeeds = await helper.parser.parseURL('https://blog.playstation.com/feed/');
        const icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/1200px-Playstation_logo_colour.svg.png";
        
        news = playstationFeeds.items.map(item => {
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
        console.log(`Err Playstation: ${error}`);
    }

    return helper.send(news);
}
