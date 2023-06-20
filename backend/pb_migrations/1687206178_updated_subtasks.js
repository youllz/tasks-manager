migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bv8jbceaoxinhz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qg6fiubz",
    "name": "tasks",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jrwvxcvqomahu9z",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bv8jbceaoxinhz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qg6fiubz",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jrwvxcvqomahu9z",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
