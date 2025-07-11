
let API = "https://m.douban.com/rexxar/api/v2/subject_collection/movie_real_time_hotest/items?start=0&count=50&items_only=1&for_mobile=1"

let req = new Request("")
req.method = "GET"
req.headers = { Referer: `https://m.douban.com/pwa/cache_worker` }
req.url = API
let result = await req.loadJSON()

// console.log(result)
let data = []
let group = result["subject_collection_items"]
for (var i = 0; i < 10; i++) { 
    var title1 = group[i].title
    var rating = group[i].rating.value
    console.log(title1 + rating)

    data.push(title1 + " " +rating)
}
  

  
//let data = ["123", "321"]






let w = new ListWidget()
w.backgroundColor = new Color("#6ACF84")

let body = w.addStack()

body.centerAlignContent()
let title = body.addText("豆瓣口碑榜")
title.textColor = Color.white()
title.font = Font.lightSystemFont(20)
title.centerAlignText()

// 边框
// body.borderWidth = 1
// body.borderColor = Color.red()

// 垫片
body.addSpacer(20)

let rightBody = body.addStack()
rightBody.layoutVertically()  //垂直布局
// rightBody.layoutHorizontally() // 水平布局

// rightBody.borderColor = Color.blue()
// rightBody.borderWidth = 1

for(let i in data) {
    let idx = Number(i) + 1
    let str = idx + " " + data[i]
    rightBody.addText(str)
    rightBody.addSpacer(1)
}
body.addSpacer()


// w.presentMedium()
w.presentLarge()




