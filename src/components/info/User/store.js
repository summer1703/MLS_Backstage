export const GET_USER_BY_PAGE = "GET_USER_BY_PAGE"
export const ASYNC_GET_USER_BY_PAGE = "ASYNC_GET_USER_BY_PAGE"
export const ASYNC_DEL_USER = "ASYNC_DEL_USER"
export const ASYNC_UPDATE_USER = "ASYNC_UPDATE_USER"

import axios from "../../../lib"
export default {
	namespaced: true,
	state: {
		user: {
			curpage: 1,
			pagesize: 5,
			maxpage: 0,
			rows: []
		}
	},
	mutations: {
		[GET_USER_BY_PAGE](state, page) {
			state.user = page
		}
	},
	actions: {
		async [ASYNC_GET_USER_BY_PAGE](context, {curpage = 1, pagesize = 5, type, value} = {}) {
			const userObj = {
					curpage,
					pagesize,
					type,
					value
				}
			const { data } = await axios.get("/users/list", {
				params: userObj
			})
			data.curpage = +data.curpage;
			data.pagesize = +data.pagesize;
			context.commit(GET_USER_BY_PAGE, data);
		},
		async [ASYNC_DEL_USER](context, { ids, callback } = {}) {
			const { data } = await axios.get("/users/delete", {
				params: {
					ids
				}
			});
			callback();
		},
		async [ASYNC_UPDATE_USER](context, { obj, callback } = {}) {
			const { data } = await axios.post("/users/update", obj);
			callback(data);
		}
	}
}