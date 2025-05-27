import React, { useState } from 'react';

function SimpleForm() {
  const [form, setForm] = useState({
    Name : '',
    Email: '',
    Address: '',
    Phone: '',
    Password: '',
  });

  const formChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    alert('Form submitted Successfully!');
    
    setForm({
      Name: '',
      Email: '',
      Address: '',
      Phone: '',
      Password: '',
    });
  }
  return (
    <div>
      <h2>Simple React Form</h2>
      <form onSubmit={formSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text" id="Name"  name="Name" value={form.Name}  onChange={formChange} />
        </div>
        <br />
        <div>
          <label>Email:</label>
          <input
            type="email" id="Email" name="Email"  value={form.Email}  onChange={formChange} />
        </div>
        <br />
        <div>
          <label>Address:</label>
          <input
            type="text" id="Address" name="Address"  value={form.Address} onChange={formChange} />
        </div>
        <br />
        <div>
          <label>Phone.no:</label>
          <input
            type="Number" id="Phone"  name="Phone" value={form.Phone} onChange={formChange} />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <input type="Password" id="Password"  name="Password" value={form.Password} onChange={formChange}/>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SimpleForm;

