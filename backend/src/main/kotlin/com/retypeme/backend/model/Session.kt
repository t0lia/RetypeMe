package com.retypeme.backend.model

class Session(val id: String,
              val users: MutableList<User> = mutableListOf())