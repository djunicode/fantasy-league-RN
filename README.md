# Fantasy League App
React Native App + Express.js Backend


# Contribution Guidelines

1. Fork this repo
2. Clone your forked repo `git clone`
3. Add the main repo as upstream `git remote add upstream {url}`
4. Make your changes and push to your(forked) repo.
5. Create a pull request from github to main repo.

To get some changes from main repo `git pull upstream`

__*NOBODY SHOULD DIRECTLY PUSH TO THE MAIN REPO.*__

There will be 3 branches
- master
- app
- backend

_Apart from the 3 branches above you can create as many branches as you want._

__*NOBODY SHOULD MAKE PULL REQUEST TO MASTER BRANCH. All changes should be made to either app or backend depending on where you are working.*__


# Folder structure
```
 |- app (Stores all the files related to the app)
 |- backend (Stores all the files related to the backend)
```


# Important Notes
- Commits and pull requests should be made with proper descriptive messages.
- Do NOT commit or push any sensitive info such as passwords or emails in the code. Such data should go in the .env file, and a sample empty entry for the same should be added for the same in .env.example
- Make sure to check before you are pushing the changes to the branch
