// src/components/RequirementForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './RequirementForm.css';

const RequirementForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requirement = { title, description, priority, tags: tags.split(',') };
    try {
      await axios.post('http://localhost:5000/api/requirements', requirement);
      alert('Requirement submitted successfully');
      // Clear the form
      setTitle('');
      setDescription('');
      setPriority('');
      setTags('');
    } catch (error) {
      console.error('There was an error submitting the requirement!', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Title:</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label className="form-label">Priority:</label>
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Tags (comma-separated):</label>
        <input
          type="text"
          className="form-input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit" className="form-button">Submit</button>
    </form>
  );
};

export default RequirementForm;
