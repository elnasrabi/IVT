import { combineReducers } from 'redux'
import userReducer from './usersReducer'
import exceptionReducer from './exceptionsReducer'

export default combineReducers({
  
  exceptions:exceptionReducer,
  users: userReducer,
})