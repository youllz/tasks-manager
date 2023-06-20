migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q04coibxw6czhf8")

  collection.createRule = "@request.auth.id = \"\" "
  collection.updateRule = "@request.auth.id = \"\" "
  collection.deleteRule = "@request.auth.id = \"\" "

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q04coibxw6czhf8")

  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
