import { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";

export default function ProfileUpdateForm({ user, setUpdateForm }) {
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    password: '',
    role: user.role || '',
    firstname: '',
    lastname: '',
    customeraddress: '',
    customerphone: '',
    paymentinfo: '',
    companyname: '',
    vendoraddress: '',
    vendorphone: '',
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await usersService.getOne(user.email);
        if (userData) {
          setFormData({
            username: userData.user.username,
            email: userData.user.email,
            role: userData.user.role,
            firstname: userData.customer.firstname,
            lastname: userData.customer.lastname,
            customeraddress: userData.customer.address,
            customerphone: userData.customer.phone,
            paymentinfo: userData.customer.paymentinfo,
            companyname: userData.vendor.companyname,
            vendoraddress: userData.vendor.address,
            vendorphone: userData.vendor.phone
          });
        }
        console.log(userData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [user.email]);
  

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    try{
      usersService.updateUser(user.email, formData);
      setUpdateForm(false);
    } catch (err){
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields based on role */}
      <h2>User Information</h2>
      <label>Username</label>
      <input type="text" name="username" value={formData.username} onChange={handleChange} />
      <label>Email</label>
      <label>{formData.email}</label>
      <label>Password</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} />

      <label>First Name</label>
      <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
      <label>Last Name</label>
      <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
      <label>Address</label>
      <input type="text" name="customeraddress" value={formData.customeraddress} onChange={handleChange} />
      <label>Phone</label>
      <input type="text" name="customerphone" value={formData.customerphone} onChange={handleChange} />
      <label>Payment Info</label>
      <input type="text" name="paymentinfo" value={formData.paymentinfo} onChange={handleChange} />

      {formData.role === 'vendor' && (
        <>
        <h2>Vendor Information</h2>
          <label>Company Name</label>
          <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} />
          <label>Address</label>
          <input type="text" name="vendoraddress" value={formData.vendoraddress} onChange={handleChange} />
          <label>Phone</label>
          <input type="text" name="vendorphone" value={formData.vendorphone} onChange={handleChange} />
        </>
      )}
      <button type="submit">Update</button>
    </form>
  );
}
