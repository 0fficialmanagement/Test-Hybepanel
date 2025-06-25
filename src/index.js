import React from "react";
import Onboarding from "./Onboarding";
// import "../public/index.html";

import "./index.css";

import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Onboarding />);
