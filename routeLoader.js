// routeLoader.js
const express = require("express");
const auth = require("./src/middlewares/jwtMiddleware");
// const jwtMiddleware = require("./src/middlewares/jwtMiddleware"); // Import your JWT middleware

// user routes
const userRoutes = require("./src/routes/UserManagement/userRoutes");
const userRoleRoutes = require("./src/routes/UserManagement/userRoleRoutes");
const UserPermisiions = require("./src/routes/UserManagement/userPermissionRoutes");
const rolePermission = require("./src/routes/UserManagement/rolePermissionRoutes");
const BannerRoutes = require("./src/routes/bannerRoutes");
const DestinationRoutes = require("./src/routes/destinationRoutes");
const ReviewRoutes = require("./src/routes/reviewRoutes");
const CountryRoutes = require("./src/routes/countryRoutes");
const FlightOfferRoutes = require("./src/routes/flightOfferRoutes");
const PackageRoutes = require("./src/routes/packageRoutes");
const flightSearchRoutes = require("./src/routes/flightSearchRoutes");
const hotelSearchRoutes = require("./src/routes/hotelSearchRoutes");
const attractionSearchRoutes = require("./src/routes/attractionSearchRoutes");
const flightBookingRoutes = require("./src/routes/flightBookingRoutes");
const hotelBookingRoutes = require("./src/routes/hotelBookingRoutes");
const attractionBookingRoutes = require("./src/routes/attractionBookingRoutes");
const userProfileRoutes = require("./src/routes/UserManagement/userProfileRoutes");
const adminBookingRoutes = require("./src/routes/bookingRoutes");
const markupPriceRoutes = require("./src/routes/markupPriceRoutes");
const markupRoutes = require("./src/routes/markupRoutes");
module.exports = (app) => {
  // User routes
  app.use("/api/users", userRoutes);
  app.use("/api/user-roles", userRoleRoutes);
  app.use("/api/role-permissions", rolePermission);
  app.use("/api/user-permissions", UserPermisiions);
  app.use("/api/banner", BannerRoutes);
  app.use("/api/destination", DestinationRoutes);
  app.use("/api/review", ReviewRoutes);
  app.use("/api/country", CountryRoutes);
  app.use("/api/flight-offer", FlightOfferRoutes);
  app.use("/api/package", PackageRoutes);
  app.use("/api/flight-search", flightSearchRoutes);
  app.use("/api/hotel-search", hotelSearchRoutes);
  app.use("/api/attraction", attractionSearchRoutes);
  app.use("/api/flight-booking", flightBookingRoutes);
  app.use("/api/hotel-booking", hotelBookingRoutes);
  app.use("/api/attraction-booking", attractionBookingRoutes);
  app.use("/api/user-profile", userProfileRoutes);
  app.use("/api/admin/bookings", adminBookingRoutes);
  app.use("/api/markup-price", markupPriceRoutes);
  app.use("/api/markup", markupRoutes);
};
