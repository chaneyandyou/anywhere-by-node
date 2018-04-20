<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
</head>
<style>
  body{
    width: 100%;
    height: 100%;
    margin: 30px;
  }
  a{
    display: block;
    height: 46px;
    font-size: 24px;
    line-height: 46px;
  }
</style>
<body>
{{#each files}}
  <a href="{{../dir}}/{{this}}">{{this}}</a>
{{/each}}
</body>
</html>