# Contributing

## Request for changes/ Pull Requests
You first need to create a fork of the [April](https://github.com/Art-Portal/April/) repository to commit your changes to it. Methods to fork a repository can be found in the [GitHub Documentation](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

Then add your fork as a local project:

```sh
# Using HTTPS
git clone https://github.com/Art-Portal/April.git

# Using SSH
git clone git@github.com:Art-Portal/April.git
```

> [Which remote URL should be used ?](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories)

Then, go to your local folder

```sh
cd April
```

Add git remote controls :

```sh
# Using HTTPS
git remote add fork https://github.com/YOUR-USERNAME/April.git
git remote add upstream https://github.com/Art-Portal/April.git


# Using SSH
git remote add fork git@github.com:YOUR-USERNAME/April.git
git remote add upstream git@github.com/Art-Portal/April.git
```

You can now verify that you have your two git remotes:

```sh
git remote -v
```

## Receive remote updates
In view of staying up to date with the central repository :

```sh
git pull upstream beta
#Replace "beta" with the latest beta
```

## Choose a base branch
Before starting development, you need to know which branch to base your modifications/additions on. When in doubt, use the latest beta.

| Type of change                |           | Branches              |
| :------------------           |:---------:| ---------------------:|
| Bug fixes                     |           | `latest beta`         |
| New features                  |           | `latest beta`         |
| New issues models             |           | `YOUR-USERNAME:patch` |

```sh
# Switch to the desired branch
git switch beta
#Replace "beta" with the latest beta

# Pull down any upstream changes
git pull

# Create a new branch to work on
git switch --create patch/1234-name-issue
```

Commit your changes, then push the branch to your fork with `git push -u fork` and open a pull request on [the April repository](https://github.com/Art-Portal/April) following the template provided.
