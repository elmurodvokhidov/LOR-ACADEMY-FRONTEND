import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "../../config/service";
import { doctorSuccess } from "../../redux/slices/doctorSlice";
import { patientSuccess } from "../../redux/slices/patientSlice";
import SplineChart from "../../components/SplineChart";
import { BsPerson } from "react-icons/bs";
import { symptomSuccess } from "../../redux/slices/symptomSlice";
import { SlLayers } from "react-icons/sl";

const AdminDashboard = () => {
    const { doctors } = useSelector(state => state.doctor);
    const { patients } = useSelector(state => state.patient);
    const { symptoms } = useSelector(state => state.symptom);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllDoctorsFunction = async () => {
            const { data } = await service.getAllDoctor();
            dispatch(doctorSuccess({ data: data.data, type: "more" }));
        };
        const getAllPatientsFunction = async () => {
            const { data } = await service.getAllPatient();
            dispatch(patientSuccess({ data: data.data, type: "more" }));
        };
        const getAllSymptomsFunction = async () => {
            const { data } = await service.getAllSymptom();
            dispatch(symptomSuccess({ data: data.data, type: "more" }));
        };

        getAllDoctorsFunction();
        getAllPatientsFunction();
        getAllSymptomsFunction();
    }, []);

    return (
        <div className="container">
            <section className="w-full grid lg:grid-cols-6 sm:grid-cols-3 small:grid-cols-2 items-center justify-start gap-6">
                <div className="small:size-28 sm:size-36 pc:size-40 flex flex-col items-center justify-center border shadow-smooth">
                    <BsPerson className="small:text-2xl sm:text-4xl pc:text-5xl text-primary-2" />
                    <h1 className="sm:text-sm small:text-xs pc:text-xl text-gray-500 mt-1">Shifokorlar</h1>
                    <h1 className="text-2xl pc:text-3xl text-primary-2 mt-3">{doctors ? doctors.length : 0}</h1>
                </div>

                <div className="small:size-28 sm:size-36 pc:size-40 flex flex-col items-center justify-center border shadow-smooth">
                    <BsPerson className="small:text-2xl sm:text-4xl pc:text-5xl text-primary-2" />
                    <h1 className="sm:text-sm small:text-xs pc:text-xl text-gray-500 mt-1">Bemorlar</h1>
                    <h1 className="text-2xl pc:text-3xl text-primary-2 mt-3">{patients ? patients.length : 0}</h1>
                </div>

                <div className="small:size-28 sm:size-36 pc:size-40 flex flex-col items-center justify-center border shadow-smooth">
                    <SlLayers className="small:text-2xl sm:text-4xl pc:text-5xl text-primary-2" />
                    <h1 className="sm:text-sm small:text-xs pc:text-xl text-gray-500 mt-1">Bo'limlar</h1>
                    <h1 className="text-2xl pc:text-3xl text-primary-2 mt-3">{symptoms ? symptoms.length : 0}</h1>
                </div>
            </section>

            <section className="my-8 shadow-smooth">
                {patients.length > 0 && <SplineChart data={patients} />}
            </section>
        </div>
    )
}

export default AdminDashboard