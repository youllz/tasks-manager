migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("25wv2v2pncmv98a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "viadlw2w",
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
  const collection = dao.findCollectionByNameOrId("25wv2v2pncmv98a")

  // remove
  collection.schema.removeField("viadlw2w")

  return dao.saveCollection(collection)
})
