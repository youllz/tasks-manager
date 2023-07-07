migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3mp26eo8z6xi593")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "502ewps1",
    "name": "boards",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3mp26eo8z6xi593")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
