migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jrwvxcvqomahu9z")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0nwztziw",
    "name": "boards",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "q04coibxw6czhf8",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "26xjp7zj",
    "name": "substasks",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "5bv8jbceaoxinhz",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jrwvxcvqomahu9z")

  // update
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

  // update
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
})
