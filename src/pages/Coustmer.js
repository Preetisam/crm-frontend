import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { fetchTickets, createTicketApi, updateTicketApi } from "../api/ticket";
import Sidebar from "../components/Sidebar";
import { Button, Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Customer() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const [updateTicketModal, setUpdateTicketModal] = useState(false);
  const [currentSelectedTicket, setCurrentSelectedTicket] = useState({});
  const [openCount, setOpenCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);

  const updateCurrentSelectedTicket = (data) => setCurrentSelectedTicket(data);

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
    fetchTicketCounts(); // Fetch ticket counts when the component mounts
  }, []);

  async function fetchTicketData() {
    try {
      const res = await fetchTickets();
      setTicketDetails(res.data);
    } catch (err) {
      console.log("Error occurred during fetching all tickets: ", err);
      setMessage(err.message);
    }
  }

  async function fetchTicketCounts() {
    try {
      const res = await fetchTickets();
      const ticketData = res.data;

      let openCount = 0;
      let closedCount = 0;
      let inProgressCount = 0;
      let blockedCount = 0;

      ticketData.forEach((ticket) => {
        if (ticket.status === "OPEN") {
          openCount++;
        } else if (ticket.status === "CLOSED") {
          closedCount++;
        } else if (ticket.status === "IN_PROGRESS") {
          inProgressCount++;
        } else if (ticket.status === "BLOCKED") {
          blockedCount++;
        }
      });

      setOpenCount(openCount);
      setClosedCount(closedCount);
      setInProgressCount(inProgressCount);
      setBlockedCount(blockedCount);
    } catch (error) {
      console.log("Error occurred while fetching ticket counts:", error);
    }
  }

  const createTicket = (e) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      priority: e.target.priority.value,
    };

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

  const editTicket = (ticketDetail) => {
    const ticket = {
      _id: ticketDetail._id,
      title: ticketDetail.title,
      description: ticketDetail.description,
      assignee: ticketDetail.assignee,
      reporter: ticketDetail.reporter,
      priority: ticketDetail.ticketPriority,
      status: ticketDetail.status,
    };

    setCurrentSelectedTicket(ticket);
    setUpdateTicketModal(true);
    console.log("Selected ticket details are:", JSON.stringify(currentSelectedTicket));
  };

  const onTicketUpdate = (e) => {
    const { name, value } = e.target;
    setCurrentSelectedTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateTicket = (e) => {
    e.preventDefault();

    updateTicketApi(currentSelectedTicket._id, currentSelectedTicket)
      .then((res) => {
        setUpdateTicketModal(false);
        setMessage("Ticket updated successfully");
        fetchTicketData();
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };
  const navigate = useNavigate();

  const logoutFn = () => {
      localStorage.clear();
      navigate("/");
  };

  return (
    <div className="bg-light vh-100">
      <Sidebar />

      <div className="container-fluid pt-5">
        <h3 className="text-center text-success">Welcome, {localStorage.getItem("name")}</h3> 
        <br/>
        <div className="d-flex justify-content-end"onClick={logoutFn }>
        <Button variant="danger">Logout</Button>
      </div>
      <br/>
      </div>
      

      <div className="d-flex justify-content-around">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>OPEN</Card.Title>
            <Card.Text>{openCount} tickets</Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>CLOSED</Card.Title>
            <Card.Text>{closedCount} tickets</Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>IN PROGRESS</Card.Title>
            <Card.Text>{inProgressCount} tickets</Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>BLOCKED</Card.Title>
            <Card.Text>{blockedCount} tickets</Card.Text>
          </Card.Body>
        </Card>
      </div>
     
      
      <p className="text-center text-muted">Take a look at all your tickets below!</p>
      <div className="container-fluid p-5 p-3">
        <MaterialTable
          onRowClick={(event, rowData) => editTicket(rowData)}
          title="Tickets raised by you"
          columns={columns}
          data={ticketDetails}
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

        {createTicketModal && (
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
                  <label className="label label-md input-group-text">Title</label>
                  <input className="form-control" type="text" name="title" required />
                </div>

                <div className="input-group m-1">
                  <label className="label label-md input-group-text">Description</label>
                  <input className="form-control" type="text" name="description" required />
                </div>

                <div className="input-group m-1">
                  <label className="label label-md input-group-text">Priority</label>
                  <select name="priority" id="priority">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end">
                  <Button onClick={() => setCreateTicketModal(false)} variant="secondary" className="m-1">
                    Cancel
                  </Button>

                  <Button type="submit" variant="success" className="m-1">
                    Create
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        )}

        {updateTicketModal && (
          <Modal show={updateTicketModal} centered onHide={() => setUpdateTicketModal(false)}>
            <Modal.Header>Update ticket</Modal.Header>
            <Modal.Body>
              <form onSubmit={updateTicket}>
                <h5 className="card-subtitle text-success lead">ID: {currentSelectedTicket._id}</h5>

                <div className="input-group m-1">
                  <label className="label label-md input-group-text">Title</label>
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    value={currentSelectedTicket.title}
                    disabled
                  />
                </div>

                <div className="input-group m-1">
                  <label className="label label-md input-group-text">Assignee</label>
                  <input
                    type="text"
                    className="form-control"
                    name="assignee"
                    value={currentSelectedTicket.assignee}
                    disabled
                  />
                </div>

                <div className="input-group m-1">
                  <label className="label label-md input-group-text">Priority</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ticketPriority"
                    value={currentSelectedTicket.priority}
                    disabled
                  />
                </div>

                <div className="input-group m-1">
                  <label className="label label-md input-group-text">Description</label>
                  <textarea
                    type="text"
                    rows="3"
                    name="description"
                    value={currentSelectedTicket.description}
                    onChange={onTicketUpdate}
                  />
                </div>

                <div>
                  <label>Status</label>
                  <select onChange={onTicketUpdate} name="status" value={currentSelectedTicket.status}>
                    <option value="OPEN">OPEN</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="BLOCKED">BLOCKED</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="m-1" onClick={() => setUpdateTicketModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="success" className="m-1" type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Customer;
