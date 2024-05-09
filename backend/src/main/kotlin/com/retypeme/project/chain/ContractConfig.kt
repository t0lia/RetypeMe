package com.retypeme.project.chain

import com.fasterxml.jackson.annotation.JsonCreator

data class ContractConfig(val address: String, val abi: List<Any>)

