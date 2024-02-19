package com.retypeme.project.auth.metamask

import com.retypeme.project.auth.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import org.web3j.crypto.Keys
import org.web3j.crypto.Sign
import org.web3j.utils.Numeric
import java.math.BigInteger
import java.security.SignatureException

@Component
class MetaMaskAuthenticationProvider : AbstractUserDetailsAuthenticationProvider() {
    @Autowired
    private lateinit var userRepository: UserRepository

    @Throws(AuthenticationException::class)
    override fun additionalAuthenticationChecks(userDetails: UserDetails, authentication: UsernamePasswordAuthenticationToken) {
        val metamaskAuthenticationRequest = authentication as MetaMaskAuthenticationRequest
        val metamaskUserDetails = userDetails as MetaMaskUserDetails

        if (!isSignatureValid(authentication.credentials.toString(), metamaskAuthenticationRequest.getAddress(), metamaskUserDetails.nonce)) {
            logger.debug("Authentication failed: signature is not valid")
            throw BadCredentialsException("Signature is not valid")
        }
    }

    @Throws(AuthenticationException::class)
    override fun retrieveUser(username: String?, authentication: UsernamePasswordAuthenticationToken): UserDetails {
        val auth = authentication as MetaMaskAuthenticationRequest
        val user = userRepository.getUser(auth.getAddress())
        return MetaMaskUserDetails(auth.getAddress(), auth.getSignature(), user.nonce)
    }

    override fun supports(authentication: Class<*>?): Boolean =
        MetaMaskAuthenticationRequest::class.java.isAssignableFrom(authentication)
    fun isSignatureValid(signature: String, address: String, nonce: Int): Boolean {
        // Compose the message with nonce
        val message = "Signing a message to login: $nonce"

        // Extract the ‘r’, ‘s’ and ‘v’ components
        val signatureBytes = Numeric.hexStringToByteArray(signature)
        var v = signatureBytes[64]
        if (v < 27) {
            v = (v + 27).toByte()
        }
        val r = signatureBytes.copyOfRange(0, 32)
        val s = signatureBytes.copyOfRange(32, 64)
        val data = Sign.SignatureData(v, r, s)

        // Retrieve public key
        val publicKey: BigInteger = try {
            Sign.signedPrefixedMessageToKey(message.toByteArray(), data)
        } catch (e: SignatureException) {
            logger.debug("Failed to recover public key", e)
            return false
        }

        // Get recovered address and compare with the initial address
        val recoveredAddress = "0x" + Keys.getAddress(publicKey)
        return address.equals(recoveredAddress, ignoreCase = true)
    }
}
