migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yhe6k5glu4rjan5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qxskqzce",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ghqtkeiv",
    "name": "status",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yhe6k5glu4rjan5")

  // remove
  collection.schema.removeField("qxskqzce")

  // remove
  collection.schema.removeField("ghqtkeiv")

  return dao.saveCollection(collection)
})
