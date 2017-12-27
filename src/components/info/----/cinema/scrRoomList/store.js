export const COMPLETED_TODO = 'COMPLETED_TODO';

export default {
	namespaced: true,
	state: {
		page: {
			page: 1,
			eachpage: 10
			maxpage: 1,
			total: 1,
			rows: []
		}
	},
	mutations: {
		[GET_MOVIE_DATA](state, page)
	},
	actions: {
		async [GET_MOVIE_DATA](conext, {page = 1, eachpage = 10 } = {}) {
			const {data} = await axios.get('http://localhost:7580/cinema/find',{
				params: {
					page: page,
					rows: eachpage
				}
			})
			state.page = data;
			console.log(state)
		}
	}
}