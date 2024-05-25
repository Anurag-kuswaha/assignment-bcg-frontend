import { Routes, Route } from 'react-router-dom';
import ConnectionDetails from './Pages/ConnectionDetails';
import Home from './Pages/Home';
import Header from './Pages/Header'
const WebRoutes = () => {

    return <>
    <Header />
        <Routes>
           
                <Route path="/" element={<Home />}></Route>
                <Route path="/details/:id" element={<ConnectionDetails />}></Route>
           
        </Routes>

    </>
}

export default WebRoutes;