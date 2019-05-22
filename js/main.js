//1.初始化
let hashA = initialize();
const keys = hashA.keys;
let hash = hashA.hash;

//2.生成键盘
generateKeyboard(keys, hash);

//3.监听用户动作
userListen(hash);

//下面是工具函数

//创建span
function createSpan(textContent) {
  let span = document.createElement("span");
  span.className = "text";
  span.textContent = textContent;
  return span;
}

//创建button
function createButton(id) {
  let btn = document.createElement("button");
  btn.textContent = "edit";
  btn.id = id;

  btn.onclick = function(e) {
    let keyClicked = e.target;
    let img = keyClicked.nextSibling;
    let inputValue = prompt("请输入您要绑定的网址：");
    img.src = "https://" + inputValue + "/favicon.ico";
    console.log(inputValue);
    img.onerror = function(imgEvent) {
      imgEvent.target.src = "//i.loli.net/2017/11/10/5a05afbc5e183.png";
    };
    hash[keyClicked.id] = inputValue;
    localStorage.setItem("websites", JSON.stringify(hash));
  };

  return btn;
}

//创建img
function createImg(domain) {
  let img = document.createElement("img");
  if (domain) {
    img.src = "https://" + domain + "/favicon.ico";
  } else {
    img.src = "//i.loli.net/2017/11/10/5a05afbc5e183.png";
  }
  img.onerror = function(e) {
    e.target.src = "//i.loli.net/2017/11/10/5a05afbc5e183.png";
  };

  return img;
}

//生成键盘
function generateKeyboard(keys, hash) {
  for (let i = 0; i < keys["length"]; i++) {
    let div = document.createElement("div");
    div.className = "row";
    mainWrapper.appendChild(div);
    for (let j = 0; j < keys[i]["length"]; j++) {
      let key = keys[i][j];
      let span = createSpan(key);
      let btn = createButton(key);
      let img = createImg(hash[key]);

      let kbdItem = document.createElement("kbd");
      div.appendChild(kbdItem);
      kbdItem.className = "key";

      kbdItem.appendChild(span);
      kbdItem.appendChild(btn);
      kbdItem.appendChild(img);
    }
  }
}

//初始化函数
function initialize() {
  const keys = {
    "0": {
      0: "q",
      1: "w",
      2: "e",
      3: "r",
      4: "t",
      5: "y",
      6: "u",
      7: "i",
      8: "o",
      9: "p",
      length: 10
    },
    "1": {
      0: "a",
      1: "s",
      2: "d",
      3: "f",
      4: "g",
      5: "h",
      6: "j",
      7: "k",
      8: "l",
      length: 9
    },
    "2": { 0: "z", 1: "x", 2: "c", 3: "v", 4: "b", 5: "n", 6: "m", length: 7 },
    length: 3
  };
  let hash = {
    q: "qq.com",
    w: "weibo.com",
    e: "ele.me",
    r: "renren.com",
    t: "tianya.com",
    y: "youtube.com",
    u: "uc.com",
    i: "iqiyi.com",
    o: "opera.com",
    p: undefined,
    a: "acfun.tv",
    s: "sohu.com",
    z: "zhihu.com",
    m: "www.mcdonalds.com.cn"
  };

  let hashInLocalStorage = getHashFromLocalStorage("websites");

  if (hashInLocalStorage) {
    hash = hashInLocalStorage;
  }

  return {
    keys: keys,
    hash: hash
  };
}

//监听用户键盘输入
function userListen(hash) {
  document.onkeypress = function(e) {
    let website = "http://" + hash[e.key];
    window.open(website, "_blank");
  };
}

//工具函数
function getHashFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || "null");
}
