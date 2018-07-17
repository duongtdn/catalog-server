"use strict"

import React from 'react'
import { hydrate } from "react-dom"
import Course from "../components/Course"

hydrate(<Course data = {window.DATA} />, document.getElementById("root"));