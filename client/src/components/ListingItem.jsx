import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";

export const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[330px] rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover rounded-lg hover:scale-105 transition-scale duration-300 border-1"
        />

        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700">
            {listing.name.length > 20
              ? listing.name.slice(0, 40) + "..."
              : listing.name}
          </p>
        </div>

        <div className=" flex items-center gap-1 ">
          <MdLocationOn className="h-4 w-4 text-green-700" />
          <p className="text-sm text-gray-700">{listing.address}</p>
        </div>

        <div className="text-sm text-gary-600 line-clamp-2">
          <p>{listing.description}</p>
        </div>
        <p className="text-slate-500 mt-2 font-semibold ">
          {" "}
          $
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")}
          {listing.type === "rent" && "/month"}
        </p>

        <div>
          <div className="text-slate font-bold text-sm flex items-center gap-4">
            <div className=" flex items-center gap-1">
              <FaBed className="text-lg text-green-700" />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className="flex items-center gap-1">
              <FaBath className="text-lg text-green-700" />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
