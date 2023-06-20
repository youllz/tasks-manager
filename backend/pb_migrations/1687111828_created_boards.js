migrate((db) => {
  const collection = new Collection({
    "id": "q04coibxw6czhf8",
    "created": "2023-06-18 18:10:28.042Z",
    "updated": "2023-06-18 18:10:28.042Z",
    "name": "boards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sdcdofyc",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
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
  const collection = dao.findCollectionByNameOrId("q04coibxw6czhf8");

  return dao.deleteCollection(collection);
})
