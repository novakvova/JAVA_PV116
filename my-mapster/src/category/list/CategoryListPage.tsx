import {Button} from "antd";
import {Link} from "react-router-dom";

const CategoryListPage = () => {
    return (
        <>
            <h1>Список категорій</h1>
            <Link to={"/category/create"}>
                <Button size={"large"}>Додати</Button>
            </Link>
        </>
    )
}

export default CategoryListPage;