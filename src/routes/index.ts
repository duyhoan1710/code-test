import React from "react";

const Home = () => React.lazy(() => import("../App"));

const router = [
  {
    path: "/",
    component: Home,
  },
];

export default router;
