#! /bin/bash

echo "Hello World"
URL="http://localhost:3030/api/books"

getAll(){
  curl "$URL"
}
getOne(){
  curl "$URL/1"
}
post(){
  curl -X POST \
    -H "Content-type: application/json" \
    --data '{"content":"pineappletrees"}'\
    "$URL"
}
put(){
  curl -X PUT \
    -H "Content-type: application/json" \
    --data '{"content":"ups and downs"}' \
    "$URL/4"
};
delete(){
  curl -X DELETE \
    "$URL/9"
}

calls(){
  printf "\n GET ALL\n"
  getAll
  printf "\n"
  printf "\$ GET ONE \n"
  getOne
  printf "\n"
  printf "\n POST\n"
  post 
  printf "\n"
  printf "\n PUT\n"
  put
  printf "\n"
  delete
  printf "\n"
}

calls 
#restCalls "dogovors"
