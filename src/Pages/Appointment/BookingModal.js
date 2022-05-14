import React from 'react';
import { format } from 'date-fns';


const BookingModal = ({ treatment, date, setTreatment }) => {
    const { _id, name, slots } = treatment;

    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value;
        console.log(slot)

        // to close the modal
        setTreatment(null)
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-accent mb-12">Booking for: {name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-5'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full " />
                        <select name='slot' className="select select-bordered w-full ">
                            {
                                slots.map(slot => <option value={slot}>{slot}</option>)
                            }
                        </select>
                        <input type="text" name='name' placeholder="Full Name" className="input input-bordered w-full " />
                        <input type="text" name='email' placeholder="Email" className="input input-bordered w-full " />
                        <input type="text" name='phone' placeholder="Phone" className="input input-bordered w-full " />
                        <input type="submit" value="Submit" className="btn btn-accent w-full " />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;