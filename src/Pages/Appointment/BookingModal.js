import React from 'react';
import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const BookingModal = ({ treatment, date, setTreatment }) => {
    const { _id, name, slots } = treatment;
    const [user] = useAuthState(auth);
    const formattedDate = format(date, 'PP');

    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value;

        const booking = {
            treatmentId: _id,
            treatmentName: name,
            date: formattedDate,
            slot: slot,
            patientName: user.displayName,
            patientEmail: user.email,
            patientPhone: event.target.phone.value,
        }
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
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}>{slot}
                                </option>)
                            }
                        </select>
                        <input type="text" name='name' value={user?.displayName} disabled className="input input-bordered w-full " />
                        <input type="text" name='email' value={user?.email} disabled className="input input-bordered w-full " />
                        <input type="text" name='phone' placeholder="Phone" className="input input-bordered w-full " />
                        <input type="submit" value="Submit" className="btn btn-accent w-full " />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;