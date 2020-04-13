#!/bin/bash
sed -i "s/http\:\/\/localhost\:8000/https\:\/\/campusworks\.pythonanywhere\.com/g" *.jsx 
sed -i "s/http\:\/\/localhost\:3000/https\:\/\/ecell\.iiit\.ac\.in\/cworks/g" *.jsx
