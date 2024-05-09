package com.retypeme.project.chain

import com.fasterxml.jackson.annotation.JsonCreator

data class SmartConfig(val address: String, val chains: List<ChainItem>, val abi: List<Any>) {
    @JsonCreator
    constructor() : this("", emptyList(), emptyList())
}

