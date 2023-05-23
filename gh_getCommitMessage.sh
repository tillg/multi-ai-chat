#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <tag>"
  exit 1
fi

tag="$1"
msg=$(git show -s --format=%B "$tag^{commit}")

if [ -n "$msg" ]; then
  echo "Commit message for tag '$tag':"
  echo "$msg"
  exit 0
else
  echo "Tag '$tag' not found!"
  exit 1
fi
