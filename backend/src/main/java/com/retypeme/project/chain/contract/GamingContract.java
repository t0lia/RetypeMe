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
    public static final String BINARY = "6080604052348015600e575f80fd5b505f80546001600160a01b03191633179055601460015566038d7ea4c68000600255610f3e8061003d5f395ff3fe608060405260043610610105575f3560e01c80638651413111610092578063c0320dbc11610062578063c0320dbc14610316578063d0e30db01461032b578063edc6aa7f14610333578063efaa55a014610347578063f8b2cb4f14610366575f80fd5b8063865141311461028e5780638da5cb5b146102ad578063aba1b342146102e3578063b1dff37714610302575f80fd5b806334a8014b116100d857806334a8014b146101bb578063532d5ad81461021a5780635ea1d6f8146102455780636642642a1461025a5780637833a23d14610279575f80fd5b80631f568ae31461010957806329cde1051461011f5780632e1a7d4d146101515780633313f6e414610170575b5f80fd5b348015610114575f80fd5b5061011d61039a565b005b34801561012a575f80fd5b5061013e610139366004610d9e565b61044c565b6040519081526020015b60405180910390f35b34801561015c575f80fd5b5061011d61016b366004610dbe565b61049d565b34801561017b575f80fd5b506101ab61018a366004610d9e565b6002546001600160a01b039091165f90815260046020526040902054101590565b6040519015158152602001610148565b3480156101c6575f80fd5b5061020a6101d5366004610dbe565b60056020525f908152604090208054600182015460028301546004909301549192909160ff909116906001600160a01b031684565b6040516101489493929190610de9565b348015610225575f80fd5b5061013e610234366004610d9e565b60046020525f908152604090205481565b348015610250575f80fd5b5061013e60015481565b348015610265575f80fd5b5061011d610274366004610dbe565b610556565b348015610284575f80fd5b5061013e60025481565b348015610299575f80fd5b5061011d6102a8366004610e33565b6105c9565b3480156102b8575f80fd5b505f546102cb906001600160a01b031681565b6040516001600160a01b039091168152602001610148565b3480156102ee575f80fd5b5061011d6102fd366004610dbe565b6108b4565b34801561030d575f80fd5b5061011d610926565b348015610321575f80fd5b5061013e60035481565b61011d6109d7565b34801561033e575f80fd5b5061013e600281565b348015610352575f80fd5b5061011d610361366004610dbe565b6109fc565b348015610371575f80fd5b5061013e610380366004610d9e565b6001600160a01b03165f9081526004602052604090205490565b5f546001600160a01b031633146103cc5760405162461bcd60e51b81526004016103c390610e5d565b60405180910390fd5b5f47116104125760405162461bcd60e51b81526020600482015260146024820152734e6f2066756e647320746f20776974686472617760601b60448201526064016103c3565b5f80546040516001600160a01b03909116914780156108fc02929091818181858888f19350505050158015610449573d5f803e3d5ffd5b50565b6001600160a01b0381165f9081526004602052604081205460025411610472575f610497565b6001600160a01b0382165f908152600460205260409020546002546104979190610e98565b92915050565b335f818152600460205260409020548211156104f25760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b60448201526064016103c3565b6001600160a01b0381165f9081526004602052604081208054849290610519908490610e98565b90915550506040516001600160a01b0382169083156108fc029084905f818181858888f19350505050158015610551573d5f803e3d5ffd5b505050565b5f546001600160a01b0316331461057f5760405162461bcd60e51b81526004016103c390610e5d565b606481106105c45760405162461bcd60e51b815260206004820152601260248201527122b73a32b9103b30b634b210373ab6b132b960711b60448201526064016103c3565b600155565b5f546001600160a01b031633146105f25760405162461bcd60e51b81526004016103c390610e5d565b5f828152600560205260409020600160028083015460ff169081111561061a5761061a610dd5565b146106715760405162461bcd60e51b815260206004820152602160248201527f47616d65206e6f742073746172746564206f7220616c726561647920656e64656044820152601960fa1b60648201526084016103c3565b60038101546002146106d95760405162461bcd60e51b815260206004820152602b60248201527f57726f6e67206e756d626572206f6620706c617965727320696e20746865206760448201526a30b6b29039b2b9b9b4b7b760a91b60648201526084016103c3565b806003015f815481106106ee576106ee610eab565b5f918252602090912001546001600160a01b038381169116148061073d57508060030160018154811061072357610723610eab565b5f918252602090912001546001600160a01b038381169116145b6107c05760405162461bcd60e51b815260206004820152604860248201527f5468697320616464726573732063616e2774206265207468652077696e6e657260448201527f2e204974206973206e6f7420696e207468652063757272656e742067616d652060648201526739b2b9b9b4b7b71760c11b608482015260a4016103c3565b5f6064600154835f01546107d49190610ebf565b6107de9190610ed6565b90505f81835f01546107f09190610e98565b6001600160a01b0385165f9081526004602052604081208054929350839290919061081c908490610ef5565b925050819055508160035f8282546108349190610ef5565b90915550506004830180546001600160a01b0319166001600160a01b0386161790556002808401805460ff19166001830217905550604080516001600160a01b03861681526020810183905286917ff1898de79c348962fab7695532341027e5bceb0ea2a8785790fa7d7efeeee129910160405180910390a25050505050565b5f546001600160a01b031633146108dd5760405162461bcd60e51b81526004016103c390610e5d565b5f81116109215760405162461bcd60e51b815260206004820152601260248201527122b73a32b9103b30b634b210373ab6b132b960711b60448201526064016103c3565b600255565b5f546001600160a01b0316331461094f5760405162461bcd60e51b81526004016103c390610e5d565b5f600354116109a05760405162461bcd60e51b815260206004820152601960248201527f4e6f20636f6d6d697373696f6e20746f2077697468647261770000000000000060448201526064016103c3565b5f600381905580546040516001600160a01b03909116916108fc9181818181818888f19350505050158015610449573d5f803e3d5ffd5b335f90815260046020526040812080543492906109f5908490610ef5565b9091555050565b5f818152600560205260408120600101549003610a7f575f8181526005602081815260408084206001810186905584815560028101805460ff1916905581518581528084019283905294869052929091529151610a5f9260039092019190610d0c565b505f81815260056020526040902060040180546001600160a01b03191690555b5f818152600560205260409020600301541580610acf57505f8181526005602052604081206003018054339290610ab857610ab8610eab565b5f918252602090912001546001600160a01b031614155b610b1b5760405162461bcd60e51b815260206004820152601a60248201527f506c6179657220616c726561647920696e207468652067616d6500000000000060448201526064016103c3565b5f81815260056020526040902060030154600211610b725760405162461bcd60e51b815260206004820152601460248201527311d85b59481cd95cdcda5bdb881a5cc8199d5b1b60621b60448201526064016103c3565b5f81815260056020526040812060029081015460ff1690811115610b9857610b98610dd5565b14610be55760405162461bcd60e51b815260206004820152601c60248201527f47616d652073657373696f6e20616c726561647920737461727465640000000060448201526064016103c3565b600254335f908152600460205260409020541015610c3c5760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b60448201526064016103c3565b600254335f9081526004602052604081208054909190610c5d908490610e98565b90915550506002545f8281526005602052604081208054909190610c82908490610ef5565b90915550505f8181526005602090815260408220600301805460018101825581845291832090910180546001600160a01b03191633179055908290525460011901610449575f81815260056020526040808220600201805460ff191660011790555182917f50ad08f58a27f2851d7e3a1b3a6a46b290f2ce677e99642d30ff639721e7779091a250565b828054828255905f5260205f20908101928215610d5f579160200282015b82811115610d5f57825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190610d2a565b50610d6b929150610d6f565b5090565b5b80821115610d6b575f8155600101610d70565b80356001600160a01b0381168114610d99575f80fd5b919050565b5f60208284031215610dae575f80fd5b610db782610d83565b9392505050565b5f60208284031215610dce575f80fd5b5035919050565b634e487b7160e01b5f52602160045260245ffd5b848152602081018490526080810160038410610e1357634e487b7160e01b5f52602160045260245ffd5b60408201939093526001600160a01b039190911660609091015292915050565b5f8060408385031215610e44575f80fd5b82359150610e5460208401610d83565b90509250929050565b6020808252600d908201526c2737ba103a34329037bbb732b960991b604082015260600190565b634e487b7160e01b5f52601160045260245ffd5b8181038181111561049757610497610e84565b634e487b7160e01b5f52603260045260245ffd5b808202811582820484141761049757610497610e84565b5f82610ef057634e487b7160e01b5f52601260045260245ffd5b500490565b8082018082111561049757610497610e8456fea26469706673582212201453ae9fdac0835bbfa679bc6aade5f154e0c1ab553e9fb9aafcb3021d1885ab64736f6c63430008190033";

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

    public RemoteFunctionCall<BigInteger> getBalance(String _user) {
        final Function function = new Function(FUNC_GETBALANCE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _user)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> getMinDeposit(String _user) {
        final Function function = new Function(FUNC_GETMINDEPOSIT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _user)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> inGameUserBalances(String param0) {
        final Function function = new Function(FUNC_INGAMEUSERBALANCES, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Boolean> isEnoughBalance(String _user) {
        final Function function = new Function(FUNC_ISENOUGHBALANCE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, _user)), 
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

    public RemoteFunctionCall<TransactionReceipt> withdraw(BigInteger _amount) {
        final Function function = new Function(
                FUNC_WITHDRAW, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_amount)), 
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
