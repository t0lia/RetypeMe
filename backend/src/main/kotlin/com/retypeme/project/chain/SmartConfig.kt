package com.retypeme.project.chain

import com.fasterxml.jackson.annotation.JsonCreator

data class SmartConfig(val chains: List<ChainItemConfig>, val abi: List<Any>) {
    @JsonCreator
    constructor() : this(emptyList(), emptyList())
}

