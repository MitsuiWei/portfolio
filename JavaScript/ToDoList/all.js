 // 指定 dom
 var list = document.querySelector('#list');
 var sendData = document.querySelector('#send');
 var data = JSON.parse(localStorage.getItem('listData')) || [];
 var btnclr = document.querySelector('#btnClr');
 var input = document.querySelector('#input');
//Q:先判斷JSON.parse(localStorage.getItem('listData'))是否存在，若存在直接使用。若不存在則創立一個空陣列





 // 監聽與更新
 sendData.addEventListener('click', addData);
 list.addEventListener('click', toggleDone);
 btnclr.addEventListener('click',clearList);
 updateList(data);

/*這裡是在判斷清除按鈕是否出現*/
 if(data.length <= 0) {
  btnClr.style.display = "none"; //hide clear btn	
  console.log("無");
  console.log(localStorage.length);
}
else{
  btnclr.style.display = "inline";
  console.log("有");
  console.log(localStorage.length);
}
/*這裡是在判斷清除按鈕是否出現*/

 //加入列表，並同步更新網頁與 localstorage
 function addData(e) {
   var b = e.preventDefault(); 
   var txt = document.querySelector('#input').value;
   /*這裡是在判斷清除按鈕和第一條線*/
   if(input.value === ""){
     alert("你必須輸入內容喔!");
     {return};//return 是為了阻止以下代碼運行，防止插入空陣列
   }else{
     if(list.style.borderTop===""){
       console.log("印出第一條");
       list.style.borderTop = "2px solid white";
			 btnClr.style.display = "inline"; //當項目大於0個以上就出現第一條線和清除按鈕
     }
   }
   /*這裡是在判斷清除按鈕和第一條線*/
   
   var todo = {
     content: txt
   };
   data.push(todo);
   updateList(data);
   localStorage.setItem('listData', JSON.stringify(data));
 }
 // 更新網頁內容
 function updateList(items) {  //不太清楚這裡的item是代表什麼意思
   str = '';
   var len = items.length;
   for (var i = 0; len > i; i++) {
     str += '<li><a href="#" data-index=' + i + ' />刪除</a> <span>' + items[i].content + '</span> <input id="checkbox" type="checkbox"> </li>';
   }
   
   list.innerHTML = str;
 }
 // 刪除代辦事項
 function toggleDone(e) {
   e.preventDefault();
   if(e.target.nodeName !== 'A'){return};
   var index = e.target.dataset.index;
   data.splice(index, 1);
   localStorage.setItem('listData', JSON.stringify(data));
     /*這裡是在判斷清單內還有沒有內容來決定clear按鈕和第一條線是否要存在*/
   if(data.length <= 0) {
     list.style.borderTop = "";
     btnclr.style.display = "none";
     console.log("沒有內容了，所以我要清空");
   }  
     /*這裡是在判斷清單內還有沒有內容來決定clear按鈕和第一條線是否要存在*/
   updateList(data);
 }

 //全部刪除功能
 function clearList() {
  todoList = [];
  localStorage.clear();
  data.splice(0,data.length);
  list.innerHTML = "";
  btnClr.style.display = "none";
  list.style.borderTop = "";
}