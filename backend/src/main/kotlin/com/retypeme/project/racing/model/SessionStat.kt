package com.retypeme.project.racing.model

import com.retypeme.project.common.model.User

class SessionStat(val id: String,
                  val users: MutableList<User> = mutableListOf())