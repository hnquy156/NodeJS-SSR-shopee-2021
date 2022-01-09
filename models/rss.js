const util = require('util');

const Parser = require('rss-parser');

const parser = new Parser();
const NotifyConfig = require(__path_configs + 'notify');
const rssModels = require(__path_schemas + 'rss');
const rssArticlesModels = require(__path_schemas + 'rssArticles');

module.exports = {
    getList: (condition, options) => {
        return rssModels
            .find(condition)
            .sort(options.sort)
            .skip(options.skip)
            .limit(options.limit);
    },

    getListFrontend: (options) => {
        const condition = {status: 'active'};
        let select = 'name ordering rss_link';
        let sort = {'ordering': 'asc'};
        let skip = null;
        let limit = null;

        if (options.task === 'rss-list') {
            return rssModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
        }
    },

    getListRssItem: (params = null, options = null) => {
        const condition = {};
        let select = null;
        let sort = '-pubDate';
        let skip = null;
        let limit = 15;

        if (params && params.categoryID) condition.categoryID = params.categoryID;
        console.log(condition)

        return rssArticlesModels.find(condition).select(select).sort(sort).skip(skip).limit(limit);
    },

    getItem: (id, options = null) => {
        return rssModels.findById({_id: id});
    },

    countItems: (condition) => {
        return rssModels.countDocuments(condition);
    },

    changeStatus: async (id, currentStatus, options) => {
	    const status		= currentStatus === 'active' ? 'inactive' : 'active';
        const data = {
            status,
            modified: {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            },
        }

        if (options.task === 'change-status-one') {
            await rssModels.updateOne({_id: id}, data);
            return {id, status, notify: NotifyConfig.CHANGE_STATUS_SUCCESS};
        }
        if (options.task === 'change-status-multi') {
            data.status = currentStatus;
            return rssModels.updateMany({_id: { $in: id}}, data);
        }
    },

    changeOrdering: async (id, ordering, options) => {
        const data = {
            ordering: +ordering,
            modified: {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            },
        }
        if (options.task === 'change-ordering-one') {
            await rssModels.updateOne({_id: id}, data);
            return {id, ordering: +ordering, notify: NotifyConfig.CHANGE_ORDERING_SUCCESS}
        }
        if (options.task === 'change-ordering-multi') {
            const promiseOrdering = id.map((ID, index) => {
                data.ordering = +ordering[index]
                return rssModels.updateOne({_id: ID}, data);
            });
            return await Promise.all(promiseOrdering);
        }
    },

    deleteItem: (id, options) => {
        if (options.task === 'delete-one')
            return rssModels.deleteOne({_id: id});
        if (options.task === 'delete-multi')
            return rssModels.deleteMany({_id: { $in: id}});
    },

    saveItem: (item, options) => {
        
        if (options.task === 'add') {
            item.created = {
                user_id: '',
                user_name: 'user',
                time: Date.now(),
            }
            return rssModels(item).save();

        }
        if (options.task === 'edit') {
            item.modified = {
                user_id: '',
                user_name: 'Admin',
                time: Date.now(),
            }
            return rssModels.updateOne({_id: item.id}, item);
        }
    },

    saveArticleRss: async (id = null, options = null) => {
        const rssCategoryItem = await rssModels.findById({_id: id});
        const rssItem = await rssArticlesModels.find({categoryID: id}).sort({pubDate:-1}).limit(1);
        const lastTime = rssItem.length > 0 ? rssItem[0].pubDate : 0;

        let feed = await parser.parseURL(rssCategoryItem.rss_link);
        let rssArticles = [];
        for(let i = 1; i <= 15; i++) {
            let item = feed.items[i];
            if (lastTime > Date.parse(item.pubDate) - 10) continue;
            
            let myImage = item.content.match(/src\s*=\s*"(.+?)"/i);
            let myContent = item.content.match('.*br>(.*)');

            item.image = myImage ? myImage[1] : '';
            item.content = myContent[1];
            item.categoryID = id;
            item.pubDate = Date.parse(item.pubDate);
            rssArticles.push(item);
        }
        await rssArticlesModels.create(rssArticles);
        return {notify: NotifyConfig.LOAD_RSS_SUCCESS};
    },
}