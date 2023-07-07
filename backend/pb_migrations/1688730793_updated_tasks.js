migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3mp26eo8z6xi593")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5pkma5ka",
    "name": "subtasks",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "25wv2v2pncmv98a",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3mp26eo8z6xi593")

  // remove
  collection.schema.removeField("5pkma5ka")

  return dao.saveCollection(collection)
})
