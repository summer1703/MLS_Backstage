export const GET_MOVIE_BY_PAGE = "GET_MOVIE_BY_PAGE"
export const ASYNC_GET_MOVIE_BY_PAGE = "ASYNC_GET_MOVIE_BY_PAGE"

export const GET_CINEMA_BY_PAGE = "GET_CINEMA_BY_PAGE"
export const ASYNC_GET_CINEMA_BY_PAGE = "ASYNC_GET_CINEMA_BY_PAGE"

export const GET_SCRROOM_BY_PAGE = "GET_SCRROOM_BY_PAGE"
export const ASYNC_GET_SCRROOM_BY_PAGE = "ASYNC_GET_SCRROOM_BY_PAGE"
export const ASYNC_ADD_SCRCIN = "ASYNC_ADD_SCRCIN"

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
		scrRooms: []
	},
	mutations: {
		[GET_MOVIE_BY_PAGE](state, page) {
			state.movies = page
		},
		[GET_CINEMA_BY_PAGE](state, page) {
			state.cinemas = page
		},
		[GET_SCRROOM_BY_PAGE](state, page) {
			state.scrRooms = page
		}
	},
	actions: {
		async [ASYNC_GET_MOVIE_BY_PAGE](context, {curpage = 1, eachpage = 5, movieName = ''} = {}) {
			const {
				data
			} = await axios.get("http://localhost:3000/movie/find", {
				params: {
					page: curpage,
					rows: eachpage,
					movieName,
					canMatch: 'true'
				}
			})
			data.curpage = ~~data.curpage
			data.eachpage = ~~data.eachpage
			context.commit(GET_MOVIE_BY_PAGE, data)
		},
		async [ASYNC_GET_CINEMA_BY_PAGE](context, {curpage = 1, eachpage = 5, cinema = ''} = {}) {
			const {
				data
			} = await axios.get("http://localhost:3000/cinema/find", {
				params: {
					page: curpage,
					rows: eachpage,
					cinema,
					canMatch: 'true'
				}
			})
			data.curpage = ~~data.curpage
			data.eachpage = ~~data.eachpage
			context.commit(GET_CINEMA_BY_PAGE, data)
		},
		async [ASYNC_GET_SCRROOM_BY_PAGE](context, { cinId = '' } = {}) {
			console.log(cinId)
			const {
				data
			} = await axios.get("http://localhost:3000/scrRoom/find", {
				params: {
					cinId: cinId,
					findType: 'exact'
				}
			})
			context.commit(GET_SCRROOM_BY_PAGE, data)
		},
		async [ASYNC_ADD_SCRCIN](context, { obj } = {}) {
			console.log(obj)
			const {
				data
			} = await axios.get("http://localhost:3000/scrCin/add", {
				params: obj
			})
		}
	}
}