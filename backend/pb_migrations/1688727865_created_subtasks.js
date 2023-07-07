migrate((db) => {
  const collection = new Collection({
    "id": "25wv2v2pncmv98a",
    "created": "2023-07-07 11:04:25.451Z",
    "updated": "2023-07-07 11:04:25.451Z",
    "name": "subtasks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9jjounvi",
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
        "id": "zmrvd4vq",
        "name": "tasks",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "3mp26eo8z6xi593",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
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
  const collection = dao.findCollectionByNameOrId("25wv2v2pncmv98a");

  return dao.deleteCollection(collection);
})
