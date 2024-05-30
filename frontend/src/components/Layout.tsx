import { Outlet } from "react-router-dom";
import Header from "./Header";

// import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header/> 
            <div className='relative h-auto my-0 mx-auto'>
                <Outlet />
            </div>
            {/* <Footer /> */}
        </>
    );
};

export { Layout };
