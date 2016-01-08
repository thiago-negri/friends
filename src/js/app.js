function App () {
  'use strict'

  this.dispatcher = new Dispatcher(this)

  this.friendStore = new FriendStore(this)
  this.friendStoreKey = this.dispatcher.register(this.friendStore)

  this.routeStore = new RouteStore(this)
  this.routeStoreKey = this.dispatcher.register(this.routeStore)
}
