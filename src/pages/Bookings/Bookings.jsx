import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingsRow from "./BookingsRow";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  // custom hooks for axios
  const axiosSecure = useAxiosSecure();
  // find user by using query email
  // const url = `http://localhost:5000/bookings?email=${user?.email}`;
  const url = `/bookings?email=${user?.email}`;

  useEffect(() => {
    // using custom hook
    axiosSecure.get(url).then(res => {
      setBookings(res.data);
    });

    // using axios
    // axios.get(url, { withCredentials: true }).then(res => {
    //   setBookings(res.data);
    // });

    // using fetch
    // fetch(url, { credentials: "include" })
    //   .then(res => res.json())
    //   .then(data => setBookings(data));
  }, [url, axiosSecure]);

  const handleDelete = id => {
    const proceed = confirm("Are you sure to delete this item?");
    if (proceed) {
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            const remaining = bookings.filter(booking => booking._id !== id);
            setBookings(remaining);
          }
        });
    }
  };

  const handleBookingConfirm = id => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
          // update state
          const remaining = bookings.filter(booking => booking._id !== id);
          const updated = bookings.find(booking => booking._id === id);
          updated.status = "confirm";
          const newBookings = [updated, ...remaining];
          setBookings(newBookings);
          alert("confirm successfully");
        }
      });
  };

  return (
    <div>
      <h2 className="text-5xl">Your Bookings: {bookings?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.length > 0 &&
              bookings.map(booking => (
                <BookingsRow
                  key={booking._id}
                  booking={booking}
                  handleDelete={handleDelete}
                  handleBookingConfirm={handleBookingConfirm}
                ></BookingsRow>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
