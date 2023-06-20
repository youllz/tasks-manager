migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jrwvxcvqomahu9z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0nwztziw",
    "name": "boards",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "q04coibxw6czhf8",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jrwvxcvqomahu9z")

  // remove
  collection.schema.removeField("0nwztziw")

  return dao.saveCollection(collection)
})
