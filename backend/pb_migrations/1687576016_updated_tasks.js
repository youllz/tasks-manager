migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jrwvxcvqomahu9z")

  collection.deleteRule = "@request.auth.id = \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jrwvxcvqomahu9z")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
