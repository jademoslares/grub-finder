import { useState, useEffect } from "react";

export default function ProfileUpdateForm({ user }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(formData);
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>User Name</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <button type="submit">UPDATE PROFILE</button>
        </form>
      </div>
    </div>
  );
}
