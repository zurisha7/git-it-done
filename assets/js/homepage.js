var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoContainerEl = document.querySelector("#repo-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function(user) {
    //format the api url
    var apiUrl="https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response){
        console.log(response)
        response.json().then(function(data){
            displayRepos(data, user);
        });
    });
};

    var formSubmitHandler = function(event) {
        event.preventDefault();
        var username = nameInputEl.ariaValueMax.trim();

        if (username) {
            getUserRepos(username);
            nameInputEl = "";
        } else {
            alert("Please enter a Github username");
        }
        
        console.log(event);
    };

    userFormEl.addEventListener("submit", formSubmitHandler);

    var displayRepos = function(repos, searchTerm) {
        repoContainerEl= "";
        repoSearchTerm.textContent = searchTerm;

        // loop over repos
        for (var i = 0; i < repos.length; i++) {
          // format repo name
          var repoName = repos[i].owner.login + "/" + repos[i].name;
        
          // create a container for each repo
          var repoEl = document.createElement("div");
          repoEl.classList = "list-item flex-row justify-space-between align-center";
        
          // create a span element to hold repository name
          var titleEl = document.createElement("span");
          titleEl.textContent = repoName;
        
          // append to container
          repoEl.appendChild(titleEl);
        
          // append container to the dom
          repoContainerEl.appendChild(repoEl);
        }
    };
 
    getUserRepos("lernantino");
