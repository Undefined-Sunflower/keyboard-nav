// ==========变量声明==========
let rowDiv = document.getElementsByClassName("rowWrapper");
const kbds = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]
if (localStorage.length !== 0) {
  keyHash = JSON.parse(localStorage.getItem('localStoreKeyHash'));
}

  // ==========动态创建按键和修改按钮==========
  for (let i = 0; i < rowDiv.length; i++) {
    let currentRow = kbds[i];
    for (let index = 0; index < currentRow.length; index++) {
      let newKbd = document.createElement('kbd');
      let btn = document.createElement('button');
      btn.textContent = 'E';
      btn.id = currentRow[index];
      btn.classList.add('editButton')
      newKbd.textContent = currentRow[index];
      newKbd.append(btn);
      rowDiv[i].append(newKbd);
    }
  }
// ==========监听按键, 给按键绑定hash==========
document.addEventListener('keypress', function (e) {
  e = e || window.event;
  let key = String.fromCharCode(e.keyCode); // 将keyCode转换成按键字母
  if (keyHash[key]) { // 新页面打开
    window.open(keyHash[key], "_blank")
  }
})
// ==========监听用户编辑==========
let editBtn = document.getElementsByClassName('editButton');
let main = document.getElementsByTagName('main')[0];
main.addEventListener('click', function (e) {
  e = e || window.event;
  if (e.target.tagName === 'BUTTON') {
    // 弹出框获取用户输入的url地址
    let url = prompt('Please input a compelete url : ');
    keyHash[e.target.id] = url;
    localStorage.setItem('localStoreKeyHash', JSON.stringify(keyHash)); // keyHash变更时保存到localStorage中
  }
})