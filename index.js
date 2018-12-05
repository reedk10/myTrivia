(function(){

var app = angular.module('app', []);	
app.controller('TriviaController',['$scope','$http', '$sce', function($scope, $http, $sce){

        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentage = 0;

        $http.get('trivia_data.json').then(function(triviaData){
            $scope.myQuestions = triviaData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
        });
	
        $scope.selectAnswer = function(qIndex,aIndex){
            
            var questionState = $scope.myQuestions[qIndex].questionState;

            if(questionState != 'answered'){
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                var correctAnswer = $scope.myQuestions[qIndex].correct;
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;
                
                /*show active and answered states of the questions, hover effect when unanswered */
                if(aIndex === correctAnswer){
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                }else{
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                }
                $scope.myQuestions[qIndex].questionState = 'answered';
            }  
            /*to calculate final score when quiz is complete*/ 
            $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);
        }

        $scope.isSelected = function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        }
        $scope.isCorrect = function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        }

        $scope.selectContinue = function(){
            return $scope.activeQuestion += 1;
        }

        $scope.createShareLinks = function(percentage){

            var url = 'http://movietrivia.com'; /*Enter webpage url*/

            var emailLink = '<a class= "btn email" href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored a '+percentage+'% on movie trivia. Try to beat my score at '+url+'"> Email a friend<a/>';
            var twitterLink = '<a class= "btn twitter" target="_blank" href="http://twitter.com/share?text=I scored a '+percentage+'% on movie trivia. Try to beat my score at&amp;hashtags=MovieStrivia&amp;url='+url+'">Tweet your score</a>'
            
            var newMarkup = emailLink + twitterLink;

            return $sce.trustAsHtml(newMarkup);
        }


    }]);

})();