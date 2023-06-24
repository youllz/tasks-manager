migrate((db) => {
  const collection = new Collection({
    "id": "n8nor4xjorpd9gm",
    "created": "2023-06-24 19:26:10.619Z",
    "updated": "2023-06-24 19:26:10.619Z",
    "name": "boards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dgmk7zej",
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
  const collection = dao.findCollectionByNameOrId("n8nor4xjorpd9gm");

  return dao.deleteCollection(collection);
})
