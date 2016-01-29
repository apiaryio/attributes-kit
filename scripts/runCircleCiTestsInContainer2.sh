#!/bin/bash

# Load NVM
. ~/nvm/nvm.sh

# Run tests
nvm use 5.0.0 && npm -g install npm@latest-2 && rm -rf node_modules && npm install && npm test
