import './App.css'
import CategoryListPage from "./category/list/CategoryListPage.tsx";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./containers/default/DefaultLayout.tsx";
import CategoryCreatePage from "./category/create/CategoryCreatePage.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} element={<DefaultLayout/>}>
                <Route index element={<CategoryListPage/>}/>
                <Route path={"category"}>
                    <Route path = "create" element={<CategoryCreatePage/>}/>
                </Route>
            </Route>
        </Routes>
    </>
  )
}

export default App
