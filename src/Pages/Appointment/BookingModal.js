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
            <input type="checkbox" id="booking-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="booking-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="font-bold text-lg text-accent mb-12">Booking for: {name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-5'>
                        <input type="text" disabled value={format(date, 'PP')} class="input input-bordered w-full " />
                        <select name='slot' class="select select-bordered w-full ">
                            {
                                slots.map(slot => <option value={slot}>{slot}</option>)
                            }
                        </select>
                        <input type="text" name='name' placeholder="Full Name" class="input input-bordered w-full " />
                        <input type="text" name='email' placeholder="Email" class="input input-bordered w-full " />
                        <input type="text" name='phone' placeholder="Phone" class="input input-bordered w-full " />
                        <input type="submit" value="Submit" class="btn btn-accent w-full " />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;