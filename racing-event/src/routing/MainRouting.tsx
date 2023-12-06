import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {DriversPage, GamePage, HomePage} from '../pages';
import MainNavigation from '../components/shared/MainNavigation'; 

const MainRouting = () => {
return (
    <BrowserRouter>
      <header className="container-fluid px-0">
        <MainNavigation></MainNavigation>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="drivers" element={<DriversPage/>}></Route>
          <Route path="game" element={<GamePage/>}></Route>
        </Routes>
      </main>
      <footer className="bg-dark"><p className='text-center text-light mb-0 p-3'>Formula One&trade;</p></footer>
    </BrowserRouter>
    )
}

export default MainRouting;