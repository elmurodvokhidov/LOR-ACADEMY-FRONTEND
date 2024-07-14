import { useState } from "react";
import { useSelector } from "react-redux"
import AdminModal from "./AdminModal";

const AdminProfile = () => {
    const { auth, isLoading } = useSelector(state => state.auth);
    const [newAdmin, setNewAdmin] = useState({
        fullname: "",
        phoneNumber: "",
        password: "",
    });
    const [isUpdate, setIsUpdate] = useState(false);
    const [isPasswordUpdate, setIsPasswordUpdate] = useState(null);

    const clearAndClose = () => {
        setNewAdmin({
            fullname: "",
            phoneNumber: "",
            password: "",
        });
        setIsUpdate(false);
        setIsPasswordUpdate(null);
    };

    return (
        <div className="container">
            {
                isLoading ? <h1>Loading...</h1> :
                    <>
                        <div className="max-w-2xl pc:max-w-3xl shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg pc:text-2xl leading-6 font-medium text-gray-900">
                                    Adminstrator
                                </h3>
                                <p className="mt-1 w-full text-sm pc:text-xl text-gray-500">
                                    Foydalanuvchi haqida ma'lumot va tafsilotlar
                                </p>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm pc:text-xl font-medium text-gray-500">
                                            Ismi (FIO)
                                        </dt>
                                        <dd className="mt-1 text-sm pc:text-xl text-gray-900 sm:mt-0 sm:col-span-2">
                                            {auth?.fullname}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm pc:text-xl font-medium text-gray-500">
                                            Telefon
                                        </dt>
                                        <dd className="mt-1 text-sm pc:text-xl text-blue-500 sm:mt-0 sm:col-span-2">
                                            +998{auth?.phoneNumber}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <div className="max-w-2xl pc:max-w-3xl mt-6 pc:mt-8 flex items-center justify-end gap-x-6">
                            <button
                                onClick={() => {
                                    setIsUpdate(true);
                                    setNewAdmin(auth);
                                }}
                                type="button"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm pc:text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Hisob ma'lumotlarini o'zgartirish
                            </button>
                            <button
                                onClick={() => setIsPasswordUpdate(auth._id)}
                                type="button"
                                className="rounded-md bg-green-600 px-3 py-2 text-sm pc:text-xl font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                                Parolni o'zgartirish
                            </button>
                        </div>
                    </>
            }

            <AdminModal
                isLoading={isLoading}
                isUpdate={isUpdate}
                isPasswordUpdate={isPasswordUpdate}
                newAdmin={newAdmin}
                setNewAdmin={setNewAdmin}
                clearAndClose={clearAndClose}
            />
        </div>
    )
}

export default AdminProfile