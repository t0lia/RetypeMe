package com.retypeme.project.chain.contract;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple3;
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
public class GamingContract extends Contract {
    public static final String BINARY = "608060405234801561000f575f80fd5b505f80546001600160a01b03191633179055601460015566038d7ea4c68000600255610a9f8061003e5f395ff3fe6080604052600436106100d9575f3560e01c8063865141311161007c578063aba1b34211610057578063aba1b34214610266578063b1dff37714610285578063b6b55f2514610299578063c0320dbc146102ac575f80fd5b806386514131146101dd5780638da5cb5b146101fc578063a2fb117514610232575f80fd5b80635988c6b4116100b75780635988c6b4146101505780635ea1d6f8146101945780636642642a146101a95780637833a23d146101c8575f80fd5b806314794702146100dd5780631f568ae3146100fe57806352df64f414610112575b5f80fd5b3480156100e8575f80fd5b506100fc6100f7366004610948565b6102c1565b005b348015610109575f80fd5b506100fc610374565b34801561011d575f80fd5b5061013d61012c366004610948565b60066020525f908152604090205481565b6040519081526020015b60405180910390f35b34801561015b575f80fd5b5061016f61016a36600461095f565b61041d565b604080516001600160a01b039094168452602084019290925290820152606001610147565b34801561019f575f80fd5b5061013d60015481565b3480156101b4575f80fd5b506100fc6101c3366004610948565b610465565b3480156101d3575f80fd5b5061013d60025481565b3480156101e8575f80fd5b506100fc6101f736600461097f565b610493565b348015610207575f80fd5b505f5461021a906001600160a01b031681565b6040516001600160a01b039091168152602001610147565b34801561023d575f80fd5b5061021a61024c366004610948565b60056020525f90815260409020546001600160a01b031681565b348015610271575f80fd5b506100fc610280366004610948565b610741565b348015610290575f80fd5b506100fc61076f565b6100fc6102a7366004610948565b610837565b3480156102b7575f80fd5b5061013d60035481565b5f818152600560205260409020546001600160a01b031633146103395760405162461bcd60e51b815260206004820152602560248201527f4f6e6c79207468652077696e6e65722063616e2077697468647261772077696e6044820152646e696e677360d81b60648201526084015b60405180910390fd5b5f81815260066020526040808220549051339282156108fc02929190818181858888f19350505050158015610370573d5f803e3d5ffd5b5050565b5f546001600160a01b0316331461039d5760405162461bcd60e51b8152600401610330906109b8565b5f47116103e35760405162461bcd60e51b81526020600482015260146024820152734e6f2066756e647320746f20776974686472617760601b6044820152606401610330565b5f80546040516001600160a01b03909116914780156108fc02929091818181858888f1935050505015801561041a573d5f803e3d5ffd5b50565b6004602052815f5260405f208181548110610436575f80fd5b5f9182526020909120600390910201805460018201546002909201546001600160a01b03909116935090915083565b5f546001600160a01b0316331461048e5760405162461bcd60e51b8152600401610330906109b8565b600155565b5f546001600160a01b031633146104bc5760405162461bcd60e51b8152600401610330906109b8565b5f8281526004602052604090205460021461050c5760405162461bcd60e51b815260206004820152601060248201526f11d85b59481b9bdd081cdd185c9d195960821b6044820152606401610330565b5f828152600460205260408120805490919061052a5761052a6109df565b5f9182526020909120600390910201546001600160a01b038281169116148061058d57505f8281526004602052604090208054600190811061056e5761056e6109df565b5f9182526020909120600390910201546001600160a01b038281169116145b6106105760405162461bcd60e51b815260206004820152604860248201527f5468697320616464726573732063616e2774206265207468652077696e6e657260448201527f2e204974206973206e6f7420696e207468652063757272656e742067616d652060648201526739b2b9b9b4b7b71760c11b608482015260a401610330565b5f82815260046020526040812080546001908110610630576106306109df565b905f5260205f2090600302016001015460045f8581526020019081526020015f205f81548110610662576106626109df565b905f5260205f2090600302016001015461067c9190610a07565b90505f60646001548361068f9190610a20565b6106999190610a37565b90506106a58183610a56565b5f85815260066020526040812091909155600380548392906106c8908490610a07565b90915550505f84815260056020908152604080832080546001600160a01b0319166001600160a01b03881690811790915560068352928190205481519384529183019190915285917ff1898de79c348962fab7695532341027e5bceb0ea2a8785790fa7d7efeeee129910160405180910390a250505050565b5f546001600160a01b0316331461076a5760405162461bcd60e51b8152600401610330906109b8565b600255565b5f546001600160a01b031633146107985760405162461bcd60e51b8152600401610330906109b8565b5f600354116107f85760405162461bcd60e51b815260206004820152602660248201527f4e6f20636f6d6d6973696f6e20746f20776974686472617720617420746865206044820152651b5bdb595b9d60d21b6064820152608401610330565b5f80546003546040516001600160a01b039092169281156108fc029290818181858888f19350505050158015610830573d5f803e3d5ffd5b505f600355565b60025434146108a25760405162461bcd60e51b815260206004820152603160248201527f4465706f73697420616d6f756e74206d75737420626520657175616c2066697860448201527019590819195c1bdcda5d08185b5bdd5b9d607a1b6064820152608401610330565b604080516060810182523381523460208083019182528284018581525f86815260048352948520805460018082018355828852938720865160039092020180546001600160a01b0319166001600160a01b03909216919091178155935192840192909255516002928301559284905291549091036103705760405182907f50ad08f58a27f2851d7e3a1b3a6a46b290f2ce677e99642d30ff639721e77790905f90a25050565b5f60208284031215610958575f80fd5b5035919050565b5f8060408385031215610970575f80fd5b50508035926020909101359150565b5f8060408385031215610990575f80fd5b8235915060208301356001600160a01b03811681146109ad575f80fd5b809150509250929050565b6020808252600d908201526c2737ba103a34329037bbb732b960991b604082015260600190565b634e487b7160e01b5f52603260045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b80820180821115610a1a57610a1a6109f3565b92915050565b8082028115828204841417610a1a57610a1a6109f3565b5f82610a5157634e487b7160e01b5f52601260045260245ffd5b500490565b81810381811115610a1a57610a1a6109f356fea2646970667358221220bcf18009d282a253e11839456073d4cc62fb57bbeafaec4d147234eb2225a8f964736f6c63430008140033";

