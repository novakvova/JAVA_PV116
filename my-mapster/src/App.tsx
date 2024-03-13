import './App.css'
import CategoryListPage from "./category/list/CategoryListPage.tsx";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./containers/default/DefaultLayout.tsx";
import CategoryCreatePage from "./category/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./category/edit/CategoryEditPage.tsx";
import ProductListPage from "./product/list/ProductListPage.tsx";
import ProductCreatePage from "./product/create/ProductCreatePage.tsx";
import ProductEditPage from "./product/edit/ProductEditPage.tsx";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} element={<DefaultLayout/>}>
                <Route index element={<CategoryListPage/>}/>
                <Route path={"category"}>
                    <Route path = "create" element={<CategoryCreatePage/>}/>
                    <Route path={"edit/:id"} element={<CategoryEditPage/>} />
                </Route>

                <Route path={"product"}>
                    <Route index element={<ProductListPage/>} />
                    <Route path={"create"} element={<ProductCreatePage/>} />
                    <Route path={"edit/:id"} element={<ProductEditPage/>} />
                </Route>

                <Route path={"login"} element={<Login/>} />
                <Route path={"register"} element={<Register/>} />
            </Route>
        </Routes>
    </>
  )
}

export default App
