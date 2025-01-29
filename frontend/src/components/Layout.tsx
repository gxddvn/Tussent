import { Outlet } from "react-router-dom";
import Header from "./Header";

// import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header/> 
            <div className='relative my-0 flex flex-col flex-grow overflow-y-auto'>
                <Outlet />
            </div>
            {/* <Footer /> */}
        </>
    );
};

export { Layout };
