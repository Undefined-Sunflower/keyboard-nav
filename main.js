// ==========变量声明==========
function init() {
  const keyHash = { // 键盘字母对应网址
    'q': 'http://www.qq.com',
    'w': 'http://weibo.com',
    'e': 'http://ele.me',
    'r': 'http://renren.com',
    't': 'http://tianya.com',
    'y': 'http://youtube.com',
    'u': 'http://uc.com',
    'i': 'http://iqiyi.com',
    'o': 'http://opera.com',
    'z': 'http://zhihu.com',
    'm': 'http://www.mcdonalds.com.cn'
  };
  const kbds = [  // 键盘值
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];
  if (localStorage.length !== 0) {  // 每次打开网页就用localStorage覆盖原有hash
    keyHash = JSON.parse(localStorage.getItem('localStoreKeyHash'));
  }
  return {
    kbds: kbds,
    keyHash: keyHash
  }
}
function tag(tag) {
  return document.createElement(tag);
}
function createBtn(index, currentRow) {
  let btn = tag('button');
  btn.textContent = 'E';
  btn.id = currentRow[index];
  btn.classList.add('editButton')
  return btn;
}
function createKbd(index, currentRow) {
  let newKbd = tag('kbd');
  newKbd.textContent = currentRow[index];
  return newKbd;
}
function create(keyHash, kbds) {
  let rowDiv = document.getElementsByClassName("rowWrapper");
  for (let i = 0; i < rowDiv.length; i++) {
    let currentRow = kbds[i];
    for (let index = 0; index < currentRow.length; index++) {
      let newKbd = createKbd(index, currentRow);
      let btn = createBtn(index, currentRow);
      
      let img = tag('img');
      img.classList.add('icon')
      let url = keyHash[kbds[i][index]];
      if(url){
        img.src = url + '/favicon.ico';
      }else {
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
      }
      img.onerror = function() {
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
      }
      newKbd.append(btn);
      newKbd.append(img);
      rowDiv[i].append(newKbd);
    }
  }
}
function listenToKeyPress(keyHash) {
  document.addEventListener('keypress', function (e) {
    e = e || window.event;
    let key = String.fromCharCode(e.keyCode); // 将keyCode转换成按键字母
    if (keyHash[key]) { // 新页面打开
      window.open(keyHash[key], "_blank")
    }
  })
}
function listenToEdit(keyHash) {
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
}

// 初始化键盘字母、字母对应网址
let initObj = init();
let keyHash = initObj['keyHash'];
let kbds = initObj['kbds'];

// ==========动态创建按键和编辑按钮==========
create(keyHash, kbds);

// ==========监听按键, 给按键绑定hash==========
listenToKeyPress(keyHash);

// ==========监听用户编辑==========
listenToEdit(keyHash);
