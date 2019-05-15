init();

function init() {
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

  let hashInLocalStorage = JSON.parse(
    localStorage.getItem("websites") || "null"
  );

  if (hashInLocalStorage) {
    hash = hashInLocalStorage;
  }

  for (let i = 0; i < keys["length"]; i++) {
    let div = document.createElement("div");
    mainWrapper.appendChild(div);
    for (let j = 0; j < keys[i]["length"]; j++) {
      let kbdItem = document.createElement("kbd");
      let key = keys[i][j];
      kbdItem.textContent = key;
      div.appendChild(kbdItem);
      let btn = document.createElement("button");
      btn.textContent = "编辑";
      btn.id = key;
      kbdItem.appendChild(btn);

      btn.onclick = function(e) {
        let keyClicked = e.target.id;
        hash[keyClicked] = prompt("请输入您要绑定的网址：");
        localStorage.setItem("websites", JSON.stringify(hash));
      };
    }
  }

  document.onkeypress = function(e) {
    let website = "http://" + hash[e.key];
    window.open(website, "_blank");
  };
}
