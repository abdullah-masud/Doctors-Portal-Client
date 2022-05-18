import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyAppointments = () => {
    const [user] = useAuthState(auth);

    const [appointments, setAppointment] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/bookings?patientEmail=${user.email}`)
                .then(res => res.json())
                .then(data => setAppointment(data))
        }
    }, [user])

    return (
        <div>
            <h2 className='text-2xl my-2'>My Appointments</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((a, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{a.patientName}</td>
                                    <td>{a.date}</td>
                                    <td>{a.slot}</td>
                                    <td>{a.treatmentName}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;