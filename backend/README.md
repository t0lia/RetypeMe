## Encryption properties in the application.yml file

```bash
mvn jasypt:encrypt -Djasypt.plugin.path="file:src/main/resources/application.yml" -Djasypt.encryptor.password="password"
```