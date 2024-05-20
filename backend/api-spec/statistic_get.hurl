GET http://localhost:8080/api/statistics/user123

HTTP/1.1 200
[Asserts]
jsonpath "$.userId" equals "user123"
jsonpath "$.completedDuels" greaterThanOrEqual 0
jsonpath "$.averageSpeed" greaterThanOrEqual 0.0
jsonpath "$.totalReward" greaterThanOrEqual 0.0
jsonpath "$.overallWinsInDuels" greaterThanOrEqual 0
jsonpath "$.maxSpeed" greaterThanOrEqual 0.0
jsonpath "$.topSpeeds" exists
