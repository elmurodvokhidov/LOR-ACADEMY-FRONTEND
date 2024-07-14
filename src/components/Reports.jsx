import { useDispatch, useSelector } from "react-redux";
import { symptomFailure, symptomStart, symptomSuccess } from "../redux/slices/symptomSlice";
import service from "../config/service";
import React, { useEffect, useState } from "react";
import { MdFileDownload } from "react-icons/md";

const Reports = () => {
    const { symptoms, isLoading } = useSelector(state => state.symptom);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        from: "",
        to: "",
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const getAllSymptomFunction = async () => {
        try {
            dispatch(symptomStart());
            const { data } = await service.getAllSymptom();
            dispatch(symptomSuccess({ data: data.data, type: "more" }));
        } catch (error) {
            dispatch(symptomFailure(error.message));
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAllSymptomFunction();
    }, []);

    const filteredSymptoms = symptoms?.map(symptom => {
        const filterFromDate = filters.from ? new Date(filters.from) : null;
        const filterToDate = filters.to ? new Date(filters.to) : null;

        const filteredPatients = symptom.patients?.filter(patient => {
            const patientDate = new Date(patient?.createdAt);

            if (filterFromDate && filterToDate) {
                return patientDate >= filterFromDate && patientDate <= filterToDate;
            } else if (filterFromDate) {
                return patientDate >= filterFromDate;
            } else if (filterToDate) {
                return patientDate <= filterToDate;
            }

            return true;
        });

        return {
            ...symptom,
            patients: filteredPatients,
        };
    });

    let totalPatients = [];
    let totalPayment = 0;

    filteredSymptoms?.forEach(symptom => {
        totalPatients.push(symptom?.patients);
        totalPayment += symptom?.patients?.reduce((sum, patient) => sum + patient?.amount, 0);
    });

    const groupByDate = (data) => {
        const groups = {};
        data.forEach(patient => {
            const date = new Date(patient.createdAt);
            const key = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(patient);
        });
        return groups;
    };

    const groupedPatients = groupByDate(totalPatients.flat());
    const sortedDates = Object.keys(groupedPatients).sort((a, b) => {
        const [dayA, monthA, yearA] = a.split('.').map(Number);
        const [dayB, monthB, yearB] = b.split('.').map(Number);

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        return dateA - dateB;
    });

    const downloadExcelFileFunction = async () => {
        try {
            const response = await service.exportToExcel({
                filteredSymptoms,
                totalPatients: totalPatients.flat().length,
                totalPayment,
                groupedPatients
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reports.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl pc:text-2xl">Hisobotlar</h1>
                <div className="flex gap-4">
                    {/* Start Date */}
                    <div className="relative text-gray-500">
                        <label
                            htmlFor="from"
                            className="absolute text-xs pc:text-base bg-[#f8f8f8] -top-1.5 pc:-top-3 left-3">
                            <span>Boshlanish</span>
                        </label>
                        <input
                            value={filters.from}
                            onChange={handleFilterChange}
                            type="date"
                            name="from"
                            id="from"
                            className="w-full p-1.5 text-sm pc:text-base rounded border outline-primary-2 bg-[#f8f8f8]" />
                    </div>

                    {/* End Date */}
                    <div className="relative text-gray-500">
                        <label
                            htmlFor="to"
                            className="absolute text-xs pc:text-base bg-[#f8f8f8] -top-1.5 pc:-top-3 left-3">
                            <span>Tugash</span>
                        </label>
                        <input
                            value={filters.to}
                            onChange={handleFilterChange}
                            type="date"
                            name="to"
                            id="to"
                            className="w-full p-1.5 text-sm pc:text-base rounded border outline-primary-2 bg-[#f8f8f8]" />
                    </div>

                    <button
                        onClick={() => setFilters({ from: "", to: "" })}
                        className="border rounded p-2 text-sm pc:text-base text-gray-700 bg-[#f8f8f8] hover:bg-gray-100 hover:text-gray-500 transition-all outline-primary-2"
                    >
                        Filterni tiklash
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-2 border-gray-300">
                    <thead>
                        <tr>
                            <th rowSpan={4} colSpan={2} className="px-4 py-2 border-2">Umumiy kelgan bemorlar soni</th>
                            <th rowSpan={4} className="px-4 py-2 border-2">To'lov so'mmasi (so'mda)</th>
                            <th colSpan={filteredSymptoms?.length * filteredSymptoms?.length} className="px-4 py-2 border-2">Shundan</th>
                        </tr>
                        <tr>
                            {filteredSymptoms?.map((symptom, index) => (
                                <th colSpan={symptom?.doctors?.length + symptom?.doctors?.length} key={index} className="px-4 py-2 border-2">{symptom?.name}</th>
                            ))}
                        </tr>
                        <tr>
                            {filteredSymptoms?.map((symptom) => (
                                symptom.doctors?.map((doctor, index) => (
                                    <th key={index} className="px-4 py-2 border-2" colSpan="2">{doctor?.fullname}</th>
                                ))
                            ))}
                        </tr>
                        <tr>
                            {filteredSymptoms?.map((symptom) => (
                                symptom.doctors?.map((doctor, index) => (
                                    <React.Fragment key={`fragment-${index}`}>
                                        <th className="px-4 py-2 border-2">soni</th>
                                        <th className="px-4 py-2 border-2">so'mmasi</th>
                                    </React.Fragment>
                                ))
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 border-2">Jami</td>
                            <td className="px-4 py-2 border-2">{totalPatients?.flat().length}</td>
                            <td className="px-4 py-2 border-2">{totalPayment?.toLocaleString()}</td>
                            {filteredSymptoms?.map((symptom) => (
                                symptom.doctors?.map((doctor, index) => (
                                    <React.Fragment key={`values-${index}`}>
                                        <td className="px-4 py-2 border-2">
                                            {totalPatients?.flat().filter(patient => patient?.doctor?._id === doctor._id).length}
                                        </td>
                                        <td className="px-4 py-2 border-2">
                                            {totalPatients?.flat()?.filter(patient => patient?.doctor?._id === doctor._id)?.reduce((total, patient) => total + patient?.amount, 0)?.toLocaleString()}
                                        </td>
                                    </React.Fragment>
                                ))
                            ))}
                        </tr>
                        {sortedDates.map(date => (
                            <tr key={date}>
                                <td className="px-4 py-2 border-2">{date}</td>
                                <td className="px-4 py-2 border-2">{groupedPatients[date].length}</td>
                                <td className="px-4 py-2 border-2">{groupedPatients[date].reduce((sum, patient) => sum + patient?.amount, 0)?.toLocaleString()}</td>
                                {filteredSymptoms.map((symptom) => (
                                    symptom.doctors?.map((doctor, index) => (
                                        <React.Fragment key={index}>
                                            <td className="px-4 py-2 border-2">
                                                {groupedPatients[date].filter(item => item.doctor?._id === doctor._id).length}
                                            </td>
                                            <td className="px-4 py-2 border-2">
                                                {groupedPatients[date].filter(item => item.doctor?._id === doctor._id)?.reduce((sum, patient) => sum + patient?.amount, 0)?.toLocaleString()}
                                            </td>
                                        </React.Fragment>
                                    ))
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {
                !isLoading &&
                <button
                    onClick={downloadExcelFileFunction}
                    id="downloadExelBtn"
                    className="size-8 pc:size-10 relative float-end flex items-center justify-center ml-8 mt-8 text-gray-400 border border-gray-300 outline-primary-2 text-xl pc:text-2xl rounded-full hover:text-cyan-600 hover:bg-blue-100 transition-all">
                    <MdFileDownload />
                </button>
            }
        </div>
    )
}

export default Reports