package com.retypeme.backend.model

class Session(val id: String,
              val players: Int,
              val users: MutableList<User> = mutableListOf())