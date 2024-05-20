POST http://localhost:8080/api/statistics/leaderboard
Content-Type: application/json

{
  "userId": "user-1",
  "speed": 235.5
}

HTTP/1.1 201
GET http://localhost:8080/api/statistics/leaderboard?limit=10

HTTP/1.1 200
