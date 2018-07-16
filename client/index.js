"use strict"

import React from 'react'
import { hydrate } from "react-dom"
import Catalog from "../render/Catalog"

console.log('client')

import { getJSON } from 'simple-json-xhr'

getJSON({
  endPoint: '/data/catalog/ca-emb',
  onSuccess({status, data}) {
    hydrate(<Catalog data = {data.data} />, document.getElementById("root"));
  }
})
