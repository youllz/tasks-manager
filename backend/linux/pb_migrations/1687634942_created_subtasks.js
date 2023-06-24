migrate((db) => {
  const collection = new Collection({
    "id": "y7m1100s7n7w284",
    "created": "2023-06-24 19:29:02.816Z",
    "updated": "2023-06-24 19:29:02.816Z",
    "name": "subtasks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "aqbnmsde",
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
        "id": "g33llfwr",
        "name": "done",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "chhccanr",
        "name": "tasks",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "yhe6k5glu4rjan5",
          "cascadeDelete": false,
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
  const collection = dao.findCollectionByNameOrId("y7m1100s7n7w284");

  return dao.deleteCollection(collection);
})
