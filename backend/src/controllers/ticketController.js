const Ticket = require("../models/ticket.models");

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
    } else {
      res.json(ticket);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;
    const ticket = new Ticket({ title, description, status, assignedTo });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assignedTo } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { title, description, status, assignedTo },
      { new: true }
    );

    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
    } else {
      res.json(ticket);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
    } else {
      res.json({ message: "Ticket deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
