migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jrwvxcvqomahu9z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "26xjp7zj",
    "name": "substasks",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "5bv8jbceaoxinhz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jrwvxcvqomahu9z")

  // remove
  collection.schema.removeField("26xjp7zj")

  return dao.saveCollection(collection)
})
