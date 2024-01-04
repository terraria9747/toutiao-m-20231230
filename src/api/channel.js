// 获取频道相关数据

import request from "@/utls/request";

// 获取所有频道数据
export const allchannel = () => {
	return request({
		method: "GET",
		url: "/v1_0/channels"
	})
}

// 添加频道
export const addUserChannel = channel => {
	return request({
		method: "PATCH",
		url: "/v1_0/user/channels",
		data: {
			channels: [channel]
		}
	})
}

// 删除
export const deleteUserChannel = channelId => {
	return request({
		method: "DELETE",
		url: `/v1_0/user/channels/${channelId}`,
	})
}

