import React, { useState } from "react";
import * as restaurantService from "../../utilities/restaurant-service";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import "./RestaurantForm.css";

export default function RestaurantForm({ user }) {
  const [formData, setFormData] = useState({
    vendor_id: user.email,
    name: "",
    description: "",
    cuisine: "",
    location: "",
    open_hours: "",
    urlImage: "https://www.opentable.com/img/restimages/2038.jpg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      restaurantService.create(formData);
      setFormData({
        vendor_id: user.email,
        name: "",
        description: "",
        cuisine: "",
        location: "",
        open_hours: "",
        urlImage: "https://www.opentable.com/img/restimages/2038.jpg",
      });
    } catch {}
  };

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
    <>
      <h1>Add a Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <img className="formImage" src={formData.urlImage} alt="profile" />
        <input type="file" onChange={handleFileChange} />
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label>Cuisine</label>
        <input
          type="text"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          required
        />
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <label>Open Hours</label>
        <input
          type="text"
          name="open_hours"
          value={formData.open_hours}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Restaurant</button>
      </form>
    </>
  );
}
