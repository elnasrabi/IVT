import { combineReducers } from 'redux'
import userReducer from './usersReducer'
import exceptionReducer from './exceptionsReducer'

const rootReducer= combineReducers({
  
  exceptions:exceptionReducer,
  users: userReducer,
})

export default rootReducer;