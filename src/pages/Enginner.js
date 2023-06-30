import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { fetchEngineers, updateEngineerApi } from "../api/engineer";
import Sidebar from "../components/Sidebar";
import { Button, Modal } from "react-bootstrap";
import React from "react";

function Engineer() {
  const [engineerDetails, setEngineerDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [updateTicketModal, setUpdateTicketModal] = useState(false);
  const [currentSelectedEngineer, setCurrentSelectedEngineer] = useState({});

  // const updateCurrentSelectedEngineer = (data) =>
  //   setCurrentSelectedEngineer(data);

  const columns = [
    {
      title: "ID",
      field: "_id",
    },
    {
      title: "TITLE",
      field: "title",
    },
    { title: "DESCRIPTION", field: "description" },
    { title: "REPORTER", field: "reporter" },
    { title: "PRIORITY", field: "ticketPriority" },
    { title: "STATUS", field: "status" },
  ];

  useEffect(() => {
    fetchEngineerData();
  }, []);

  // Function to fetch engineer data
  const fetchEngineerData = async () => {
    try {
    
      const response = await fetchEngineers();
      // Handle success
      setEngineerDetails(response.data);
    } catch (error) {
      // Handle error
      console.error("Error fetching engineer data:", error);
      // Perform any error handling or show an error message
    }
  };
  const editEngineer = (rowData) => {
    setCurrentSelectedEngineer(rowData);
    setUpdateTicketModal(true);
  };

  return (
    <div>
      <div className="bg-light vh-100">
        <Sidebar />
        <div className="container-fluid pt-5">
          <h3 className="text-center text-success">
            Welcome, {localStorage.getItem("name")}
          </h3>
        </div>
        <p className="text-center text-muted">
          Take a look at all your tickets below!
        </p>
        <div className="container-fluid p-5 p-3">
          <MaterialTable
            onRowClick={(event, rowData) => editEngineer(rowData)}
            title="Tickets raised by you"
            columns={columns}
            data={engineerDetails}
          />
          <hr />
          <p className="text-primary text-center">{message}</p>
          <h4 className="text-center">Facing any issues? Raise a ticket!</h4>
          <button
            className="btn btn-lg btn-success form-control"
            onClick={() => setCreateTicketModal(true)}
          >
            Raise ticket
          </button>

          {createTicketModal ? (
            <Modal
              show={createTicketModal}
              onHide={() => setCreateTicketModal(false)}
              centered
              backdrop="static"
            >
              <Modal.Header closeButton>Create a new ticket</Modal.Header>
              <Modal.Body>
                <form onSubmit={createTicket}>
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Title
                    </label>
                    <input className="form-control" type="text" name="title" required />
                  </div>

                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Description
                    </label>
                    <input className="form-control" type="text" name="description" required />
                  </div>

                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Priority
                    </label>
                    <select name="priority" id="priority">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-end">
                    <Button
                      onClick={() => setCreateTicketModal(false)}
                      variant="secondary"
                      className="m-1"
                    >
                      Cancel
                    </Button>

                    <Button type="submit" variant="success" className="m-1">
                      Create
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          ) : null}

          {updateTicketModal ? (
            <Modal
              show={updateTicketModal}
              centered
              onHide={() => setUpdateTicketModal(false)}
            >
              <Modal.Header>Update ticket</Modal.Header>
              <Modal.Body>
                <form onSubmit={updateTicket}>
                  <h5 className="card-subtitle text-success lead">
                    ID: {currentSelectedEngineer._id}
                  </h5>

                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Title
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      value={currentSelectedEngineer.title}
                      disabled
                    />
                  </div>

                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Assignee
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="assignee"
                      value={currentSelectedEngineer.assignee}
                      disabled
                    />
                  </div>

                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Priority
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="ticketPriority"
                      value={currentSelectedEngineer.priority}
                      disabled
                    />
                  </div>

                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Description
                    </label>
                    <textarea
                      type="text"
                      rows="3"
                      name="description"
                      value={currentSelectedEngineer.description}
                      onChange={onTicketUpdate}
                    />
                  </div>

                  <div>
                    <label>Status</label>
                    <select
                      onChange={onTicketUpdate}
                      name="status"
                      value={currentSelectedEngineer.status}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      className="m-1"
                      onClick={() => setUpdateTicketModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="success" className="m-1" type="submit">
                      Update
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Engineer;
``
