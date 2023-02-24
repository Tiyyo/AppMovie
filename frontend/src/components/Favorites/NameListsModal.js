import React, { useContext, useId, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ListContext from "../../utils/Context/ListsContextProvider";
import UserContext from "../../utils/Context/UserContextProvider";
import axios from "axios";

const NameListsModal = (props) => {
  const { isOpen, getCloseState, content, getLists } = props;
  const { lists, setLists } = useContext(ListContext);
  const { userID } = useContext(UserContext);
  const id = useId();

  console.log(userID);

  const createList = (nameList, content, id) => {
    let list = {
      id,
      name: nameList,
      content,
    };
    return list;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = e.target[0].value;
    axios
      .post("http://localhost:5000/list", {
        name: inputValue,
        content: content,
        user_id: userID,
        email: "siteez971@live.fr",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // const list = createList(inputValue, content, id);
    // setLists((prevLists) => [...prevLists, list]);
    // getLists(lists);
    e.target[0].value = "";
  };

  return (
    <div
      className="name-modal"
      style={isOpen ? { opacity: 1 } : { opacity: 0 }}
    >
      <div
        className="close-icon"
        onClick={() => {
          getCloseState(false);
        }}
      >
        <CloseIcon />
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" />
      </form>
    </div>
  );
};

export default NameListsModal;
