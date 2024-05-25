package com.retypeme.project.chain

import io.reactivex.disposables.Disposable
import org.web3j.crypto.Credentials
import org.web3j.protocol.Web3j
import org.web3j.protocol.core.DefaultBlockParameterName
import org.web3j.protocol.core.methods.response.TransactionReceipt
import org.web3j.tx.RawTransactionManager
import org.web3j.tx.gas.DefaultGasProvider
import xyz.retypeme.sc.GamingContract
import java.math.BigInteger

class SmartContractWrapper(address: String, privateKey: String, chain: Long, web3j: Web3j) {

    val contract = GamingContract.load(
        address,
        web3j,
        RawTransactionManager(web3j, Credentials.create(privateKey), chain),
        DefaultGasProvider()
    )

    public fun getOwner(): String {
        return contract.owner().send()
    }

    fun joinGame(sessionId: BigInteger) {
        contract.joinGame(sessionId).send()
    }

    fun getInGameBalance(address: String): BigInteger {
        return contract.getBalance(address).send()
    }

    fun endGame(sessionId: BigInteger, address: String): TransactionReceipt {
        return contract.endGame(sessionId, address).send()
    }

    fun isEnoughBalance(address: String, amount: BigInteger): Boolean {
        return contract.isEnoughBalance(address).send()
    }

    fun deposit(amount: BigInteger) {
        contract.deposit(amount).send()
    }

    fun subscribeToGameEndedEvents(callback: (GamingContract.GameEndedEventResponse) -> Unit): Disposable {
        val flowable = contract.gameEndedEventFlowable(DefaultBlockParameterName.EARLIEST, DefaultBlockParameterName.LATEST)
        return flowable.subscribe(callback)
    }
}