    public static final String FUNC_CHANGECOMMISSIONRATE = "changeCommissionRate";

    public static final String FUNC_CHANGEFIXEDDEPOSITAMOUNT = "changeFixedDepositAmount";

    public static final String FUNC_COMMISSIONRATE = "commissionRate";

    public static final String FUNC_DEPOSIT = "deposit";

    public static final String FUNC_ENDGAME = "endGame";

    public static final String FUNC_FIXEDDEPOSITAMOUNT = "fixedDepositAmount";

    public static final String FUNC_GAMESESSIONS = "gameSessions";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_SESSIONWINNINGS = "sessionWinnings";

    public static final String FUNC_TOTALCOMMISSION = "totalCommission";

    public static final String FUNC_WINNERS = "winners";

    public static final String FUNC_WITHDRAWCOMMISSIONFROMCONTRACT = "withdrawCommissionFromContract";

    public static final String FUNC_WITHDRAWFUNDSFROMCONTRACT = "withdrawFundsFromContract";

    public static final String FUNC_WITHDRAWWINNINGS = "withdrawWinnings";

    public static final Event GAMEENDED_EVENT = new Event("GameEnded", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event GAMESTARTED_EVENT = new Event("GameStarted", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}));
    ;

    @Deprecated
    protected GamingContract(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected GamingContract(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected GamingContract(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected GamingContract(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<GameEndedEventResponse> getGameEndedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(GAMEENDED_EVENT, transactionReceipt);
        ArrayList<GameEndedEventResponse> responses = new ArrayList<GameEndedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            GameEndedEventResponse typedResponse = new GameEndedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.sessionId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.winner = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.winnings = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static GameEndedEventResponse getGameEndedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(GAMEENDED_EVENT, log);
        GameEndedEventResponse typedResponse = new GameEndedEventResponse();
        typedResponse.log = log;
        typedResponse.sessionId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.winner = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.winnings = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        return typedResponse;
    }

    public Flowable<GameEndedEventResponse> gameEndedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getGameEndedEventFromLog(log));
    }

    public Flowable<GameEndedEventResponse> gameEndedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(GAMEENDED_EVENT));
        return gameEndedEventFlowable(filter);
    }

    public static List<GameStartedEventResponse> getGameStartedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(GAMESTARTED_EVENT, transactionReceipt);
        ArrayList<GameStartedEventResponse> responses = new ArrayList<GameStartedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            GameStartedEventResponse typedResponse = new GameStartedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.sessionId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static GameStartedEventResponse getGameStartedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(GAMESTARTED_EVENT, log);
        GameStartedEventResponse typedResponse = new GameStartedEventResponse();
        typedResponse.log = log;
        typedResponse.sessionId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<GameStartedEventResponse> gameStartedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getGameStartedEventFromLog(log));
    }

    public Flowable<GameStartedEventResponse> gameStartedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(GAMESTARTED_EVENT));
        return gameStartedEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> changeCommissionRate(BigInteger _newCommissionRate) {
        final Function function = new Function(
                FUNC_CHANGECOMMISSIONRATE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_newCommissionRate)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> changeFixedDepositAmount(BigInteger _newFixedDepositAmount) {
        final Function function = new Function(
                FUNC_CHANGEFIXEDDEPOSITAMOUNT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_newFixedDepositAmount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> commissionRate() {
        final Function function = new Function(FUNC_COMMISSIONRATE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> deposit(BigInteger sessionId, BigInteger weiValue) {
        final Function function = new Function(
                FUNC_DEPOSIT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(sessionId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    public RemoteFunctionCall<TransactionReceipt> endGame(BigInteger _sessionId, String _winner) {
        final Function function = new Function(
                FUNC_ENDGAME, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_sessionId), 
                new org.web3j.abi.datatypes.Address(160, _winner)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> fixedDepositAmount() {
        final Function function = new Function(FUNC_FIXEDDEPOSITAMOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Tuple3<String, BigInteger, BigInteger>> gameSessions(BigInteger param0, BigInteger param1) {
        final Function function = new Function(FUNC_GAMESESSIONS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0), 
                new org.web3j.abi.datatypes.generated.Uint256(param1)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple3<String, BigInteger, BigInteger>>(function,
                new Callable<Tuple3<String, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple3<String, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple3<String, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue());
                    }
                });
    }

    public RemoteFunctionCall<String> owner() {
        final Function function = new Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> sessionWinnings(BigInteger param0) {
        final Function function = new Function(FUNC_SESSIONWINNINGS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> totalCommission() {
        final Function function = new Function(FUNC_TOTALCOMMISSION, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> winners(BigInteger param0) {
        final Function function = new Function(FUNC_WINNERS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> withdrawCommissionFromContract() {
        final Function function = new Function(
                FUNC_WITHDRAWCOMMISSIONFROMCONTRACT, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> withdrawFundsFromContract() {
        final Function function = new Function(
                FUNC_WITHDRAWFUNDSFROMCONTRACT, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> withdrawWinnings(BigInteger _sessionId) {
        final Function function = new Function(
                FUNC_WITHDRAWWINNINGS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_sessionId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static GamingContract load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new GamingContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static GamingContract load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new GamingContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static GamingContract load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new GamingContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static GamingContract load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new GamingContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<GamingContract> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(GamingContract.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    public static RemoteCall<GamingContract> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(GamingContract.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<GamingContract> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(GamingContract.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<GamingContract> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(GamingContract.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    public static class GameEndedEventResponse extends BaseEventResponse {
        public BigInteger sessionId;

        public String winner;

        public BigInteger winnings;
    }

    public static class GameStartedEventResponse extends BaseEventResponse {
        public BigInteger sessionId;
    }
}
