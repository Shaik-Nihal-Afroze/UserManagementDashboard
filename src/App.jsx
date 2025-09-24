import React, { useEffect, useState } from "react";
import { fetchUsers } from "./services/api";
import UserList from "./components/UserList";

import "./App.css";

const App = () => {
  return(
    <UserList/>
  )
}
export default App;
