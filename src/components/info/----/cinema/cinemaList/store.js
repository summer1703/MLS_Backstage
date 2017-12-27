 export const GET_EMP_BY_PAGE = "GET_EMP_BY_PAGE"
 export const ASYNC_GET_EMP_BY_PAGE = "ASYNC_GET_EMP_BY_PAGE"
 export const ASYNC_DEL_EMP_BY_PAGE = "ASYNC_DEL_EMP_BY_PAGE"
 export const USER_NAME = "USER_NAME"
 export const USER_NAME_UPDATE = "USER_NAME_UPDATE"
 export const SEARCH = "SEARCH"
 import axios from "axios"

 export default {
    namespaced: true,
    state: {
        hotM: {
            curpage: 1,
            eachpage: 5,
            maxPage: 0,
            total: 0,
            rows: []
        }
    },
    mutations: {
        [GET_EMP_BY_PAGE](state, page) {
            state.hotM = page
            console.log(state.hotM)
        }
    },
    actions: {
        async [ASYNC_GET_EMP_BY_PAGE](context, {
            page = 1,
            rows = 10
        } = {}) {
            const {
                data
            } = await axios.get("http://localhost:3000/cinema/find", {
                params: {
                    page,
                    rows
                }
            })
             //             console.log(context)
            console.log(data)
            context.commit(GET_EMP_BY_PAGE, data)
        },
        async [ASYNC_DEL_EMP_BY_PAGE](context, _id) {
            //             console.log(_id)
            const {
                delData
            } = await axios.get("http://localhost:3000/cinema/del", {
                params: {
                    _id: _id,
                }
            })

            console.log(delData)
            //             console.log(data)
            //         context.commit(GET_EMP_BY_PAGE, data)
        },
        async [USER_NAME](context, cinema) {
            const {
                data
            } = await axios.get("http://localhost:3000/cinema/add", {
                params: {
                    "cinema": cinema.cinema,
                    "add": cinema.add,
                    "tel": cinema.tel,
                    "url": cinema.url
                }
            })
            console.log(data)
        },
        async [USER_NAME_UPDATE](context, cinema) {
            const {
                data
            } = await axios.get("http://localhost:3000/cinema/update", {
                params: {
                    "_id": cinema._id,
                    "cinema": cinema.cinema,
                    "add": cinema.add,
                    "tel": cinema.tel,
                    "url": cinema.url
                }
            })
        },
        async [SEARCH](context, searchData) {
            const {
                data
            } = await axios.get("http://localhost:3000/cinema/find", {
                params: {
                    "cinema": searchData.cinema,
                    "add": searchData.add,
                    "tel": searchData.tel,
                }
            })
            context.state.hotM.rows = data
        }
    }
}
