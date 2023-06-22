migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bv8jbceaoxinhz")

  collection.updateRule = "@request.auth.id = \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5bv8jbceaoxinhz")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
