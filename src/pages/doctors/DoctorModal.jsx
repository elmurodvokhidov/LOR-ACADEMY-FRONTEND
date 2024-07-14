import { useDispatch } from "react-redux";
import { doctorFailure, doctorStart } from "../../redux/slices/doctorSlice";
import service from "../../config/service";
import { Toast } from "../../config/sweetToast";
import { Cross } from "../../assets/icons/Cross";

const DoctorModal = ({
    symptoms,
    isLoading,
    isUpdate,
    modal,
    newDoctor,
    setNewDoctor,
    clearAndClose,
    getAllDoctorsFunction,
}) => {
    const dispatch = useDispatch();

    const getDoctorCred = (e) => {
        setNewDoctor({
            ...newDoctor,
            [e.target.name]: e.target.value
        });
    };

    const createAndUpdateFunction = async () => {
        if (newDoctor.fullname !== "" && newDoctor.phoneNumber !== "" && newDoctor.specialty !== "" && newDoctor.password !== "") {
            try {
                dispatch(doctorStart());
                if (!newDoctor._id) {
                    await service.createDoctor(newDoctor);
                    Toast.fire({ icon: "success", title: "Yangi shifokor qo'shildi" });
                }
                else {
                    const { _id, __v, createdAt, updatedAt, patients, ...others } = newDoctor;
                    await service.updateDoctor(newDoctor._id, others);
                    Toast.fire({ icon: "success", title: "Shifokor ma'lumotlari o'zgardi" });
                }
                clearAndClose();
                getAllDoctorsFunction();
            } catch (error) {
                dispatch(doctorFailure());
                Toast.fire({ icon: "error", title: error?.response?.data?.message || error.message });
            }
        }
        else {
            Toast.fire({ icon: "warning", title: "Iltimos, barcha bo'sh joylarni to'ldiring!" });
        }
    };

    return (
        <div onClick={clearAndClose} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full backdrop-blur-sm" style={{ display: modal ? "flex" : "none" }}>
            <div onClick={(e) => e.stopPropagation()} className="relative p-4 w-full max-w-md pc:max-w-lg max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl pc:text-2xl font-semibold text-gray-900">
                            Shifokor ma'lumotlari
                        </h3>
                        <button onClick={clearAndClose} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm pc:text-xl size-8 ms-auto inline-flex justify-center items-center">
                            <Cross />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="fullname"
                                    className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                >
                                    <span>Ismi (FIO)</span>
                                    <span className="ml-1 text-red-500">*</span>
                                </label>
                                <input
                                    onChange={getDoctorCred}
                                    value={newDoctor.fullname}
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
                                        onChange={getDoctorCred}
                                        value={newDoctor.phoneNumber}
                                        type="number"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        className="w-full block border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm pc:text-xl rounded-l-none p-2.5 shadow-sm outline-primary-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="specialty"
                                    className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                >
                                    <span>Mutaxasisligi</span>
                                    <span className="ml-1 text-red-500">*</span>
                                </label>
                                <select onChange={getDoctorCred} value={newDoctor.specialty} name="specialty" id="specialty" required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5">
                                    <option value="" className="italic">None</option>
                                    {
                                        symptoms?.map(sym => (
                                            <option value={sym._id} key={sym._id}>{sym?.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button onClick={createAndUpdateFunction} type="button" className="w-full text-white bg-primary-2 hover:bg-primary-3 focus:ring-4 focus:outline-none focus:ring-primary-1 font-medium rounded-lg text-sm pc:text-xl px-5 py-2.5 text-center dark:bg-primary-2 dark:hover:bg-primary-3 dark:focus:ring-primary-1">{isLoading ? "Loading..." : isUpdate ? "Saqlash" : "Qo'shish"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorModal