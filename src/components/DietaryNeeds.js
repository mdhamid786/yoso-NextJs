"use client";
import React from "react";

const DietaryNeeds = () => {
  return (
    <>
      <div className="single__widget widget__bg">
        <h2 className="widget__title position__relative h3">PRICE</h2>
        <ul className="widget__form--check">
          <li className="widget__form--check__list">
            <label className="widget__form--check__label" htmlFor="radio1">
              ₹0 - ₹1000
            </label>
            <input
              className="widget__form--check__input"
              id="radio1"
              type="radio"
              name="priceRange"
            />
            <span className="widget__form--checkmark" />
          </li>
          <li className="widget__form--check__list">
            <label className="widget__form--check__label" htmlFor="radio2">
              ₹1001 - ₹5000
            </label>
            <input
              className="widget__form--check__input"
              id="radio2"
              type="radio"
              name="priceRange"
            />
            <span className="widget__form--checkmark" />
          </li>
          <li className="widget__form--check__list">
            <label className="widget__form--check__label" htmlFor="radio3">
              ₹5001 - Above
            </label>
            <input
              className="widget__form--check__input"
              id="radio3"
              type="radio"
              name="priceRange"
            />
            <span className="widget__form--checkmark" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default DietaryNeeds;
