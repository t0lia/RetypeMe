package com.retypeme.project.chain

import com.fasterxml.jackson.annotation.JsonCreator

data class ChainConfig(val chains: List<ChainItemConfig>){
    @JsonCreator
    constructor() : this(emptyList())
}
