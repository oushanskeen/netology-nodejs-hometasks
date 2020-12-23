#! /bin/bash

echo "Hello World"
URL="http://localhost:3030/api"

simpleGet(){
  actor1=$1
  actor2=$2
  curl "$URL/$actor1/$actor2"
}

simplePost(){
  actor=$1
  curl -X POST \
    -H "Content-type: application/json" \
    "$URL/$actor"
}
simpleDelete(){
  actor=$1
  curl -X DELETE \
    -H "Content-type: application/json" \
    --data '{"id":"0"}' \
    "$URL/$actor"
}
simplePut(){
  actor=$1
  actor=$2
  curl -X PUT \
    -H "Content-type: application/json" \
    --data '{"id":"1","content":"ups and downs"}' \
    "$URL/$actor1/1"
};

restCalls(){
  actor=$1
  printf "\n$actor GET\n"
  simpleGet "$actor"
  printf "\n"
  printf "\n$actor GET 1st book\n"
  simpleGet "$actor" 1
  printf "\n"
  printf "\n$actor GET 4th book\n"
  simpleGet "$actor" 4
  printf "\n"
  printf "\n$actor POST\n"
  simplePost "$actor"
  printf "\n"
  printf "\n$actor PUT\n"
  simplePut "$actor" 1
  printf "\n"
  printf "\n$actor DELETE\n"
  simpleDelete "$actor"
  printf "\n"
 # printf "\ndogovors GET\n"
 # simpleGet "$actor"
 # printf "\n"
 # printf "\n"
}

restCalls "books"
#restCalls "dogovors"
