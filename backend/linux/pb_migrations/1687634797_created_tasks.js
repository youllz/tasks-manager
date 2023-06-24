migrate((db) => {
  const collection = new Collection({
    "id": "yhe6k5glu4rjan5",
    "created": "2023-06-24 19:26:37.868Z",
    "updated": "2023-06-24 19:26:37.868Z",
    "name": "tasks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uww9c7mh",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
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
  const collection = dao.findCollectionByNameOrId("yhe6k5glu4rjan5");

  return dao.deleteCollection(collection);
})
