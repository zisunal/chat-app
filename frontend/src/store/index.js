import { configureStore } from '@reduxjs/toolkit';
import account from './reducers/account'
import settings from './reducers/settings';

const store = configureStore({
    reducer: {
        account,
        settings,
    }
})

export default store
