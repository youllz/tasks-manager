migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3mp26eo8z6xi593")

  collection.deleteRule = "@request.auth.id = \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3mp26eo8z6xi593")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
