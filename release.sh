#!/bin/bash

# Set variables
owner="tillg"
repo="multi-ai-chat"
release=$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json)

echo "Releasing release $release"

# Call the script with variables as arguments
./gh_checkrelease.sh "$owner" "$repo" "$release"
result=$?

# Check the exit code and act accordingly
if [ $result -eq 0 ]; then
    echo "The release already exists on Github. Delete it there in case you want to re-release it."
    echo "Aborting the release process."
    exit 1
fi

# Get commit message of that release
# commit_message = $(./gh_getCommitMessage.sh "$release")

# check if there were any errors
# if [ $? -ne 0 ]; then
#     echo "Error while retrieving commit message."
#     echo "Aborting the release process."
#     exit 1
# fi

npm build

rm build.zip
zip -r build.zip build
gh release create "$release"  build.zip
