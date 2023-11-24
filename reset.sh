#!bin/bash

echo "Flushing node modules ....."
rm -r node_modules
echo "Re installing packages from the package.json file"
npm install
echo ">>>>>>>> Done >>>>>>>"

