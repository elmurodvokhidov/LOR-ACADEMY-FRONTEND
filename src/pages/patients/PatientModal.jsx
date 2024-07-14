import { useState } from "react";
import { Cross } from "../../assets/icons/Cross";
import service from "../../config/service";
import { Toast } from "../../config/sweetToast";

const PatientModal = ({
    symptoms,
    isLoading,
    isUpdate,
    modal,
    newPatient,
    setNewPatient,
    clearAndClose,
    createAndUpdateFunction,
    patients,
}) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const getPatientCred = (e) => {
        setNewPatient({
            ...newPatient,
            [e.target.name]: e.target.value
        });
    };

    const filteredPatients = newPatient.fullname && patients?.filter(patient => patient?.fullname?.toLowerCase().includes(newPatient.fullname.toLowerCase()));

    const getExistingPatient = async (id) => {
        try {
            const { data } = await service.getPatient(id);
            const {
                _id,
                __v,
                createdAt,
                updatedAt,
                amount,
                symptom,
                doctor,
                discount,
                ...others
            } = data.data;
            setNewPatient(others);
        } catch (error) {
            console.log(error);
            Toast.fire({ icon: "warning", title: error.message });
        } finally {
            setIsDisabled(true);
        }
    };

    return (
        <div onClick={clearAndClose} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full backdrop-blur-sm" style={{ display: modal ? "flex" : "none" }}>
            <div onClick={(e) => e.stopPropagation()} className="relative p-4 w-full max-w-xl pc:max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl pc:text-2xl font-semibold text-gray-900">
                            Bemor ma'lumotlari
                        </h3>
                        <button onClick={clearAndClose} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm pc:text-xl size-8 ms-auto inline-flex justify-center items-center">
                            <Cross />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4">
                            <div className="relative">
                                <label
                                    htmlFor="fullname"
                                    className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                >
                                    <span>Ismi (FIO)</span>
                                    <span className="ml-1 text-red-500">*</span>
                                </label>
                                <input
                                    onChange={(e) => {
                                        getPatientCred(e);
                                        setIsDisabled(false);
                                    }}
                                    value={newPatient.fullname}
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    required
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5" />

                                {
                                    filteredPatients.length > 0 && !isDisabled && !newPatient?._id &&
                                    <div className="w-full max-h-52 mt-1 overflow-auto flex flex-col absolute rounded-lg border border-black bg-white">
                                        {filteredPatients.map(patient => (
                                            <button
                                                onClick={() => getExistingPatient(patient?._id)}
                                                key={patient?._id}
                                                type="button"
                                                className="border-b p-2 last:border-b-0"
                                            >
                                                {patient?.fullname}
                                            </button>
                                        ))}
                                    </div>
                                }
                            </div>

                            <div className="flex gap-4">
                                <div className="w-full">
                                    <label
                                        htmlFor="dateOfBirth"
                                        className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                    >
                                        <span>Tug'ilgan sana</span>
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>
                                    <input
                                        disabled={isDisabled}
                                        onChange={getPatientCred}
                                        value={newPatient.dateOfBirth}
                                        type="date"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        required
                                        className="disabled:opacity-70 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5" />
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="gender"
                                        className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                    >
                                        <span>Jinsi</span>
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>
                                    <select onChange={getPatientCred} value={newPatient.gender} name="gender" id="gender" required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5">
                                        <option value="" className="italic">None</option>
                                        <option value="erkak">Erkak</option>
                                        <option value="ayol">Ayol</option>
                                    </select>
                                </div>
                            </div>

                            <div className="w-full flex flex-col">
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm pc:text-xl font-medium text-gray-900">
                                    <span>Telefon raqami</span>
                                    <span className="ml-1 text-red-500">*</span>
                                </label>
                                <div className="flex">
                                    <label htmlFor="phoneNumber" className="text-sm pc:text-xl border border-r-0 rounded-l-lg border-gray-300 p-2.5">+998</label>
                                    <input
                                        disabled={isDisabled}
                                        onChange={getPatientCred}
                                        value={newPatient.phoneNumber}
                                        type="number"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        className="disabled:opacity-70 w-full block border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm pc:text-xl rounded-l-none p-2.5 shadow-sm outline-primary-2"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-full">
                                    <label
                                        htmlFor="symptom"
                                        className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                    >
                                        <span>Kasallik turi</span>
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>
                                    <select onChange={getPatientCred} value={newPatient.symptom} name="symptom" id="symptom" required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5">
                                        <option value="" className="italic">None</option>
                                        {
                                            symptoms?.map(sym => (
                                                <option value={sym._id} key={sym._id}>{sym?.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="doctor"
                                        className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                    >
                                        <span>Shifokorni tanglang</span>
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>
                                    <select onChange={getPatientCred} value={newPatient.doctor} name="doctor" id="doctor" required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5">
                                        <option value="" className="italic">None</option>
                                        {
                                            symptoms.find(sym => sym._id === newPatient.symptom)?.doctors?.map(doc => (
                                                <option value={doc?._id} key={doc?._id}>{doc?.fullname}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="discount"
                                    className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                >
                                    <span>Chegirma</span>
                                </label>
                                <input
                                    onChange={getPatientCred}
                                    value={newPatient.discount}
                                    type="text"
                                    id="discount"
                                    name="discount"
                                    required
                                    className="disabled:opacity-70 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5" />
                            </div>

                            <div className="flex gap-4">
                                <div className="w-full">
                                    <label
                                        htmlFor="passport"
                                        className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                    >
                                        <span>Passport seriya raqami</span>
                                    </label>
                                    <input
                                        disabled={isDisabled}
                                        onChange={getPatientCred}
                                        value={newPatient.passport}
                                        type="text"
                                        id="passport"
                                        name="passport"
                                        required
                                        className="disabled:opacity-70 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5" />
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm pc:text-xl font-medium text-gray-900"
                                    >
                                        <span>Email manzil</span>
                                    </label>
                                    <input
                                        disabled={isDisabled}
                                        onChange={getPatientCred}
                                        value={newPatient.email}
                                        type="text"
                                        id="email"
                                        name="email"
                                        required
                                        className="disabled:opacity-70 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm pc:text-xl rounded-lg outline-primary-2 block w-full p-2.5" />
                                </div>
                            </div>

                            <button onClick={createAndUpdateFunction} type="button" className="w-full text-white bg-primary-2 hover:bg-primary-3 focus:ring-4 focus:outline-none focus:ring-primary-1 font-medium rounded-lg text-sm pc:text-xl px-5 py-2.5 text-center dark:bg-primary-2 dark:hover:bg-primary-3 dark:focus:ring-primary-1">{isLoading ? "Loading..." : isUpdate ? "Saqlash" : "Qo'shish"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientModal