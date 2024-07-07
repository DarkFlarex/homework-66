import './App.css'
import Toolbar from "./components/Toolbar/Toolbar";
import MutateMeal from "./components/MutateMeal/MutateMeal";
import ShowMeals from "./components/ShowMeals/ShowMeals";
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
        <main>
            <Routes>
               <Route
                   path='/'
                   element={<ShowMeals/>}
               />
               <Route path='/new-meal' element={<MutateMeal/>}
               />
                <Route path='/edit-meal/:id' element={<MutateMeal/>}
                />
               <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>

        </main>

    </>
  )
}

export default App
