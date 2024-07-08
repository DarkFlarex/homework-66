import Toolbar from "./components/Toolbar/Toolbar";
import ShowMeals from "./components/ShowMeals/ShowMeals";
import {Route, Routes} from "react-router-dom";
import NewMeal from "./containers/NewMeal/NewMeal";
import EditMeal from "./containers/EditMeal/EditMeal";
import './App.css'

function App() {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
        <main className="container">
            <Routes>
               <Route
                   path='/'
                   element={<ShowMeals/>}
               />
               <Route path='/new-meal' element={<NewMeal/>}
               />
                <Route path='/edit-meal/:id' element={<EditMeal/>}
                />
               <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>
        </main>

    </>
  )
}

export default App
