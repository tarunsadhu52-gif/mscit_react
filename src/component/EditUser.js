import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const[image, setImage] = useState(null);
  const[preview, setPreview] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    setMessage("");
  };



  


  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async() => {
    const response = await axios.get(`http://localhost:5000/api/get-single-user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.data.data) {
        setFormData(response.data.data);
    }
  }



  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (image && !image.type.startsWith('image/')) {
      newErrors.image = 'Only image files are allowed';
    }
    else if (image && image.size > 2 * 1024 * 1024) {
      newErrors.image = 'Image must be less than 2MB';
    }

    setErrors(newErrors);

    return  Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!validateForm()) {
      return;
    }

    const data = new FormData()

    data.append('name', formData.name)
    data.append('email', formData.email)
    data.append('phone', formData.phone)
    data.append('address', formData.address)
    data.append('password', formData.password)

    if(image) {
      data.append('image', image)
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/update-user/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
      );
      

       console.log(response.data);

      setMessage("User added successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
      });

      setErrors({});

      navigate("/user-data")
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file || null);
    setPreview(file ? URL.createObjectURL(file) : '');
  }



  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="mx-auto max-w-2xl">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit User
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update user account
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 sm:p-8">

          {/* Message */}
          {message && (
            <div
              className={`mb-6 rounded-lg px-4 py-3 text-sm ${
                message.includes("successfully")
                  ? "border border-green-200 bg-green-50 text-green-700"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                }`}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10 digit phone number"
                maxLength={10}
                className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                }`}
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              </div>
           {/* Image */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Image
              </label>

              <input
                type="file"
                name="image"
                value={formData.image}
                onChange={handleImageChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.image}
                </p>
              )}

              {preview && (
                <img src={preview} alt="Preview" className="mt-3 h-24 w-24 object-cover-rouded-md-border" />
              )}
            </div>



                 {/* Password */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                }`}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>


            

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >Submit
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;