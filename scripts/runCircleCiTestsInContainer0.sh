#!/bin/bash

# Load NVM
. ~/nvm/nvm.sh

# Run tests
nvm use 0.12 && npm -g install npm@latest && rm -rf node_modules && npm install && npm test
nvm use 0.10.43 && npm -g install npm@latest && rm -rf node_modules && npm install && npm test
