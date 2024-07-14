import { useDispatch } from "react-redux";
import service from "../../config/service";
import { Toast } from "../../config/sweetToast";
import { Cross } from "../../assets/icons/Cross";
import { authFailure, authStart, authSuccess } from "../../redux/slices/authSlice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

const AdminModal = ({
    isLoading,
    isUpdate,
    isPasswordUpdate,
    newAdmin,
    setNewAdmin,
    clearAndClose,
}) => {
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false);

    const getAdminCred = (e) => {
        setNewAdmin({
            ...newAdmin,
            [e.target.name]: e.target.value
        });
    };

    const updateAdminAndPasswordFunction = async (e) => {
        e.preventDefault();
        try {
            if (isUpdate) {
                if (newAdmin.fullname !== "" && newAdmin.phoneNumber !== "") {
                    dispatch(authStart());
                    const { password, ...others } = newAdmin;
                    const { data } = await service.updateAdmin(newAdmin._id, others);
                    dispatch(authSuccess(data));
                    Toast.fire({ icon: "success", title: "Ma'lumotlar muvaffaqiyatli yangilandi" });
                    clearAndClose();
                }
                else {
                    Toast.fire({ icon: "warning", title: "Iltimos, barcha bo'sh joylarni to'ldiring!" });
                }
            }
            else if (isPasswordUpdate) {
                if (newAdmin.password !== "") {
                    dispatch(authStart());
                    const { data } = await service.updateAdminPassword(isPasswordUpdate, newAdmin.password);
                    dispatch(authSuccess(data));
                    Toast.fire({ icon: "success", title: "Parol muvaffaqiyatli o'zgardi" });
                    clearAndClose();
                }
                else {
                    Toast.fire({ icon: "warning", title: "Iltimos, barcha bo'sh joylarni to'ldiring!" });
                }
            }
        } catch (error) {
            dispatch(authFailure());
            Toast.fire({ icon: "error", title: error?.response?.data?.message || error.message });
        }
    };

    const handleEnterPress = (e) => {
        if (e.key === "Enter") return updateAdminAndPasswordFunction(e);
    }

    return (
        <div onClick={clearAndClose} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full backdrop-blur-sm" style={{ display: (isUpdate || isPasswordUpdate) ? "flex" : "none" }}>
            <div onClick={(e) => e.stopPropagation()} className="relative p-4 w-full max-w-md pc:max-w-lg max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl pc:text-2xl font-semibold text-gray-900">
                            Adminstrator ma'lumotlari
                        </h3>
                        <button onClick={clearAndClose} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm pc:text-xl size-8 ms-auto inline-flex justify-center items-center">
                            <Cross />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4">
                            {
                                isUpdate &&
                                <>
                                    <div>
                                        <label
                                            htmlFor="fullname"
                                            className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                        >
                                            <span>Ismi (FIO)</span>
                                            <span className="ml-1 text-red-500">*</span>
                                        </label>
                                        <input
                                            onChange={getAdminCred}
                                            onKeyDown={handleEnterPress}
                                            value={newAdmin.fullname}
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            required
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="phoneNumber" className="block mb-2 text-sm pc:text-xl font-medium text-gray-900">
                                            <span>Telefon raqami</span>
                                            <span className="ml-1 text-red-500">*</span>
                                        </label>
                                        <div className="flex">
                                            <label htmlFor="phoneNumber" className="text-sm pc:text-xl border border-r-0 rounded-l-lg border-gray-300 p-2.5">+998</label>
                                            <input
                                                onChange={getAdminCred}
                                                onKeyDown={handleEnterPress}
                                                value={newAdmin.phoneNumber}
                                                type="number"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                className="w-full block border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm pc:text-xl rounded-l-none p-2.5 shadow-sm outline-primary-2"
                                            />
                                        </div>
                                    </div>
                                </>
                            }

                            {
                                isPasswordUpdate &&
                                <div className="mb-5 relative">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                    >
                                        <span>Yangi Parol</span>
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>
                                    <input
                                        onChange={getAdminCred}
                                        onKeyDown={handleEnterPress}
                                        type={showPass ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5"
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPass(!showPass)}
                                        className='absolute bottom-2.5 right-2.5 text-xl text-gray-500 outline-primary-2'
                                    >
                                        {showPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                    </button>
                                </div>
                            }

                            <button onClick={updateAdminAndPasswordFunction} className="w-full text-white bg-primary-2 hover:bg-primary-3 focus:ring-4 focus:outline-none focus:ring-primary-1 font-medium rounded-lg text-sm pc:text-xl px-5 py-2.5 text-center dark:bg-primary-2 dark:hover:bg-primary-3 dark:focus:ring-primary-1">{isLoading ? "Loading..." : (isUpdate || isPasswordUpdate) ? "Saqlash" : "Qo'shish"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminModal