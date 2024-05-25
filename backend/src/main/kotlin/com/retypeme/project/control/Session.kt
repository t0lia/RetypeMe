package com.retypeme.project.control

import java.io.Serializable

data class Session(val id: String, val chain: Int, var players: Int) : Serializable