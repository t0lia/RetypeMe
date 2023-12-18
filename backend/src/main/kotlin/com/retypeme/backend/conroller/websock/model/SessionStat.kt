package com.retypeme.backend.conroller.websock.model

import com.retypeme.backend.model.User

class SessionStat(val id: String,
                  val users: MutableList<User> = mutableListOf())