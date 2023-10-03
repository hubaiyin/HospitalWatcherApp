'use strict';
const uniPush = uniCloud.getPushManager({
	appId:'__UNI__99942BA'
})

exports.main = async (event, context) => {
	let obj = JSON.parse(event.body)
	return await uniPush.sendMessage({
		"push_clientid": obj.cids,
		"title": obj.title,
		"content": obj.content,
		"payload": obj.data,
		"force_notification": false,
		"request_id": obj.request_id
	})
};
