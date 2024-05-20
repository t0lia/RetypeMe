POST http://localhost:8080/api/statistics
Content-Type: application/json

{
  "userId": "user123",
  "completedDuels": 5,
  "averageSpeed": 110.2,
  "totalReward": 500.0,
  "overallWinsInDuels": 3,
  "maxSpeed": 120.5,
  "topSpeeds": [120.5, 115.3, 110.0, 105.5, 100.0]
}

HTTP/1.1 201
