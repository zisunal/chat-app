import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from './partials/Login';
import Register from './partials/Register';

export default function Auth() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Login/>} />
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/log-in' element={<Login/>} />
                <Route exact path='/signin' element={<Login/>} />
                <Route exact path='/sign-in' element={<Login/>} />
                <Route exact path='/register' element={<Register/>} />
                <Route exact path='/signup' element={<Register/>} />
                <Route exact path='/sign-up' element={<Register/>} />
                <Route exact path='/create' element={<Register/>} />
            </Routes>
        </BrowserRouter>
    );
}