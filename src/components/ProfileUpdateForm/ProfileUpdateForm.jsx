import { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

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
    urlImage: '',
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await usersService.getOne(user.email);
        if (userData) {
          const formData = {
            username: userData.user.username,
            email: userData.user.email,
            role: userData.user.role,
            urlImage: userData.user.urlImage,
            firstname: userData.customer.firstname,
            lastname: userData.customer.lastname,
            customeraddress: userData.customer.address,
            customerphone: userData.customer.phone,
            paymentinfo: userData.customer.paymentinfo,
          };
  
          // If user role is vendor, add vendor-specific fields
          if (userData.user.role === 'vendor') {
            formData.companyname = userData.vendor.companyname;
            formData.vendoraddress = userData.vendor.address;
            formData.vendorphone = userData.vendor.phone;
          }
  
          setFormData(formData);
        }
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadFileToS3(file);
        setFormData({ ...formData, urlImage: url });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const uploadFileToS3 = async (file) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: 'us-east-2',
    });

    //generate a unique ID for the uploaded file
    const uniqueId = uuidv4().slice(0, 6);
    const fileExtension = file.name.slice(file.name.lastIndexOf('.'));
    const newFileName = `${uniqueId}${fileExtension}`;

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: newFileName, // Key under which to store the file
      Body: file,
    };
  
    const data = await s3.upload(params).promise();
    return data.Location; // Return the URL of the uploaded file
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields based on role */}
      <img src={formData.urlImage} alt="profile" />
      <input type="file" onChange={handleFileChange} />
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
