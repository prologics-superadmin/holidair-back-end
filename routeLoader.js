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
};
