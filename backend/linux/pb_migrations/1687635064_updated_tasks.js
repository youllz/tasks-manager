migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yhe6k5glu4rjan5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ib3pm28s",
    "name": "subtasks",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "y7m1100s7n7w284",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yhe6k5glu4rjan5")

  // remove
  collection.schema.removeField("ib3pm28s")

  return dao.saveCollection(collection)
})
