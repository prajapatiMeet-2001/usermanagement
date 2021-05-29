var app = angular.module('mainapp',[]);
app.controller("maincontroller", ["$scope","$http",function($scope,$http) 
    {   
        checkauth();
        getusers();
        //SIGN OUT
        $scope.signout = function() 
        {
            $http.post('/user/signout').then(function onSuccess(response) {
                // Handle success
                console.log(response)
                if(response.status == 200 && response.data.auth == false)
                {
                    document.cookie = `token=null; path=/index.html`;
                    alert('Sign Out Successful')
                    window.location.replace(`login.html`);
                }
            }).catch(function onError(response) {
                // Handle error
                console.log(response)
            }); 
        };
        //CHECK AUTH
        function checkauth() 
        {
            var token = document.cookie
            if(token)
            {
                $http.get('/user/checkauth/'+token.slice(6)).then(function onSuccess(response) 
                {
                    if(response.status == 200)
                    {
                        console.log('User Already Logged In, Get Data')
                        setdata(response.data)
                    }
                    else
                    {
                        document.cookie = `token=null; path=/index.html`;
                        alert('Error Occured')
                        window.location.replace(`login.html`);
                    }
                    console.log(response)
                }).catch(function onError(response) {
                    // Handle error
                    console.log(response)
                  });
            }
            else
            {
                    //document.cookie = `token=null; path=/index.html`;
                    alert('User Not Logged In')
                    window.location.replace(`login.html`);
            }
        }
        function setdata(data)
        {
            console.log('Userdata',data)
            $scope.user = data
            $scope.user.dob = new Date(Date.parse(data.dob))
        }
        
        function getusers() 
        {
            $http.get('/user/getusers/').then(function onSuccess(response) {
                $scope.users = response.data
              }).catch(function onError(response) {
                // Handle error
                console.log(response)
              });   
        }
        $scope.editdata = function (user) 
        {
            if(user === undefined || user.fname === undefined || user.lname === undefined || user.city === undefined || user.dob === undefined|| user.phone === undefined || user.password === undefined || user.pincode === undefined || user.state === undefined)
            {
              //console.log(user)
              alert("All fields required")
            }
            else
            {
                $http.put('/user/updatedata',user).then(function onSuccess(response) {
                    checkauth()
                    alert('User Data Updated Successfully')
                }).catch(function onError(response) {
                    // Handle error
                    console.log(response)
                }); 
            }
        }
    } 
]);
