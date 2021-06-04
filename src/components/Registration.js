import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createUserAction, updateUserAction } from "../redux/RegisterReducer";

export function Registration() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state);

  const [name, setNAme] = useState(state.register.ref.name);
  const [userName, setUserNAme] = useState(state.register.ref.userName);
  const [email, setEmail] = useState(state.register.ref.email);
  const [password, setPassword] = useState(state.register.ref.email);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateName = (e) => setNAme(e.target.value);
  const updateUserName = (e) => setUserNAme(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const addUser = (e) => {
    e.preventDefault();
    console.log(name, userName, email, password);

    dispatch(
      createUserAction({
        name,
        userName,
        email,
        password,
      })
    );

    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 3000);

    setNAme("");
    setUserNAme("");
    setEmail("");
    setPassword("");
  };

  const updateUser = () => {
    dispatch(
      updateUserAction({
        id: state.register.ref.id,
        name,
        userName,
        email,
        password,
      })
    );
    setNAme("");
    setUserNAme("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block "></div>
      <div className="col-12 col-md-6">
        <div>
          <h1 className="bg-light text-info p-3">
            {state.register.ref.id ? "Edit Changes" : "Sign Up"}
          </h1>

          <div className="mb-1 p-1">
            <input
              type="text"
              value={name}
              onChange={(e) => updateName(e)}
              placeholder="Enter Name"
              className="form-control"
            />
          </div>

          <div className="mb-1 p-1">
            <input
              type="text"
              value={userName}
              onChange={(e) => updateUserName(e)}
              placeholder="Enter Username"
              className="form-control"
            />
          </div>

          <div className="mb-1 p-1">
            <input
              type="text"
              value={email}
              onChange={(e) => updateEmail(e)}
              placeholder="Enter Email"
              className="form-control"
            />
          </div>

          <div className="mb-1 p-1">
            <input
              type="password"
              value={password}
              onChange={(e) => updatePassword(e)}
              placeholder="Enter Password"
              className="form-control"
            />
          </div>

          {successOperation && (
            <div className="alert alert-success">Registered</div>
          )}

          <div className="mb-1 p-2">
            {state.register.ref.id ? (
              <input
                type="button"
                className="btn btn-warning"
                value="Update"
                onClick={() => updateUser()}
              />
            ) : (
              <input
                type="button"
                value="Register"
                onClick={(e) => addUser(e)}
                className="btn btn-success "
              />
            )}
          </div>
        </div>
      </div>
      <div className="col-3 col-md-3 d-none d-md-block"></div>
    </div>
  );
}
