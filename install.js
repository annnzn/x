const FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']()

let request = new Request("https://dreamlover.coding.net/p/scriptable/d/scriptable/git/raw/master/widget.json")
let data = request.loadJSON()
if (!data) {
  await notify("widget.json 数据加载失败", "https://dreamlover.coding.net/p/scriptable/d/scriptable/git/raw/master/widget.json", "https://dreamlover.coding.net/p/scriptable/d/scriptable/git/raw/master/widget.json")
}

let openName
await Promise.all(data.map(async js => {
  if (!openName) {
    openName = js
  }
  const REQ = new Request("https://dreamlover.coding.net/p/scriptable/d/scriptable/git/raw/master/script/" + js)
  const RES = await REQ.load();
  await FILE_MGR.write(FILE_MGR.joinPath(FILE_MGR.documentsDirectory(), js), RES)
}))

// 删除本脚本
// FILE_MGR.remove(module.filename);

console.log(openName)

Safari.open("scriptable:///open/" + openName)

async function notify(title, body, url) {
  let notify = new Notification()
  notify.title = title
  notify.body = body
  notify.openURL = url
  notify.schedule()
}