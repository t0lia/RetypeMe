package com.retypeme.backend.contract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.10.0.
 */
@SuppressWarnings("rawtypes")
public class Acc extends Contract {
    public static final String BINARY = "608060405234801561000f575f80fd5b506101598061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610055575f3560e01c806320965255146100595780633bfd7fd31461006e57806347f1aae7146100785780635b9af12b1461008057806395c3729c14610093575b5f80fd5b5f545b60405190815260200160405180910390f35b61007661009a565b005b61005c5f5481565b61007661008e3660046100c7565b6100af565b600561005c565b5f805490806100a8836100f2565b9190505550565b805f808282546100bf919061010a565b909155505050565b5f602082840312156100d7575f80fd5b5035919050565b634e487b7160e01b5f52601160045260245ffd5b5f60018201610103576101036100de565b5060010190565b8082018082111561011d5761011d6100de565b9291505056fea26469706673582212206424d927b41225cb1b5d341d0c7e21c3d773538130cd16076cf623c42a0b7f8e64736f6c63430008140033";

    public static final String FUNC_ADDVALUE = "addValue";

    public static final String FUNC_GETVALUE = "getValue";

    public static final String FUNC_INCREMENTVALUE = "incrementValue";

    public static final String FUNC_MYVALUE = "myValue";

    public static final String FUNC_PRINT5 = "print5";

    @Deprecated
    protected Acc(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Acc(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Acc(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Acc(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<TransactionReceipt> addValue(BigInteger _value) {
        final Function function = new Function(
                FUNC_ADDVALUE, 
                Arrays.<Type>asList(new Uint256(_value)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> getValue() {
        final Function function = new Function(FUNC_GETVALUE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> incrementValue() {
        final Function function = new Function(
                FUNC_INCREMENTVALUE, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> myValue() {
        final Function function = new Function(FUNC_MYVALUE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> print5() {
        final Function function = new Function(FUNC_PRINT5, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    @Deprecated
    public static Acc load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Acc(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Acc load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Acc(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Acc load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Acc(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Acc load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Acc(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Acc> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Acc.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Acc> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Acc.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<Acc> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Acc.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Acc> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Acc.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }
}
