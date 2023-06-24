migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yhe6k5glu4rjan5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dl5lnuod",
    "name": "boards",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "n8nor4xjorpd9gm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yhe6k5glu4rjan5")

  // remove
  collection.schema.removeField("dl5lnuod")

  return dao.saveCollection(collection)
})
