#!/bin/sh
py seeding.py 1 && node import-dev-data.js --delete 1 && node import-dev-data.js --import 1 && py seeding.py 2 && node import-dev-data.js --delete 2 && node import-dev-data.js --import 2