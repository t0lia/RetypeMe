GET http://localhost:8080/api/statistics/leaderboard?limit=10

HTTP/1.1 200
[Asserts]
jsonpath "$[0].userId" exists
jsonpath "$[0].speed" exists
