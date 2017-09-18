//thanks to these guys https://anapioficeandfire.com/About for such awesome api
//api documentation https://anapioficeandfire.com/Documentation


//consume game of thrones api. Following its paging rules
//at the time of this example, there was 2138 characters registered.
//The api supports paging of 50 items max
const PagedArray  =require("../../../bin/PagedArray");
const request  = require('request-promise');;

const baseUrl='https://www.anapioficeandfire.com/api/characters'
const options ={

  size:50,
  externalPaging:true,
  run:function(param,info){
    return request(baseUrl+'?pageSize='+info.pageSize+'&page='+info.pageCurrent+1)
    .then(function(body){
      return JSON.parse(body);
    })
    .catch(function(err){
      console.log(err);
    })
  }
}

//load two pages (passing number 100 tells that our final array has 100 itens)
let array = new PagedArray(100,options);

//load first page with 50 characters
//array.load();
//array.next();
// show(array[0],1)
// show(array[1],1)
// show(array[49],1)

// //load second page with 50 characters
// array.next();
// show(array[0],2)

Reset = "\x1b[0m"
Dim = "\x1b[1m"

console.log(Dim+'page - id: '+Reset+'name or alias');
array.forEach(function(data,id,arr,info){
  console.log(Dim+(info.pageCurrent+1)+'-'+id+': '+Reset+(data.name?data.name:data.aliases));
});