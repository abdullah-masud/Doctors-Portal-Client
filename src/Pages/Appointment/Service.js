import React from 'react';

const Service = ({ service, setTreatment }) => {
    const { name, slots } = service;

    return (
        <div class="card lg:max-w-lg bg-base-100 shadow-xl">
            <div class="card-body text-center">
                <h2 class="card-title font-bold text-secondary block">{name}</h2>
                <p>
                    {
                        slots.length > 0 ?
                            <span>{slots[0]}</span>
                            :
                            <span className='text-red-500'>Try another date.</span>
                    }
                </p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                <div class="card-actions justify-center">
                    <label
                        for="booking-modal"
                        class="btn border-0 bg-gradient-to-r from-secondary to-primary text-white uppercase"
                        disabled={slots.length === 0}
                        onClick={() => { setTreatment(service) }}
                    >Book Appointment
                    </label>

                </div>
            </div>
        </div >
    );
};

export default Service;