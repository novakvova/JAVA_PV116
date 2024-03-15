import './App.css'
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./containers/default/DefaultLayout.tsx";
import CategoryListPage from "./admin/category/list/CategoryListPage.tsx";
import CategoryCreatePage from "./admin/category/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./admin/category/edit/CategoryEditPage.tsx";
import ProductListPage from "./admin/product/list/ProductListPage.tsx";
import ProductCreatePage from "./admin/product/create/ProductCreatePage.tsx";
import ProductEditPage from "./admin/product/edit/ProductEditPage.tsx";
import Login from "./views/Login";
import Register from "./views/Register";
import AdminLayout from "./containers/admin/AdminLayout.tsx";
import HomePage from "./views/Home";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} element={<DefaultLayout/>}>
                <Route index element={<HomePage/>}/>
                <Route path={"login"} element={<Login/>}/>
                <Route path={"register"} element={<Register/>}/>
            </Route>
            <Route path={"/admin"} element={<AdminLayout/>}>
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

            </Route>

        </Routes>
    </>
  )
}

export default App
