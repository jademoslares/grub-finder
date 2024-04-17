import { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import './ProfileUpdateForm.css';
import { Link } from 'react-router-dom';

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
      accessKeyId: 'AKIA5FTZCU47WYBWDPKO',
      secretAccessKey: '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',
      region: 'us-east-2',
    });

    //generate a unique ID for the uploaded file
    const uniqueId = uuidv4().slice(0, 6);
    const fileExtension = file.name.slice(file.name.lastIndexOf('.'));
    const newFileName = `${uniqueId}${fileExtension}`;

    const params = {
      Bucket: 'grubfinder-storage',
      Key: newFileName, // Key under which to store the file
      Body: file,
    };
  
    const data = await s3.upload(params).promise();
    return data.Location; // Return the URL of the uploaded file
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields based on role */}
      <div className="form-image">
      <img className="profile-photo"
      src={formData.urlImage} alt="profile" style={{ width: "150px", height: "150px" }} />
      <br />
      <br />
      <input className="pic-upload"type="file" onChange={handleFileChange} />
      </div>
      <div className="form-details">
      <h2>User Information</h2>
      <span><label>Username </label> &nbsp;
      <input type="text" name="username" value={formData.username} onChange={handleChange} /></span>
      <br />
      <span><label>Email </label> &nbsp;
      <input type="text" name="password" value={formData.email} onChange={handleChange} /></span>
      <br />
      <span><label>Password </label> &nbsp;
      <input type="password" name="password" value={formData.password} onChange={handleChange} /></span>
      <br />
      <span><label>First Name </label> &nbsp;
      <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} /></span>
      <br />
      <span><label>Last Name </label> &nbsp;
      <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} /></span>
      <br />
      <span><label>Address </label> &nbsp;
      <input type="text" name="customeraddress" value={formData.customeraddress} onChange={handleChange} /></span>
      <br />
      <span><label>Phone </label> &nbsp;
      <input type="text" name="customerphone" value={formData.customerphone} onChange={handleChange} /></span>
      <br />
      <span><label>Payment Info </label> &nbsp;
      <input type="text" name="paymentinfo" value={formData.paymentinfo} onChange={handleChange} /></span>
      <br />

      <button type="submit">Update</button>

      {formData.role === 'vendor' && (
        <>
          <div>
          <br />
          <hr />
          <br />
        <h2>Vendor Information</h2>
          <br />
        <Link to="/VendorAdminPage"><button>View my Vendor Portal</button></Link>
        </div>

          {/* <label>Company Name</label>
          <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} />
          <label>Address</label>
          <input type="text" name="vendoraddress" value={formData.vendoraddress} onChange={handleChange} />
          <label>Phone</label>
          <input type="text" name="vendorphone" value={formData.vendorphone} onChange={handleChange} /> */}
        </>
      )}
    </div>
    </form>
  );
}
