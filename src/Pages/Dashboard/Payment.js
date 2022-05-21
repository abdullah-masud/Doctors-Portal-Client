import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L1ls3F9WqdCZWFZCpbNzVBCogQojitIfqSXXXMg6KVNPgDwPMBMNiLQt9ppgXauFIHGObyrYaZVZWKCHjZ010UH00L90cwzXi');

const Payment = () => {
    const { appointmentId } = useParams()
    const url = `http://localhost:5000/bookings/${appointmentId}`;

    const { data: appointment, isLoading } = useQuery(['booking', appointmentId], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div class="card w-50 max-w-md bg-base-100 shadow-xl my-2 mx-5">
                <div class="card-body">
                    <p className='text-success font-bold'>Hello, {appointment.patientName}</p>
                    <h2 class="card-title">Please Pay for {appointment.treatmentName}</h2>
                    <p>Your Appointment: <span className='text-orange-700'>{appointment.date}</span> at {appointment.slot}</p>
                    <p>Please Pay : ${appointment.price}</p>
                </div>
            </div>
            <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100 mx-5">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;