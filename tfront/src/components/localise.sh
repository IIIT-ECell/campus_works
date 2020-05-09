#!/bin/bash
sed -i "s/https\:\/\/campusworks\.pythonanywhere\.com/http\:\/\/localhost\:8000/g" *.jsx 
sed -i "s/https\:\/\/ecell\.iiit\.ac\.in\/cworks/http\:\/\/localhost\:3000/g" *.jsx