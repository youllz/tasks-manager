migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bv8jbceaoxinhz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vz93zzvj",
    "name": "done",
    "type": "bool",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bv8jbceaoxinhz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vz93zzvj",
    "name": "done",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
