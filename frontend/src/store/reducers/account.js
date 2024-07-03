const initialState = {
    token: document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1") ?? null,
    uid: null,
}

const account = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1"),
                uid: action.uid,
            }
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                uid: null,
            }
        default:
            return state
    }
}