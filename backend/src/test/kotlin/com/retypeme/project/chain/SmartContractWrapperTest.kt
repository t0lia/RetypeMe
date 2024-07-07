package com.retypeme.project.chain

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.web3j.protocol.core.DefaultBlockParameterName.LATEST
import java.math.BigInteger

class SmartContractWrapperTest {

    var scOwnerAddress: String = ""
    var fstPlayerAddress: String = ""
    var sndPlayerAddress: String = ""

    var scOwnerPrivateKey: String = ""
    val fstPlayerPrivateKey: String = ""
    val sndPlayerPrivateKey: String = ""

    val apiInfuraKey: String = ""
    val apiChainstackKey: String = ""

    val mEth = BigInteger.valueOf(1000_000_000_000_000)//0.001 ether
    val dEth = BigInteger.valueOf(100_000_000_000_000)//0.01 ether

//    companion object {
//        @JvmStatic
//        fun chainIdProvider() = listOf(80002, 534351, 5611, 168587773).stream()
//    }

//    @ParameterizedTest
//    @MethodSource("chainIdProvider")
//    fun testContractReady(chainId: Long) {
//
//        val chain = ConfigReaderService().readChainConfig().chains.first { it.id == chainId.toInt() }
//        val scAddress = chain.contract
//        val rpc = chain.rpc
//        val web3j = Web3jBuilder(apiInfuraKey, apiChainstackKey).getWeb3j(rpc, chainId)
//
//        val owner = SmartContractWrapper(scAddress, scOwnerPrivateKey, chainId, web3j)
//
//         check owner address
//        val ownerAddress: String = owner.getOwner()
//        assertEquals(this.scOwnerAddress, ownerAddress.lowercase(), "Owner address is not correct")
//
//         check balance
//        val fstBalance = web3j.ethGetBalance(fstPlayerAddress, LATEST).send().balance
//        val sndBalance = web3j.ethGetBalance(sndPlayerAddress, LATEST).send().balance
//
//        println("fstBalance mEth: ${fstBalance / mEth}")
//        println("sndBalance mEth: ${sndBalance / mEth}")
//        assertTrue(fstBalance > dEth, "Fst player balance is not enough")
//        assertTrue(sndBalance > dEth, "Snd player balance is not enough")
//         print in game balance in mEth
//        println("fstInGameBalance mEth: ${owner.getInGameBalance(fstPlayerAddress) / mEth}")
//        println("sndInGameBalance mEth: ${owner.getInGameBalance(sndPlayerAddress) / mEth}")
    }

//    @ParameterizedTest
//    @MethodSource("chainIdProvider")
    fun testSmoke(chainId: Long) {

//        val chain = ConfigReaderService().readChainConfig().chains.first { it.id == chainId.toInt() }
//        val scAddress = chain.contract
//        val rpc = chain.rpc
//
//        val sessionId = BigInteger.valueOf((Math.random() * 1000_000).toLong())
//
//        val web3j = Web3jBuilder(apiInfuraKey, apiChainstackKey).getWeb3j(rpc, chainId)
//
//        val owner = SmartContractWrapper(scAddress, scOwnerPrivateKey, chainId, web3j)
//        val fstPlayer = SmartContractWrapper(scAddress, fstPlayerPrivateKey, chainId, web3j)
//        val sndPlayer = SmartContractWrapper(scAddress, sndPlayerPrivateKey, chainId, web3j)
//
//        val fstInGameBalance = fstPlayer.getInGameBalance(fstPlayerAddress)
//        val sndInGameBalance = sndPlayer.getInGameBalance(sndPlayerAddress)
//
//         deposit 10x mEth if not enough
//        if (fstInGameBalance <= mEth) {
//            fstPlayer.deposit(dEth)
//        }
//        if (sndInGameBalance <= mEth) {
//            sndPlayer.deposit(dEth)
//        }
//
//        assertTrue(fstInGameBalance > mEth)
//        assertTrue(sndInGameBalance > mEth)
//
//         join game
//        fstPlayer.joinGame(sessionId)
//        sndPlayer.joinGame(sessionId)
//
//        owner.endGame(sessionId, fstPlayerAddress)
//
//        val fstInGameBalanceAfter = fstPlayer.getInGameBalance(fstPlayerAddress)
//        val sndInGameBalanceAfter = sndPlayer.getInGameBalance(sndPlayerAddress)
//
//        println("fstInGameBalance: $fstInGameBalance")
//        println("sndInGameBalance: $sndInGameBalance")
//        println("sessionId: $sessionId")
//        println("fstInGameBalanceAfter: $fstInGameBalanceAfter")
//        println("sndInGameBalanceAfter: $sndInGameBalanceAfter")
//
//        assertTrue(fstInGameBalanceAfter > fstInGameBalance)
//        assertTrue(sndInGameBalanceAfter < sndInGameBalance)
//    }
}