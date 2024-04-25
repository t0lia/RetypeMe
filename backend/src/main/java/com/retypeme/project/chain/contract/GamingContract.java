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
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple4;
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
    public static final String BINARY = "6080604052348015600e575f80fd5b505f80546001600160a01b03191633179055601460015566038d7ea4c68000600255610ef68061003d5f395ff3fe608060405260043610610105575f3560e01c80638651413111610092578063b1dff37711610062578063b1dff377146102fc578063c0320dbc14610310578063d0e30db014610325578063edc6aa7f1461032d578063efaa55a014610341575f80fd5b806386514131146102585780638da5cb5b146102775780639e50d49e146102ad578063aba1b342146102dd575f80fd5b806334a8014b116100d857806334a8014b14610185578063532d5ad8146101e45780635ea1d6f81461020f5780636642642a146102245780637833a23d14610243575f80fd5b80630eaad3f11461010957806312065fe0146101305780631f568ae3146101505780632e1a7d4d14610166575b5f80fd5b348015610114575f80fd5b5061011d610360565b6040519081526020015b60405180910390f35b34801561013b575f80fd5b50335f9081526004602052604090205461011d565b34801561015b575f80fd5b5061016461039d565b005b348015610171575f80fd5b50610164610180366004610d35565b61044f565b348015610190575f80fd5b506101d461019f366004610d35565b60056020525f908152604090208054600182015460028301546004909301549192909160ff909116906001600160a01b031684565b6040516101279493929190610d60565b3480156101ef575f80fd5b5061011d6101fe366004610dc5565b60046020525f908152604090205481565b34801561021a575f80fd5b5061011d60015481565b34801561022f575f80fd5b5061016461023e366004610d35565b610508565b34801561024e575f80fd5b5061011d60025481565b348015610263575f80fd5b50610164610272366004610de5565b61057b565b348015610282575f80fd5b505f54610295906001600160a01b031681565b6040516001600160a01b039091168152602001610127565b3480156102b8575f80fd5b50600254335f9081526004602052604090205410156040519015158152602001610127565b3480156102e8575f80fd5b506101646102f7366004610d35565b610866565b348015610307575f80fd5b506101646108d8565b34801561031b575f80fd5b5061011d60035481565b610164610989565b348015610338575f80fd5b5061011d600281565b34801561034c575f80fd5b5061016461035b366004610d35565b6109ae565b335f908152600460205260408120546002541161037c57505f90565b335f908152600460205260409020546002546103989190610e23565b905090565b5f546001600160a01b031633146103cf5760405162461bcd60e51b81526004016103c690610e3c565b60405180910390fd5b5f47116104155760405162461bcd60e51b81526020600482015260146024820152734e6f2066756e647320746f20776974686472617760601b60448201526064016103c6565b5f80546040516001600160a01b03909116914780156108fc02929091818181858888f1935050505015801561044c573d5f803e3d5ffd5b50565b335f818152600460205260409020548211156104a45760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b60448201526064016103c6565b6001600160a01b0381165f90815260046020526040812080548492906104cb908490610e23565b90915550506040516001600160a01b0382169083156108fc029084905f818181858888f19350505050158015610503573d5f803e3d5ffd5b505050565b5f546001600160a01b031633146105315760405162461bcd60e51b81526004016103c690610e3c565b606481106105765760405162461bcd60e51b815260206004820152601260248201527122b73a32b9103b30b634b210373ab6b132b960711b60448201526064016103c6565b600155565b5f546001600160a01b031633146105a45760405162461bcd60e51b81526004016103c690610e3c565b5f828152600560205260409020600160028083015460ff16908111156105cc576105cc610d4c565b146106235760405162461bcd60e51b815260206004820152602160248201527f47616d65206e6f742073746172746564206f7220616c726561647920656e64656044820152601960fa1b60648201526084016103c6565b600381015460021461068b5760405162461bcd60e51b815260206004820152602b60248201527f57726f6e67206e756d626572206f6620706c617965727320696e20746865206760448201526a30b6b29039b2b9b9b4b7b760a91b60648201526084016103c6565b806003015f815481106106a0576106a0610e63565b5f918252602090912001546001600160a01b03838116911614806106ef5750806003016001815481106106d5576106d5610e63565b5f918252602090912001546001600160a01b038381169116145b6107725760405162461bcd60e51b815260206004820152604860248201527f5468697320616464726573732063616e2774206265207468652077696e6e657260448201527f2e204974206973206e6f7420696e207468652063757272656e742067616d652060648201526739b2b9b9b4b7b71760c11b608482015260a4016103c6565b5f6064600154835f01546107869190610e77565b6107909190610e8e565b90505f81835f01546107a29190610e23565b6001600160a01b0385165f908152600460205260408120805492935083929091906107ce908490610ead565b925050819055508160035f8282546107e69190610ead565b90915550506004830180546001600160a01b0319166001600160a01b0386161790556002808401805460ff19166001830217905550604080516001600160a01b03861681526020810183905286917ff1898de79c348962fab7695532341027e5bceb0ea2a8785790fa7d7efeeee129910160405180910390a25050505050565b5f546001600160a01b0316331461088f5760405162461bcd60e51b81526004016103c690610e3c565b5f81116108d35760405162461bcd60e51b815260206004820152601260248201527122b73a32b9103b30b634b210373ab6b132b960711b60448201526064016103c6565b600255565b5f546001600160a01b031633146109015760405162461bcd60e51b81526004016103c690610e3c565b5f600354116109525760405162461bcd60e51b815260206004820152601960248201527f4e6f20636f6d6d697373696f6e20746f2077697468647261770000000000000060448201526064016103c6565b5f600381905580546040516001600160a01b03909116916108fc9181818181818888f1935050505015801561044c573d5f803e3d5ffd5b335f90815260046020526040812080543492906109a7908490610ead565b9091555050565b5f818152600560205260408120600101549003610a31575f8181526005602081815260408084206001810186905584815560028101805460ff1916905581518581528084019283905294869052929091529151610a119260039092019190610cbe565b505f81815260056020526040902060040180546001600160a01b03191690555b5f818152600560205260409020600301541580610a8157505f8181526005602052604081206003018054339290610a6a57610a6a610e63565b5f918252602090912001546001600160a01b031614155b610acd5760405162461bcd60e51b815260206004820152601a60248201527f506c6179657220616c726561647920696e207468652067616d6500000000000060448201526064016103c6565b5f81815260056020526040902060030154600211610b245760405162461bcd60e51b815260206004820152601460248201527311d85b59481cd95cdcda5bdb881a5cc8199d5b1b60621b60448201526064016103c6565b5f81815260056020526040812060029081015460ff1690811115610b4a57610b4a610d4c565b14610b975760405162461bcd60e51b815260206004820152601c60248201527f47616d652073657373696f6e20616c726561647920737461727465640000000060448201526064016103c6565b600254335f908152600460205260409020541015610bee5760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b60448201526064016103c6565b600254335f9081526004602052604081208054909190610c0f908490610e23565b90915550506002545f8281526005602052604081208054909190610c34908490610ead565b90915550505f8181526005602090815260408220600301805460018101825581845291832090910180546001600160a01b0319163317905590829052546001190161044c575f81815260056020526040808220600201805460ff191660011790555182917f50ad08f58a27f2851d7e3a1b3a6a46b290f2ce677e99642d30ff639721e7779091a250565b828054828255905f5260205f20908101928215610d11579160200282015b82811115610d1157825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190610cdc565b50610d1d929150610d21565b5090565b5b80821115610d1d575f8155600101610d22565b5f60208284031215610d45575f80fd5b5035919050565b634e487b7160e01b5f52602160045260245ffd5b848152602081018490526080810160038410610d8a57634e487b7160e01b5f52602160045260245ffd5b60408201939093526001600160a01b039190911660609091015292915050565b80356001600160a01b0381168114610dc0575f80fd5b919050565b5f60208284031215610dd5575f80fd5b610dde82610daa565b9392505050565b5f8060408385031215610df6575f80fd5b82359150610e0660208401610daa565b90509250929050565b634e487b7160e01b5f52601160045260245ffd5b81810381811115610e3657610e36610e0f565b92915050565b6020808252600d908201526c2737ba103a34329037bbb732b960991b604082015260600190565b634e487b7160e01b5f52603260045260245ffd5b8082028115828204841417610e3657610e36610e0f565b5f82610ea857634e487b7160e01b5f52601260045260245ffd5b500490565b80820180821115610e3657610e36610e0f56fea2646970667358221220e5dc3af509a3aeac0050a118a5a1ee61e537917c6632f868e4054286725fe50264736f6c63430008190033";

    public static final String FUNC_DUEL_PLAYERS_COUNT = "DUEL_PLAYERS_COUNT";

    public static final String FUNC_CHANGECOMMISSIONRATE = "changeCommissionRate";

    public static final String FUNC_CHANGEFIXEDDEPOSITAMOUNT = "changeFixedDepositAmount";

    public static final String FUNC_COMMISSIONRATE = "commissionRate";

    public static final String FUNC_DEPOSIT = "deposit";

    public static final String FUNC_ENDGAME = "endGame";

    public static final String FUNC_FIXEDDEPOSITAMOUNT = "fixedDepositAmount";

    public static final String FUNC_GAMESESSIONS = "gameSessions";

    public static final String FUNC_GETBALANCE = "getBalance";

    public static final String FUNC_GETMINDEPOSIT = "getMinDeposit";

    public static final String FUNC_INGAMEUSERBALANCES = "inGameUserBalances";

    public static final String FUNC_ISENOUGHBALANCE = "isEnoughBalance";

    public static final String FUNC_JOINGAME = "joinGame";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_TOTALCOMMISSION = "totalCommission";

    public static final String FUNC_WITHDRAW = "withdraw";

    public static final String FUNC_WITHDRAWCOMMISSIONFROMCONTRACT = "withdrawCommissionFromContract";

    public static final String FUNC_WITHDRAWFUNDSFROMCONTRACT = "withdrawFundsFromContract";

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

    public RemoteFunctionCall<BigInteger> DUEL_PLAYERS_COUNT() {
        final Function function = new Function(FUNC_DUEL_PLAYERS_COUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
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

    public RemoteFunctionCall<TransactionReceipt> deposit(BigInteger weiValue) {
        final Function function = new Function(
                FUNC_DEPOSIT, 
                Arrays.<Type>asList(), 
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

    public RemoteFunctionCall<Tuple4<BigInteger, BigInteger, BigInteger, String>> gameSessions(BigInteger param0) {
        final Function function = new Function(FUNC_GAMESESSIONS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint8>() {}, new TypeReference<Address>() {}));
        return new RemoteFunctionCall<Tuple4<BigInteger, BigInteger, BigInteger, String>>(function,
                new Callable<Tuple4<BigInteger, BigInteger, BigInteger, String>>() {
                    @Override
                    public Tuple4<BigInteger, BigInteger, BigInteger, String> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<BigInteger, BigInteger, BigInteger, String>(
                                (BigInteger) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (String) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<BigInteger> getBalance() {
        final Function function = new Function(FUNC_GETBALANCE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> getMinDeposit() {
        final Function function = new Function(FUNC_GETMINDEPOSIT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> inGameUserBalances(String param0) {
        final Function function = new Function(FUNC_INGAMEUSERBALANCES, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Boolean> isEnoughBalance() {
        final Function function = new Function(FUNC_ISENOUGHBALANCE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<TransactionReceipt> joinGame(BigInteger _sessionId) {
        final Function function = new Function(
                FUNC_JOINGAME, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_sessionId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> owner() {
        final Function function = new Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> totalCommission() {
        final Function function = new Function(FUNC_TOTALCOMMISSION, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> withdraw(BigInteger amount) {
        final Function function = new Function(
                FUNC_WITHDRAW, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
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
