'use strict';

angular.module('chatApp')
  .controller('MainCtrl', function ($scope, chatroom) {
    $scope.getMessages = chatroom.getMessages;
    $scope.getVisitors = chatroom.getVisitors;
    $scope.showTodoList = true;
    $scope.modif = false;
    $scope.todos = [];
    $scope.markAll = false;
    $scope.title = "chose à faire";
    $scope.priorite = 1;
    $scope.todo = {
      'text' : '',
      'owner' : '',
      'date' : new Date(),
      'priorite' : 'low',
      'done' : false
    };
    $scope.prioriteLabels1 = [{id:0,label:'Tranquillou'},{id:1,label:'Normal'},{id:2,label:'Urgent'}];
    $scope.prioriteLabels = ['Tranquillou','Normal','Urgent'];
    $scope.estimates = [0, 1, 2, 3, 5, 8];
    $scope.editorEnabled = false;
    $scope.todos = [{
        name: "Carte grise voiture",
        estimate: 2,
        priorite: 1,
        done: false},
    {
        name: "Développer Application angularjs",
        estimate: 10,
        priorite: 1,
        done: false},
    {
        name: 'Uninstall ruby',
        estimate: 3,
         priorite: 2,
        done: false
    },
    {
        name: 'Sortir la machine à laver',
        estimate: 1,
         priorite: 1,
        done: true
    }];

    $scope.sendMessage = function () {
      if (!$scope.newMessage) {
        return;
      }
      chatroom.sendMessage($scope.newMessage);
      $scope.newMessage = '';
    };

     $scope.toggleTodoList = function () {
         $scope.showTodoList = !$scope.showTodoList;
     };


    $scope.addTodo = function () {
      if (event.keyCode == 13 && $scope.todoText) {
        $scope.todo.text = $scope.todoText;
        $scope.todos.push({text: $scope.todo.text, done: false});
        $scope.todoText = '';
      }
    };

     $scope.addTodoAjouter = function () {
      if ($scope.todoText) {
        $scope.todo.text = $scope.todoText;
        $scope.todos.push({text: $scope.todo.text, done: false});
        $scope.todoText = '';
      }
    };

    $scope.getTotalTodos = function () {
      return $scope.todos.length;
    };

    $scope.isTodo = function () {
      return $scope.todos.length > 0;
    };

    $scope.toggleEditMode = function () {
      $(event.target).closest('li').toggleClass('editing');
    };
    $scope.editOnEnter = function (todo) {
      if (event.keyCode == 13 && todo.text) {
        $scope.toggleEditMode();
      }
    };

    $scope.remaining = function () {
      var count = 0;
      angular.forEach($scope.todos, function (todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };


    $scope.deleteTodo = function (arg) {
      $scope.todos.splice(arg);
    };

    $scope.hasDone = function () {
      return ($scope.todos.length != $scope.remaining());
    };

    $scope.itemText = function () {
      return ($scope.todos.length - $scope.remaining() > 1) ? 'items' : 'item';
    };

    $scope.toggleMarkAll = function () {
      angular.forEach($scope.todos, function (todo) {
        todo.done = $scope.markAll;
      });
    };

    $scope.clear = function () {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };

    $scope.addTodo1 = function() {
        if ($scope.todoName === "") {
            return false;
        }
        $scope.todos.push({
            name: $scope.todoName,
          priorite: $scope.priorite,
            done: false
        });
        $scope.todoName = '';
        $scope.priorite = 1;
    };

    $scope.addTodo1Enter = function() {
      if ($scope.todoName === "") {
        return false;
      }
      if (event.keyCode == 13) {
        $scope.todos.push({
          name: $scope.todoName,
          priorite: $scope.priorite,
          done: false
        });
        $scope.todoName = '';
        $scope.priorite = 0;
        }
    };

    $scope.sum = function(list, done) {
       var total = 0;
       angular.forEach(list, function(item) {
           if (item.done == done) total += item.estimate;
       });
       return total;
    };


    $scope.enableEditor = function() {
        $scope.editorEnabled = true;

        $scope.todoName = $scope.todo.name;
        $scope.todoEstimate = $scope.todo.estimate;
    };

    $scope.disableEditor = function() {
        $scope.editorEnabled = false;
    };

    $scope.save = function() {
        if ($scope.todoName === "") {
            return false;
        }

        $scope.todo.name = $scope.todoName;
        $scope.todo.estimate = $scope.todoEstimate;

        $scope.disableEditor();
    };

  });
