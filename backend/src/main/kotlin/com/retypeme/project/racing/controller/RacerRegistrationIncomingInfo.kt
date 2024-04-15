package com.retypeme.project.racing.controller

class RacerRegistrationIncomingInfo(
    val sessionId: String,
    val chain: Int,
    val userId: String,
    val walletId: String,
    val state: String
)