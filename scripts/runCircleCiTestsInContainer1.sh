#!/bin/bash

# Load NVM
. ~/nvm/nvm.sh

# Run tests
nvm use 4.3.2 && npm -g install npm@latest && rm -rf node_modules && npm install && npm test
