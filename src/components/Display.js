import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  deleteUserAction,
  updateRefUser,
  viewAllUsers,
  viewById,
} from "../redux/RegisterReducer";
import { RegisterModal } from "./RegisterModal";

export function Display() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [successOperation, setSuccessOperation] = useState(false);

  useEffect(() => {
    dispatch(viewAllUsers());
  }, []);

  const deleteUser = (item, index) => {
    dispatch(deleteUserAction(item));

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 3000);
  };

  const updateUser = (item) => {
    dispatch(updateRefUser(item));

    history.push("/register");
  };

  const getById = (item) => {
    dispatch(viewById(item));
  };

  return (
    <div className="row">
      <div className="col-3 col-md-2 d-none d-md-block"></div>
      <div className="col-12 col-md-8">
        <h3 className="alert alert-secondary">Registered Users</h3>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Name</th>
              <th scope="col">UserName</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...state.register.list].map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.userName}</td>
                <td>{item.password}</td>
                <td>{item.email}</td>

                <td>
                  <input
                    type="button"
                    value="Details"
                    className="btn btn-link"
                    onClick={() => getById(item)}
                  />
                  /
                  <input
                    type="button"
                    value="Edit"
                    onClick={() => updateUser(item)}
                    className="btn btn-link text-warning"
                  />
                  /
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => deleteUser(item, index)}
                    className="btn btn-link text-danger"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {successOperation && (
          <div className="alert alert-danger">User Deleted</div>
        )}
      </div>
      <div className="col-3 col-md-2 d-none d-md-block"></div>

      <RegisterModal />
    </div>
  );
}
