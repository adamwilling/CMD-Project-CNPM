import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import notifiesSlice from './notifiesSlice'
import postsSlice from './postsSlice'
import employeesSlice from './employeesSlice'
import departmentsSlice from './departmentsSlice'
import devicesOfDepartmentsSlice from './devicesOfDepartmentsSlice'
import teamsSlice from './teamsSlice'
import rolesSlice from './rolesSlice'
import proposalsSlice from './proposalsSlice'
import proposalTypesSlice from './configs/proposalTypesSlice'
import approvalStepsSlice from './configs/approvalStepsSlice'
import tasksSlice from './tasksSlice'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        notifies: notifiesSlice.reducer,
        posts: postsSlice.reducer,
        employees: employeesSlice.reducer,
        departments: departmentsSlice.reducer,
        devicesOfDepartments: devicesOfDepartmentsSlice.reducer,
        teams: teamsSlice.reducer,
        roles: rolesSlice.reducer,
        tasks: tasksSlice.reducer,
        proposals: proposalsSlice.reducer,
        proposalTypes: proposalTypesSlice.reducer,
        approvalSteps: approvalStepsSlice.reducer
    }
})

export default store