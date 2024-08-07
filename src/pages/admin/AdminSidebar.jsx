import { LuLayoutDashboard } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import { SlLayers } from "react-icons/sl";
import { LiaChartPieSolid } from "react-icons/lia";

function AdminSidebar({ modals, handleModal, closeAllModals }) {
    const location = useLocation();
    return (
        <div className={`sidebar md:static absolute z-10 ${modals.sideModal ? "left-0" : "-left-full"} h-screen pt-16 pc:pt-20 overflow-y-auto shadow-smooth transition-all bg-white`}>
            <div onClick={() => handleModal("settingsModal", false)}>
                <NavLink
                    to="/admin/dashboard"
                    onClick={closeAllModals}
                    className="cell relative text-gray-500 border-b-2 py-4 md:px-5 pc:px-8 small:px-4 flex flex-col items-center outline-primary-2">
                    <LuLayoutDashboard className="pc:text-4xl text-2xl" />
                    <h1 className="pc:text-xl text-base">Dashboard</h1>
                </NavLink>

                <NavLink
                    to="doctors"
                    onClick={closeAllModals}
                    className="cell relative text-gray-500 border-b-2 py-4 md:px-5 pc:px-6 small:px-4 flex flex-col items-center outline-primary-2">
                    <BsPerson className="pc:text-4xl 2xl:text-3xl text-2xl" />
                    <h1 className="pc:text-xl text-base">Shifokorlar</h1>
                </NavLink>

                <NavLink
                    to="patients"
                    onClick={closeAllModals}
                    className={`${location.pathname === '/admin/patients-reports' && 'active'} cell relative text-gray-500 border-b-2 py-4 md:px-5 pc:px-6 small:px-4 flex flex-col items-center outline-primary-2`}>
                    <BsPerson className="pc:text-4xl 2xl:text-3xl text-2xl" />
                    <h1 className="pc:text-xl text-base">Bemorlar</h1>
                </NavLink>

                <NavLink
                    to="symptoms"
                    onClick={closeAllModals}
                    className="cell relative text-gray-500 border-b-2 py-4 md:px-5 pc:px-6 small:px-4 flex flex-col items-center outline-primary-2">
                    <SlLayers className="pc:text-4xl 2xl:text-3xl text-2xl" />
                    <h1 className="pc:text-xl text-base">Bo'limlar</h1>
                </NavLink>

                <NavLink
                    to="reports"
                    onClick={closeAllModals}
                    className="cell relative text-gray-500 border-b-2 py-4 md:px-6 small:px-4 flex flex-col items-center outline-primary-2">
                    <LiaChartPieSolid className="pc:text-4xl 2xl:text-3xl text-2xl" />
                    <h1 className="pc:text-xl text-base">Hisobotlar</h1>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminSidebar