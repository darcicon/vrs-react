import { Button } from "react-bootstrap";
import { AdminNavBar } from "../common/AppNavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  VehicleBookingCancelAction,
  getAllBookingsAction,
} from "../redux/VehicleBookingReducer";

export const AdminVehicleBookingList = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    dispatch(getAllBookingsAction());
  }, []);

  const cancelBooking = (item, index) => {
    setDisable(true);
    dispatch(VehicleBookingCancelAction(item));
  };

  return (
    <div>
      <AdminNavBar />
      <div className="row">
        <div className=" col-1 col-md-1 d-none d-md-block"></div>
        <div className="col-12 col-md-10 ">
          <h3 className="alert alert-secondary">Vehicle Booking List</h3>

          <table class="table">
            <thead class="table-dark">
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">USER NAME</th>
                <th scope="col">VEHICLE NAME</th>
                <th scope="col">BOOKING START DATE</th>
                <th scope="col">BOOKING END DATE</th>
                <th scope="col">CANCELLATION STATUS</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {[...state.VehicleBookingg.list].map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.bookingId}</th>
                  <td>{item.userInfo.userName}</td>
                  <td>{item.vehicle.vehicleName}</td>
                  <td>{item.bookingStartDate}</td>
                  <td>{item.bookingEndDate}</td>
                  <td>{String(item.cancelled)}</td>

                  <Button
                    variant="outline-danger"
                    className="w-5 mt-1"
                    disabled={disable}
                    onClick={() => cancelBooking(item, index)}
                  >
                    Cancel
                  </Button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-1 col-md-1 d-none d-md-block"></div>
      </div>
    </div>
  );
};
