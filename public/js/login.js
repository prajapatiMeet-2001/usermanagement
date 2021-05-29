var app = angular.module('loginapp',[]);
app.controller("logincntrl", ["$scope","$http",function($scope,$http) 
    {   
        //SIGN IN THROUGH EMAIL PASSWORD
        $scope.signin = function(email,password) 
        {
            if(email === undefined || password === undefined )
            {
              //console.log(user)
              alert("All fields required")
            }
            else
            {
                $http.post('/user/signin',{email:email,password:password}).then(function onSuccess(response) {
                    // Handle success
                    console.log(response)
                    if(response.status == 200 && response.data.auth == true)
                    {
                        document.cookie = `token=${response.data.token}; path=/index.html`;
                        alert('Sign In Successful')
                        window.location.replace(`index.html`);
                    }
                }).catch(function onError(response) {
                    // Handle error
                    console.log(response)
                }); 
            }
        };
        //SIGNUP
        $scope.signup = function (user) 
        {
            if(user === undefined || user.fname === undefined || user.lname === undefined || user.city === undefined || user.dob === undefined|| user.phone === undefined || user.password === undefined || user.pincode === undefined || user.state === undefined)
            {
              //console.log(user)
              alert("All fields required")
            }
            else
            {
                $http.post('/user/signup',user).then(function onSuccess(response) {
                    // Handle success
                    $scope.user = ''
                    console.log(response)
                    if(response.status == 200 && response.data.auth == true)
                    {
                        document.cookie = `token=${response.data.token}; path=/index.html`;
                        alert('Sign Up Successful')
                        window.location.replace(`index.html`);
                    }
                }).catch(function onError(response) {
                    // Handle error
                    console.log(response)
                }); 
            }
        }
    } 
]);
