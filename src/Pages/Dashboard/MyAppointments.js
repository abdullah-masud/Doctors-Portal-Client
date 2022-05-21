import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyAppointments = () => {
    const [user] = useAuthState(auth);

    const [appointments, setAppointment] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`https://glacial-earth-80105.herokuapp.com/bookings?patientEmail=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth)
                        localStorage.removeItem('accessToken');
                        navigate('/home')
                    }

                    return res.json()
                })
                .then(data => {

                    setAppointment(data)
                })
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
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((a, index) =>
                                <tr key={a._id}>
                                    <th>{index + 1}</th>
                                    <td>{a.patientName}</td>
                                    <td>{a.date}</td>
                                    <td>{a.slot}</td>
                                    <td>{a.treatmentName}</td>
                                    <td>
                                        {
                                            (a.price && !a.paid) &&
                                            <Link to={`/dashboard/payment/${a._id}`}>
                                                <button className='btn btn-xs  btn-success'>Pay</button>
                                            </Link>
                                        }
                                        {
                                            (a.price && a.paid) &&
                                            <div>
                                                <p><span className='text-success'>Paid</span></p>
                                                <p>Transaction Id: <span className='text-success'>{a.transactionId}</span></p>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default MyAppointments;