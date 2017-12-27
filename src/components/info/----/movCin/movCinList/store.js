export const GET_MOVIE_BY_PAGE = "GET_MOVIE_BY_PAGE"
export const ASYNC_GET_MOVIE_BY_PAGE = "ASYNC_GET_MOVIE_BY_PAGE"
export const GET_CINEMA_BY_PAGE = "GET_CINEMA_BY_PAGE"
export const ASYNC_GET_CINEMA_BY_PAGE = "ASYNC_GET_CINEMA_BY_PAGE"
export const ASYNC_CANMATCH_MOVIE = "ASYNC_CANMATCH_MOVIE"
export const ASYNC_CANMATCH_CINEMA = "ASYNC_CANMATCH_CINEMA"
export const GET_SCRCIN_BY_PAGE = "GET_SCRCIN_BY_PAGE"
export const ASYNC_GET_SCRCIN_BY_PAGE = "ASYNC_GET_SCRCIN_BY_PAGE"
export const ASYNC_DEL_SCRCIN = "ASYNC_DEL_SCRCIN"

import axios from "axios"
export default {
	namespaced: true,
	state: {
		movies: {
			curpage: 1,
			eachpage: 5,
			maxpage: 0,
			rows: []
		},
		cinemas: {
			curpage: 1,
			eachpage: 5,
			maxpage: 0,
			rows: []
		},
		scrCins: {
			curpage: 1,
			eachpage: 5,
			maxpage: 0,
			rows: []
		}
	},
	mutations: {
		[GET_MOVIE_BY_PAGE](state, page) {
			state.movies = page
		},
		[GET_CINEMA_BY_PAGE](state, page) {
			state.cinemas = page
		},
		[GET_SCRCIN_BY_PAGE](state, page) {
			state.scrCins = page
		}
	},
	actions: {
		async [ASYNC_GET_MOVIE_BY_PAGE](context, {curpage = 1, eachpage = 5, searchObj} = {}) {
			const movObj = {
					page: curpage,
					rows: eachpage}
			for(let key in searchObj){
				movObj[key] = searchObj[key]
			}
			const {
				data
			} = await axios.get("http://localhost:3000/movie/find", {
				params: movObj
			})
			data.curpage = ~~data.curpage
			data.eachpage = ~~data.eachpage
			context.commit(GET_MOVIE_BY_PAGE, data)
		},
		async [ASYNC_GET_CINEMA_BY_PAGE](context, {curpage = 1, eachpage = 5, searchObj} = {}) {
			const cinObj = {
					page: curpage,
					rows: eachpage}
			for(let key in searchObj){
				cinObj[key] = searchObj[key]
			}
			const {
				data
			} = await axios.get("http://localhost:3000/cinema/find", {
				params: cinObj
			})
			data.curpage = ~~data.curpage
			data.eachpage = ~~data.eachpage
			context.commit(GET_CINEMA_BY_PAGE, data)
		},
		async [ASYNC_CANMATCH_MOVIE](context, { id, str } = {}) {
			const {
				data
			} = await axios.get("http://localhost:3000/movie/update", {
				params: {
					_id: id,
					canMatch: str
				}
			})
		},
		async [ASYNC_CANMATCH_CINEMA](context, { id, str } = {}) {
			const {
				data
			} = await axios.get("http://localhost:3000/cinema/update", {
				params: {
					_id: id,
					canMatch: str
				}
			})
		},
		async [ASYNC_GET_SCRCIN_BY_PAGE](context, {curpage = 1, eachpage = 5, searchObj} = {}) {
			const sCObj = {
					page: curpage,
					rows: eachpage}
			for(let key in searchObj){
				sCObj[key] = searchObj[key]
			}
			const {
				data
			} = await axios.get("http://localhost:3000/scrCin/find", {
				params: sCObj
			})
			data.curpage = ~~data.curpage
			data.eachpage = ~~data.eachpage
			context.commit(GET_SCRCIN_BY_PAGE, data)
		},
		async [ASYNC_DEL_SCRCIN](context, { id } = {}) {
			const {
				data
			} = await axios.get("http://localhost:3000/scrCin/del", {
				params: {
					_id: id
				}
			})
		}
	}
}