#!/bin/bash

# Define usage function
function usage {
    echo "Usage: $0 owner repo release"
    exit 1
}

# Check if the number of arguments is correct
if [ $# -ne 3 ]; then
    usage
fi

# Store the arguments in variables
owner="$1"
repo="$2"
release="$3"

# Check if release exists
response=$(curl -s "https://api.github.com/repos/$owner/$repo/releases/tags/$release")
if [[ "$response" == *"tag_name"* ]]
then
   echo "Release $release of $owner/$repo already exists on GitHub."
   exit 0
else
   echo "Release $release of $owner/$repo does not exist on GitHub yet."
   exit 1
fi
