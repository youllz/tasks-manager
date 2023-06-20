migrate((db) => {
  const collection = new Collection({
    "id": "5bv8jbceaoxinhz",
    "created": "2023-06-18 18:21:59.691Z",
    "updated": "2023-06-18 18:21:59.691Z",
    "name": "subtasks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ch0vbuxi",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "vz93zzvj",
        "name": "done",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5bv8jbceaoxinhz");

  return dao.deleteCollection(collection);
})
