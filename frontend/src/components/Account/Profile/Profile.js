import React, { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserContext from "../../../utils/Context/UserContextProvider";
import { ThemeProvider } from "@mui/material";
import AppContext from "../../../utils/Context/AppContextProvider";
import ChangePassword from "../ChangePassword/ChangePassword";
import axios from "axios";
import { toast } from "react-toastify";
import { isValidEmail } from "../Account.utils";

const Profile = () => {
  const { userInfos, userID } = useContext(UserContext);
  const { iconTheme } = useContext(AppContext);

  const [inputsLock, setInputsLock] = useState({
    username: true,
    email: true,
    password: true,
  });

  const [inputsValue, setInputsValue] = useState({ username: "", email: "" });

  const [inputsError, setInputsError] = useState({ username: "", email: "" });

  // const [usernameIsLocked, setUsernameLocker] = useState(true);
  // const [emailIsLocked, setEmailLocker] = useState(true);
  // const [passwordIsLocked, setPasswordLocker] = useState(true);

  // const [usernameInputValue, setUsernameValue] = useState("");
  // const [emailInputValue, setEmailValue] = useState("");

  // const [errUsername, setErrUsername] = useState("");
  // const [errEmail, setErrEmail] = useState("");

  const [defaultValue, setDefaultValue] = useState({
    username: userInfos.username,
    email: userInfos.email,
    password: "NotAPassword",
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleUsernameLock = () => {
    return inputsLock.username
      ? setInputsLock((state) => (state.username = false))
      : setInputsLock((state) => (state.username = true));
  };

  const toggleEmailLock = () => {
    return inputsLock.email
      ? setInputsLock((state) => (state.email = false))
      : setInputsLock((state) => (state.email = true));
  };

  const toggleInput = (input) => {
    return inputsLock.input
      ? setInputsLock((state) => (state.input = false))
      : setInputsLock((state) => (state.input = true));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const getCloseState = (state) => {
    setIsOpen(state);
  };

  const handleUsername = (e) => {
    e.preventDefault();
    let data = { user_id: userID, newUsername: inputsValue.username };

    if (inputsValue.username.length > 3) {
      axios
        .patch("http://localhost:5000/user/username", data)
        .then((res) => {
          if (res.status === 200) {
            setInputsError("");
            setDefaultValue((state) => {
              return (state.username = data.newUsername);
            });
            setInputsValue((state) => (state.username = ""));
            toast.success("Username succesfully updated", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      setInputsError(
        (state) =>
          (state.username = "Username must be contain at least 3 characters")
      );
    }
  };

  const handleEmail = (e) => {
    e.preventDefault();
    let data = { user_id: userID, newEmail: inputsValue.email };
    if (isValidEmail(inputsValue.email)) {
      axios
        .patch("http://localhost:5000/user/email", data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Email has been succesfull updated");
            setDefaultValue((state) => {
              return (state.email = data.newEmail);
            });
            setInputsValue((state) => (state.email = ""));
            setInputsError((state) => (state.email = ""));
          }
        })
        .catch((err) => console.log(err));
    } else {
      setInputsError((state) => (state.email = "This is not a valid Email"));
    }
  };

  return (
    <ThemeProvider theme={iconTheme}>
      <div className="profile">
        <ChangePassword isOpen={isOpen} getCloseState={getCloseState} />
        <div data-blur={isOpen ? "is-active" : ""} className="blur"></div>
        <form
          method="POST"
          className="aera username"
          onSubmit={(e) => handleUsername(e)}
        >
          <div className="username-icon">
            <AccountCircleIcon />
          </div>
          <div>
            <input
              type="text"
              disabled={inputsLock.username}
              defaultValue={defaultValue.username}
              onChange={(e) =>
                setInputsValue((state) => (state.username = e.target.value))
              }
              name="username"
            />
            <div className="username-error">{inputsError.username}</div>
          </div>
          <button type="button" onClick={toggleUsernameLock}>
            <EditIcon />
          </button>
          <button type="submit" disabled={inputsLock.username}>
            <DoneIcon />
          </button>
        </form>

        <form className="aera email" onClick={handleEmail}>
          <div className="email-icon">
            <EmailIcon />
          </div>
          <div>
            <input
              type="email"
              disabled={inputsLock.email}
              defaultValue={userInfos.email}
              name="email"
              onChange={(e) =>
                setInputsValue((state) => (state.email = e.target.value))
              }
            />
            <div className="error-email">{inputsError.email}</div>
          </div>
          <button type="button" onClick={toggleEmailLock}>
            <EditIcon />
          </button>
          <button type="button" disabled={inputsLock.email}>
            <DoneIcon />
          </button>
        </form>

        <div className="aera password">
          <div className="password">
            <LockIcon />
          </div>
          <input
            type="password"
            disabled={inputsLock.password}
            defaultValue={"NotaPassword"}
            autoComplete="false"
          />
          <button type="button" onClick={() => openModal()}>
            <EditIcon />
          </button>
          <button type="button">
            <DoneIcon />
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Profile;
