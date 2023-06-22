migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q04coibxw6czhf8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "an2gwsvo",
    "name": "tasks",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "jrwvxcvqomahu9z",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q04coibxw6czhf8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "an2gwsvo",
    "name": "field",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "jrwvxcvqomahu9z",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
