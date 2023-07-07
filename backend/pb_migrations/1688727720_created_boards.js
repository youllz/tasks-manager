migrate((db) => {
  const collection = new Collection({
    "id": "e1xfi0wh4m5o6x9",
    "created": "2023-07-07 11:02:00.841Z",
    "updated": "2023-07-07 11:02:00.841Z",
    "name": "boards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "g37z0t6y",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 64,
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
  const collection = dao.findCollectionByNameOrId("e1xfi0wh4m5o6x9");

  return dao.deleteCollection(collection);
})
