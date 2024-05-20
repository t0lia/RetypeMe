# Define Hurl scripts
HURL_SCRIPTS = leaderboard_post.hurl leaderboard_get.hurl statistic_post.hurl statistic_get.hurl

# Default target to run all Hurl scripts
all: run_all

# Target to run leaderboard POST
leaderboard_post: leaderboard_post.hurl
	hurl leaderboard_post.hurl | jq .

# Target to run leaderboard GET
leaderboard_get: leaderboard_get.hurl
	hurl leaderboard_get.hurl | jq .

# Target to run statistic POST
statistic_post: statistic_post.hurl
	hurl statistic_post.hurl | jq .

# Target to run statistic GET
statistic_get: statistic_get.hurl
	hurl statistic_get.hurl | jq .

# Target to run all Hurl scripts
run_all: leaderboard_post leaderboard_get statistic_post statistic_get

# Clean target to remove .run files
clean:
	rm -f *.run
