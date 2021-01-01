# Домашнее задание к занятию «2.5 База данных и хранение данных»

******Каждый документ коллекции **books** должен содержать следующую структуру данных:
```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
```

#### Задание 2
Запросы для **MongoDB**:
 - запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**
   
   db.books.insertMany( 
    [
      { 
        _id: 1, 
        title: "title one",
        description: "description one",
        authors: "author one"
      },
      { 
        _id: 2, 
        title: "title two",
        description: "description two",
        authors: "author two"
      }
    ]);

 - запрос для *поиска* полей документов коллекции **books** по полю *title*
  
    db.books.find( { title: "title one" } )

 - запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи

    db.books.updateOne(
      { _id: 1 },
      [
        { $set: 
          { 
            description: "new description", 
            authors: [ "new author one", "new author two" ], 
          } 
        },
      ]
    )
