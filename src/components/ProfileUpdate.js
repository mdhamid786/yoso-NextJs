"use client";
import Link from "next/link";
import React from "react";

const ProfileUpdate = () => {
  return (
    <div>
      <form>
        <label>
          <li className="account__menu--list active">
            <Link href="/address">Update Profile</Link>
          </li>
          <input
            className="account__login--input"
            placeholder="Enter Name"
            type="text"
          />
        </label>
        <label>
          <input
            className="account__login--input"
            placeholder="Enter Email"
            type="email"
          />
        </label>

        <button className="account__login--btn primary__btn" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
