migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q04coibxw6czhf8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yc7iuzwx",
    "name": "tasks",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jrwvxcvqomahu9z",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q04coibxw6czhf8")

  // remove
  collection.schema.removeField("yc7iuzwx")

  return dao.saveCollection(collection)
})
