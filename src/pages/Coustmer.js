import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import { Button, DropdownButton, Modal,  Dropdown} from "react-bootstrap";
import { fetchTicket,createTicketApi } from "../api/ticket";

function Customer() {
    const [ticketDetails, setTicketDetails] = useState([]);
    const [message, setMessage] = useState("");
    const [createTicketModal, setCreateTicketModal] = useState(false);
    const [priority, setPriority] = useState("");
  
    const columns = [
      {
        title: "ID",
        field: "_id",
      },
      {
        title: "TITLE",
        field: "title",
      },
      {
        title: "DESCRIPTION",
        field: "description",
      },
      {
        title: "ASSIGNEE",
        field: "assignee",
      },
      {
        title: "PRIORITY",
        field: "ticketPriority",
      },
      {
        title: "STATUS",
        field: "status",
      },
    ];
  
    useEffect(() => {
      fetchTicketData();
    }, []);
  
    async function fetchTicketData() {
      try {
        const res = await fetchTicket();
        setTicketDetails(res.data);
      } catch (err) {
        console.log(
          "Error occurred during fetching all tickets: " + err.message
        );
        setMessage(err.message);
      }
    }
  
    const createTicket = (e) => {
      e.preventDefault();
  
      const data = {
        title: e.target.elements.title.value,
        description: e.target.elements.description.value,
        priority: priority,
      };
      console.log("Data for creating ticket is " + JSON.stringify(data));
  
      createTicketApi(data)
        .then((response) => {
          setCreateTicketModal(false);
          setMessage("Ticket created successfully");
          fetchTicketData();
        })
        .catch((err) => {
          setMessage(err.message);
        });
    };
  
    return (
      <div className="bg-light vh-100">
        <Sidebar />
        <div className="container-fluid pt-5">
          <h3 className="text-center text-success">
            Welcome, {localStorage.getItem("name")}
          </h3>
        </div>
        <p className="text-center text-muted">Take a look at all tickets below</p>
        <div className="container-fluid pt-5 p-3">
          <MaterialTable
            title="Ticket raised by you"
            columns={columns}
            data={ticketDetails}
          />
          <hr />
          <p className="text-primary text-center">{message}</p>
          <h4 className="text-center "> Facing any issues ? Raise a ticket!</h4>
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
            >
              <Modal.Header closeButton>Create a new Ticket</Modal.Header>
              <Modal.Body>
                <form onSubmit={createTicket}>
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Title
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      required
                    />
                  </div>
  
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Description
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="description"
                      required
                    />
                  </div>
                  <div className="input-group m-1">
                    <label className="label label-md input-group-text">
                      Priority
                    </label>
                    <DropdownButton
                      align="end"
                      title={priority}
                      id="priority"
                      onSelect={(value) => setPriority(value.toString())}
                      variant="light"
                    >
                      <Dropdown.Item eventKey="1" fw-normal="true">1</Dropdown.Item>
                     <Dropdown.Item eventKey="2" fw-normal="true">2</Dropdown.Item>
                    <Dropdown.Item eventKey="3" fw-normal="true">3</Dropdown.Item>
                    <Dropdown.Item eventKey="4" fw-normal="true">4</Dropdown.Item>

                    </DropdownButton>
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
                      {" "}
                      Create
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
  
  export default Customer;