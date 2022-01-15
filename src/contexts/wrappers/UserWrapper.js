import React, { useReducer, createContext, useContext} from 'react'
import userReducer from '../reducers/user-reducer'
import { setUser } from '../actions'

export const UserContext = createContext()
const UserProvider = UseContext.Provider

export function UserWrapper({ children }) {
    const defaultUser = { username: 'Guest'}
    const [user, dispatchUser] = useReducer(userReducer, defaultUser);

    return (
        <UserProvider value={{ user, dispatchUser, defaultUser}}>
            {children}
        </UserProvider>
    )

}
