#!/bin/bash

# Load NVM
. ~/nvm/nvm.sh

# Run tests
nvm use 5.7.1 && npm -g install npm@latest && rm -rf node_modules && npm install && npm test
