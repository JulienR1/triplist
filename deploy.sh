#!/bin/sh

cp -r .git .git2
rm -rf .git

git init
git add .
git reset .github/*
git reset app/*
git reset database/*
git commit -m "automatic publish"
git push https://git.heroku.com/trip-luggage.git master --force

rm -rf .git
cp -r .git2 .git
rm -rf .git2