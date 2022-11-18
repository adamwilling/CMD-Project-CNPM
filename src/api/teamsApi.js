import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần đội nhóm
const baseUrl = "/teams"
const teamsApi = {
    getTeamList: (params) => {
        const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
        return axiosClient.get(requestUrl)
    },
    getTeamDetailById: (teamId) => {
        const requestUrl = `${baseUrl}/${teamId}`
        return axiosClient.get(requestUrl)
    },
    addTeam: (teamInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, teamInfo)
    },
    updateTeam: (teamInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, teamInfo)
    },
    deleteTeam: (teamId) => {
        const requestUrl = `${baseUrl}/delete/${teamId}`
        return axiosClient.delete(requestUrl)
    },
    getMemberList: () => {
        const requestUrl = `/employees/teams`
        return axiosClient.get(requestUrl)
    }
}
//

export default teamsApi