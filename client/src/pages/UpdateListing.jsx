import React, { useRef, useState,useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate , useParams} from 'react-router-dom'

export const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate =useNavigate();
   const params = useParams();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    parking: false,
    furnished: false,
    offer: false,
    userRef: currentUser._id,
  });
  console.log(formData);
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

//   useEffect(()=>{
//     const fetchListing = async () =>{

//       const listingId = params.listingId;
//       console.log(listingId);
//    const  res = await fetch(`/api/listing/get/${listingId}`);
//    const data = await res.json();
//    if(data.success === false){
//     console.log(data.message);
//     return;
//    }




//     }
//     fetchListing();
//   },[])

useEffect(() => {
  const fetchListing = async () => {
    try {
      const { listingId } = params;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();

      // If your backend does not send `success: true`, just check for _id
      if (!data._id) {
        console.log("Listing not found");
        return;
      }

      // Populate formData with fetched data
      setFormData({
        name: data.name,
        description: data.description,
        address: data.address,
        type: data.type,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        regularPrice: data.regularPrice,
        discountPrice: data.discountPrice,
        parking: data.parking,
        furnished: data.furnished,
        offer: data.offer,
        imageUrls: data.imageUrls || [],
        userRef: data.userRef,
      });

    } catch (err) {
      console.error(err);
    }
  };

  fetchListing();
}, [params.listingId]);

  const handleImageSubmit = async () => {
    if (files.length === 0) {
      setImageUploadError("Please select at least one image");
      return;
    }

    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError("You can upload maximum 6 images");
      return;
    }

    try {
      setUploading(true);
      setImageUploadError("");

      const uploadPromises = files.map(async (file) => {
        const uploadData = new FormData();
        uploadData.append("image", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Image upload failed");
        }

        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...uploadedUrls],
      }));

      setFiles([]);
      setUploading(false);
    } catch (error) {
      setImageUploadError(error.message || "Image upload failed");
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData((prev) => ({
        ...prev,
        type: e.target.id,
      }));
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.checked,
      }));
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.tagName === "TEXTAREA"
    ) {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length < 1) {
      setError("You must upload at least one image");

      return;
    }

    if (+formData.discountPrice > +formData.regularPrice) {
      setError("Discount price must be less than regular price");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create listing");
      }

      setLoading(false);
      console.log("Listing created:", data);
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg bg-amber-50"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />

          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg bg-amber-50"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg bg-amber-50"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg bg-amber-50"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg bg-amber-50"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg bg-amber-50"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">$/Month</span>
              </div>
            </div>

            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg bg-amber-50"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">$/Month</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="p-3 border border-gray-300 rounded w-full bg-amber-50"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              disabled={uploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-xl disabled:opacity-80 bg-amber-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {imageUploadError && (
            <p className="text-red-700 text-sm">{imageUploadError}</p>
          )}

          {formData.imageUrls.map((url, index) => (
            <div
              key={url}
              className="flex justify-between p-3  border items-center rounded-lg object-cover"
            >
              <img
                src={url}
                alt="listing"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>

          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

