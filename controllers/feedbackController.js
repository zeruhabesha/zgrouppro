const Feedback = require('../models/Feedback');

// Create a new feedback entry
const createFeedback = async (req, res) => {
  const { userName, userEmail, feedbackType, message, status, response } = req.body;

  try {
    const newFeedback = new Feedback({
      userName,
      userEmail,
      feedbackType,
      message,
      status,
      response,
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback created successfully', newFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all feedback entries
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get feedback by ID
const getFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update feedback by ID
const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const feedback = await Feedback.findByIdAndUpdate(id, updateData, { new: true });

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback updated successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete feedback by ID
const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
};
