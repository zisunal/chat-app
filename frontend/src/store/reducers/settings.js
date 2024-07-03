const initialState = {
    theme: localStorage.getItem('theme') ?? 'light',
    apiUrl: 'http://localhost:5000/api/',
    primaryColor: '#007bff',
    accentColor: '#6c757d'
}

const settings = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            localStorage.setItem('theme', action.theme == 'light' ? 'dark' : 'light')
            return {
                ...state,
                theme: action.theme == 'light' ? 'dark' : 'light',
            }
        default:
            return state
    }
}

export default settings