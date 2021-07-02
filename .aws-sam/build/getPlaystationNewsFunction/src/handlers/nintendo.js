const helper = require('../utils/helper');
exports.getNintendoNewsHandler = async (res, req) => {
    let news = [];
    try {
        const nintendoLifeFeeds = await helper.parser.parseURL('https://www.nintendolife.com/feeds/latest');
        const icon = "https://scontent-hkt1-2.xx.fbcdn.net/v/t1.18169-9/17022497_10154947691034651_8024955541971916607_n.png?_nc_cat=1&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFCz9ozMD4b2MEGwWVU9wRqpEj-11D2R9ykSP7XUPZH3Mt3_-4NRNDia0rbs2ASWpZ0qmN9w-pCa-r27WFmzu_3&_nc_ohc=sohwghSGWF4AX-Aj-zp&_nc_ht=scontent-hkt1-2.xx&oh=e60eb55e05a760f4994d2df747a0ac5c&oe=60CD468A";
        
        news = nintendoLifeFeeds.items.map(item => {
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
        console.log(`Err Nintendo: ${error}`);
        helper.formatError(error);
    }

    return helper.send(news);
}
