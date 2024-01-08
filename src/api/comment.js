import request from "@/utls/request";

// 获取文章评论
export const getcomments = params => {
	return request({
		method: "GET",
		url: "/v1_0/comments",
		params
	})
}

// 文章评论点赞
export const addCommentLike = target => {
	return request({
		method: "POST",
		url: "/v1_0/comment/likings",
		data: {
			target
		}
	})
}

// 文章评论取消点赞
export const deleteCommentLike = target => {
	return request({
		method: "DELETE",
		url: `/v1_0/comment/likings/${target}`,
	})
}

// 文章评论
export const postComment = data => {
	return request({
		method: "POST",
		url: `/v1_0/comments`,
		data
	})
}


