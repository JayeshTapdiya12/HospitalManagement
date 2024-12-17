import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const AppointmentPage = () => {
    const [messages, setMessages] = useState([]);
    const { isAuthenticated } = useContext(Context);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/appointment/getall",
                    { withCredentials: true }
                );
                console.log(data)
                setMessages(data.appointments);
            } catch (error) {
                console.log(error.response.data.appointments);
            }
        };
        fetchMessages();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <section className="page messages">
            <h1>Appointments</h1>
            <div className="banner">
                {messages && messages.length > 0 ? (
                    messages.map((element) => {
                        return (
                            <div className="card" key={element._id}>
                                <div className="details">
                                    <p>
                                        First Name: <span>{element.firstName}</span>
                                    </p>
                                    <p>
                                        Last Name: <span>{element.lastName}</span>
                                    </p>
                                    <p>
                                        Date of Birth: <span>{element.dob.substring(0, 10)}</span>
                                    </p>
                                    <p>
                                        patientId: <span>{element.patientId}</span>
                                    </p>

                                    <p>
                                        department: <span>{element.department}</span>
                                    </p>

                                    <p>
                                        appointment date: <span>{element.appointment_date.substring(0, 10)}</span>
                                    </p>

                                    <p>
                                        Email: <span>{element.email}</span>
                                    </p>
                                    <p>
                                        nic: <span>{element.nic}</span>
                                    </p>
                                    <p>
                                        Gender: <span>{element.gender}</span>
                                    </p>
                                    <p>
                                        Address: <span>{element.address}</span>
                                    </p>

                                </div>
                                <br />
                                <br />

                                <div className="details">
                                    <p>
                                        doctor Name: <span>{element.doctor.firstName} {element.doctor.lastName}</span>
                                    </p>
                                    <p>
                                        doctor Id: <span>{element.doctorId}</span>
                                    </p>
                                    <br />
                                    <br />
                                    <p>
                                        hasVisited : <span>{element.hasVisited ? "true" : "false"}</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h1>No Messages!</h1>
                )}
            </div>
        </section>
    );
};

export default AppointmentPage;
