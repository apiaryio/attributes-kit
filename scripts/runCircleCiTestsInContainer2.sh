#!/bin/bash

# Load NVM
. ~/nvm/nvm.sh

# Run tests
nvm use 6 && npm -g install npm@latest && rm -rf node_modules && npm install && npm test
