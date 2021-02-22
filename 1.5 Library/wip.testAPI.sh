#! /bin/bash

echo "Hello World"
URL="http://localhost:3031/api/books"
URL2="http://localhost:3031/api/user/login"

getAll(){
  curl "$URL"
}
getOneSuccess(){
  curl -v "$URL/1"
}
getOneFail(){
  curl -v "$URL/100"
}
postLogin(){
  curl -X POST \
    -v\
    -H "Content-type: application/json" \
    --data '{"id":"1","mail":"test@mail.ru"}'\
    "$URL2"
}
postBook(){
  curl -X POST \
    -v\
    -H "Content-type: application/json" \
    --data '{"content":"pineappletrees"}'\
    "$URL"
}
putBookSuccess(){
  curl -X PUT \
    -H "Content-type: application/json" \
    --data '{"content":"ups and downs"}' \
    "$URL/1"
};
delete(){
  curl -X DELETE \
    -v\
    "$URL/9"
}

calls(){
  printf "\n POST LOGIN\n"
  postLogin 
  printf "\n"
  printf "\n GET ALL\n"
  getAll
  printf "\n"
  printf "\$ GET ONE BOOK SUCCESS\n"
  getOneSuccess
  printf "\n"
  printf "\$ GET ONE BOOK FAIL\n"
  getOneFail
  printf "\n"
  printf "\n POST BOOK\n"
  postBook 
  printf "\n"
  printf "\n PUT SUCCESS\n"
  putBookSuccess
  printf "\n"
  printf "\n DELETE\n"
  delete
  printf "\n"
}

calls 
#restCalls "dogovors"
