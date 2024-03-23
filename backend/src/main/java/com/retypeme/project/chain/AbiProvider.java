package com.retypeme.project.chain;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

public class AbiProvider {

    private static final Logger logger = LoggerFactory.getLogger(AbiProvider.class);

    public String getAbi(Class clazz) {
        String path = "/solidity/abi/" + clazz.getCanonicalName().replace(".", "/") + ".json";
        logger.info("Reading ABI from path: {}", path);

        try {
            ClassPathResource resource = new ClassPathResource(path);
            return new String(Files.readAllBytes(Paths.get(resource.getURI())));
        } catch (IOException e) {
            throw new RuntimeException("Failed to read ABI from path: " + path, e);
        }
    }
}
