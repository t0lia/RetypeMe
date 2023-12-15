package com.retypeme.backend

class Session {
    var id: String? = null
    // list of users
    var users: MutableList<User> = mutableListOf()
}