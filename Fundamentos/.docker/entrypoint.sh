#!/bin/bash

npm install
npm run build
npm run migration:up
npm run start:dev