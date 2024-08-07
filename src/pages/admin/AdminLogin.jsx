import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../../config/service";
import { authFailure, authStart, authSuccess } from "../../redux/slices/authSlice";
import { setCookie } from "../../config/cookiesService";
import { Toast } from "../../config/sweetToast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const AdminLogin = () => {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [admin, setAdmin] = useState({
        phoneNumber: "",
        password: "",
    });
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);

    const getAdminCred = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });
    };

    const loginFunction = async () => {
        try {
            if (admin.phoneNumber !== "" && admin.password !== "") {
                dispatch(authStart());
                const { data } = await service.adminLogin(admin);
                dispatch(authSuccess(data));
                setCookie("x-token", data.token, 30);
            }
            else {
                Toast.fire({ icon: "warning", title: "Iltimos, barcha bo'sh joylarni to'ldiring!" });
            }
        } catch (error) {
            dispatch(authFailure(error.message));
            Toast.fire({ icon: "error", title: error.response?.data.message || error.message });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/admin/dashboard');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="container">
            <h1 className="text-center text-3xl pc:text-4xl mt-10">Hisobga kirish</h1>

            <form className="max-w-sm pc:max-w-md mx-auto my-10">
                <div className="flex flex-col mb-5">
                    <label htmlFor="phoneNumber" className="block mb-2 text-sm pc:text-xl font-medium text-gray-900">
                        <span>Telefon raqamingiz</span>
                        <span className="ml-1 text-red-500">*</span>
                    </label>
                    <div className="flex">
                        <label htmlFor="phoneNumber" className="text-sm pc:text-xl border border-r-0 rounded-l-lg border-gray-300 p-2.5">+998</label>
                        <input
                            disabled={isLoading}
                            onChange={getAdminCred}
                            onKeyDown={(e) => e.key === "Enter" && loginFunction()}
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            className="w-full block border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm pc:text-xl rounded-l-none p-2.5 shadow-sm outline-primary-2"
                        />
                    </div>
                </div>

                <div className="mb-5 relative">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                    >
                        <span>Parolingiz</span>
                        <span className="ml-1 text-red-500">*</span>
                    </label>
                    <input
                        disabled={isLoading}
                        onChange={getAdminCred}
                        onKeyDown={(e) => e.key === "Enter" && loginFunction()}
                        type={showPass ? "text" : "password"}
                        id="password"
                        name="password"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5" />
                    <button
                        type='button'
                        onClick={() => setShowPass(!showPass)}
                        className='absolute bottom-2.5 right-2.5 text-xl pc:text-2xl text-gray-500 outline-primary-2'
                    >
                        {showPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                </div>

                <button
                    disabled={isLoading}
                    onClick={loginFunction}
                    type="button"
                    className="w-full text-white bg-primary-2 hover:bg-primary-3 focus:ring-4 focus:outline-none focus:ring-primary-1 font-medium rounded-lg text-sm pc:text-xl px-5 py-2.5 text-center dark:bg-primary-2 dark:hover:bg-primary-3 dark:focus:ring-primary-1"
                >
                    {isLoading ? "Loading..." : "Hisobga kirish"}
                </button>
            </form>
            <p className="fixed right-10 bottom-5 text-primary-2 pc:text-xl select-none">v1.0.0 Copyright © Lor Academy & vkh. All rights reserved</p>
        </div>
    )
}

export default AdminLogin