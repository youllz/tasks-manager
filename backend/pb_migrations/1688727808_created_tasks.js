migrate((db) => {
  const collection = new Collection({
    "id": "3mp26eo8z6xi593",
    "created": "2023-07-07 11:03:28.566Z",
    "updated": "2023-07-07 11:03:28.566Z",
    "name": "tasks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "x1ecesp9",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "7ueda4q3",
        "name": "description",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "502ewps1",
        "name": "bords",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "e1xfi0wh4m5o6x9",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("3mp26eo8z6xi593");

  return dao.deleteCollection(collection);
})
