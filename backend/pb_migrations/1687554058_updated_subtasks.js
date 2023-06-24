migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bv8jbceaoxinhz")

  // remove
  collection.schema.removeField("vz93zzvj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q7k7jbxr",
    "name": "done",
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
  const collection = dao.findCollectionByNameOrId("5bv8jbceaoxinhz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vz93zzvj",
    "name": "done",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("q7k7jbxr")

  return dao.saveCollection(collection)
})
