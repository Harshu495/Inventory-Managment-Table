import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import InventoryTable from "./component/table";
import InventoryForm from "./component/Form";
import Sidebar from "./component/SideBarMenu"
import "./style.css"

function App() {

  return (
    <div className="App">
      <div className="sideNav">
        <Sidebar />
      </div>
      <div className="tableContainer">
        <h1>Inventory Management Table</h1>
        <InventoryForm />
        <InventoryTable />
      </div>

    </div>
  );
}

export default App;
