const helper = require('../utils/helper');
exports.getPcGamesNewsHandler = async (res, req) => {
    let news = [];
    try {
        const gematsu = await helper.parser.parseURL('https://www.gematsu.com/feed');
        const icon = "https://pbs.twimg.com/profile_images/1049863356645949440/_fFarJOr_400x400.jpg";
        const thumbnail = "https://pbs.twimg.com/profile_banners/28810538/1567263076/1500x500";
        news = gematsu.items.map(item => {
            return {
                categories: item.categories,
                icon: icon,
                thumbnail: item['media:thumbnail'] ? item['media:thumbnail']['$']['url'] : thumbnail,
                id: item.guid,
                url: item.link,
                title: item.title,
                content: item.contentSnippet
            }
        });

    } catch (error) {
        console.log(`Err Nintendo: ${error}`);
        helper.formatError(error);
    }

    return helper.send(news);
}
