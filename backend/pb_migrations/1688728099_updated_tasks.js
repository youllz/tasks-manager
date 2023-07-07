migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3mp26eo8z6xi593")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fcnj4xaj",
    "name": "status",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 2,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3mp26eo8z6xi593")

  // remove
  collection.schema.removeField("fcnj4xaj")

  return dao.saveCollection(collection)
})
