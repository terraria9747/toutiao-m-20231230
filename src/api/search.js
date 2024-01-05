// 搜索的接口
import request from "@/utls/request";

// 搜索的联想建议
export const getSearchSuggestions = q => {
	return request({
		method: 'GET',
		url: '/v1_0/suggestion',
		params: {
			q
		}
	})
}

// 搜索结果
export const getSearchResult = params => {
	return request({
		method: 'GET',
		url: '/v1_0/search',
		params
	})
}

// 历史记录 -- 接口不可用
export const getSearchHistory = () => {
	return request({
		method: 'GET',
		url: "",
	})
}