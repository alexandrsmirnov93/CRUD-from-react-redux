import { combineReducers } from 'redux'
import employees from'./employees'

const rootReducers = combineReducers({
	employees: employees

})
export default rootReducers