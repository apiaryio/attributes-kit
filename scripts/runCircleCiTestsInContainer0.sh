#!/bin/bash

# Load NVM
. ~/nvm/nvm.sh

# Run tests
nvm use 0.10.40 && rm -rf node_modules && npm install && npm test
nvm use 0.12.7 && rm -rf node_modules && npm install && npm test
